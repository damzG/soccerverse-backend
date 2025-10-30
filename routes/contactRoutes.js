import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();
router.post("/", async(req, res) => {
    try{
        const { name, email, message } = req.body;

        //Simple validation
        if(!name || !email || !message){
            return res.status(400).json({success: false, error: "All fields are required"});
        }
        const newContact = new Contact({name, email, message});
        await newContact.save();
        console.log("✅ New contact saved:", newContact);
        res.status(200).json({ message: "Contact form submitted successfully" });
        res.json({success: true, message: "Contact saved successfully"});
    }catch(error){
        console.error("❌ Error saving contact:", error);
        res.status(500).json({error: "Failed to save contact"});
    }
});

export default router;