const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');  


const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret';

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://sujith:9345793342S@cluster0.dquerwy.mongodb.net/').then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error"));

// Simple request timing logger to measure API latency
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
    });
    next();
});

const UserSchema = new mongoose.Schema({
    username : {type: String, required : true},
    email : {type : String,required:true, unique:true},
    password : {type : String,required:true}
});

const User = mongoose.model('User',UserSchema);

const ContactSchema = new mongoose.Schema({
    cname : {type: String,required:true},
    cnumber : {type : String,required : true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

// index user field for faster queries by user
ContactSchema.index({ user: 1 });

const Contact = mongoose.model('Contact',ContactSchema);

const Verifytoken = (req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token){
        return res.status(401).send("Token Error");
    }
    token =  token.replace('Bearer ','')

    jwt.verify(token, JWT_SECRET, (err,decoded)=>{
        if(err){
            return res.status(401).send("Invalid Token");
        }
        req.userId = decoded.userId;
        next();
    });
};

app.post('/api/register',async(req,res)=>{
    const {username,email,password} = req.body;

    try{
        const Olduser = await User.findOne({username});
        if(Olduser){
            return res.status(400).json({message : 'Username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            username,
            password : hashedPassword,
            email
        });

        await user.save();
        
        
        res.status(201).json({message : 'User Registration Succesfull'});
    }
    catch(error){
        console.log('Registeration Error : ',error);
        res.status(500).json({message : 'Server error'});
    }
});

app.post('/api/login',async(req,res)=>{
    try{
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(!user)
        return res.status(400).json({message : 'User name does not exists'});
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
        return res.status(400).json({message : 'Invalid Password'});
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
    }
    catch(error){
        console.log("Login Error");
        res.status(500).json({message : 'Server Error'});
    }
});

app.post('/api/contact', Verifytoken, async (req, res) => {
    try {
        const {cname,cnumber} = req.body;
        const contact = new Contact({
            cname,
            cnumber,
            user:req.userId
        });

        await contact.save();
        res.status(201).json({message:'Contact Saved Successfully'});
    }
    catch(error){
        console.log("Does not Saved");
        res.status(400).json({message:'Server Error'});
    }
});

app.get('/api/readcontact', Verifytoken, async (req, res) => {
    try {
        // use lean() to return plain JS objects (faster) and add exec() to run the query
        const contact = await Contact.find({ user: req.userId }).lean().exec();
        res.json(contact);
    } catch (error) {
        console.log("Get Contacts Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.put('/api/updatecontact/:id', Verifytoken, async (req, res) => {
    try {
        const { cname,cnumber } = req.body;

        await Contact.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { cname, cnumber }
        );

        res.json({ message: "contact updated successfully" });

    } catch (error) {
        console.log("Update contact Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.delete('/api/deletecontact/:id', Verifytoken, async (req, res) => {
    try {
        await Contact.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.json({ message: "Contact deleted successfully" });

    } catch (error) {
        console.log("Delete Contact Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
});
