const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator')

const loginUser = async (req,res)=> {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "invalid email or password"
            })
        }
        const token = createToken(user._id)
        res.json({
            success: true,
            token
        })
    }catch(error){
        console.log(error)
        res.json({
            success: false,
            message: "error!"
        })
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const signupUser = async(req,res)=>{
    const {name, password, email} = req.body;
    try{
        
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message: "User already exits"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }

        if (password.length <8 ) {
            return res.json({success: false, message: "Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashed
        })

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })
    }catch(error){
        console.log(error)
        res.json({
            success: false,
            message: "error!"
        })
    }
}

listUser = async(req,res) => {
    try{
        const user = await userModel.find({});
        res.json({success: true, data: user})
    }catch(error){
        console.log(error);
        res.json({success: false, message: error})
    }
}
getUser = async (req, res, next) => {
   try{
    const user = await userModel.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
        res.json({success: true, data: user})
   }catch(error){
    console.log(error);
    res.json({success: false, message: error})

}
  
  };

module.exports = {loginUser, signupUser, listUser, getUser}