const express = require("express");
require("dotenv").config({path: "./.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Contact = require("../models/ContactModel")

const router = express.Router();

router.post("/getAll", async (req, res) => {
    try {
        const { user } = req.body;
        const contacts = await Contact.getContacts(user);
        res.status(200).json(contacts);
    } catch (error) {
        res.status(error.status?error.status:400).json({error: error.message});
    }
});

router.post("/add", async (req, res) => {
    try {
        const { name, phone, user } = req.body;
        const contact = await Contact.addContact(name, phone, user);
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

const checkContact = (contact,res) => {
    if(!contact){
        res.status(404).json({error: "Contact not found"});
    }else{
        res.status(200).send(contact);
    }
}

router.delete("/", async (req, res) => {
    try {
        const { phone,user } = req.body;
        const contact = await Contact.deleteContact(phone, user);
        checkContact(contact,res);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/update", async (req, res) => {
    try {
        const { oldContact, newContact, user } = req.body;
        const contact = await Contact.updateContact(oldContact, newContact, user);
        checkContact(contact,res);
    } catch (error) {
        res.status(error.status?error.status:400).json({error: error.message});
    }
});

module.exports = router;