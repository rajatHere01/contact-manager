const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModel");

// @desciption get all contacts
// @route GET /api/contcats
//@access private

const getContacts= asyncHandler(async(req,res) =>{
    const contacts =await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desciption Create New contact
// @route POST /api/contcats
//@access private

const createContact= asyncHandler(async(req,res) =>{
    console.log("Reuest body is:", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please put the neccesary fields");
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

// @desciption Get contact
// @route GET /api/contcat/:id
// for getting individual contact
//@access private

const getContact=asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact NOT FOUND!!!");
    }
    res.status(200).json(contact)
});
// @desciption update contact
// @route PUT /api/contcats
//@access private

const updateContact=asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact NOT FOUND!!!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updated);
});
// @desciption Create New contact
// @route DELETE /api/contcats
//@access public

const deleteContact=asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact NOT FOUND!!!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};