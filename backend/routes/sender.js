import express from "express";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";

import sendMail from "./sendMail.js";

// dotenv.config();


const router = express.Router();

router.post( '/',async (req , res) => {
    try{
        const {userName , email , phone , message , course , duration} = req.body;

        if(!userName || !email || !phone || !message || !course){
            return res.status(400).json({
                message: "All fields are required." 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email address."
            })
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if(!phoneRegex.test(phone)){
            return res.status(400).json({
                message: "Invalid phone number."
            })
        }

        await sendMail(email , userName , message , phone , course , duration);

            return res.status(200).json({
                    message: "Enquiry sent successfully."
        });

    }catch(e){
        console.log(e);
    }
})

export default router;