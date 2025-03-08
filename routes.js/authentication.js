import express from "express";
import { generateToken, User } from "../models/userModel.js";
import { getUserByEmail } from "../controllers/userControll.js";
import bcrypt from "bcrypt";



const router = express.Router();

router.post("/signup", async (req, res) => {
    try{
        let user = await getUserByEmail(req);
        if(user){
            return res.status(400).send({message:"User Already Exist!!!"});
        }

        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user = await new User({
            name:req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            password: hashedPassword
        }).save();
        const token = generateToken(user._id);
        res.status(201).send({message:"User Successfully Created", user, token});
    }catch(error){
        res.status(404).send({message:"Internal Server Error", error});
    }

});

router.post("/login", async (req, res) => {
    try{
        const user = await getUserByEmail(req);
        if(!user){
            return res.status(404).send({message:"Please check your Email"});
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            return res.status(404).send({message:"Invalid Password"})
        }
        const token = generateToken(user._id);
        res.status(200).send({message:"Logged in Successfully", token});
    }catch(error){
        return req.status(400).send({message:"Internal Server Error"})
    }
});




export const userRouter = router;