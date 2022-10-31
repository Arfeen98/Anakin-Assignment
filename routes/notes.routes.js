const express = require ('express');

const NoteModel = require("../models/note.model");
const notesController = express.Router();

notesController.post("/create",async (req,res)=>{
    const {taskname,status,tag,userId} =req.body;
    const todo = new NoteModel({
        taskname,
        status,
        tag,
        userId
    })
    await todo.save();
    res.send({todo});
})

notesController.get("/todo",async (req,res)=>{
    const {userId} = req.body;
    const todo = await NoteModel.find({userId});
    res.send(todo);
})

notesController.patch("/:todoId/edit", async (req,res)=>{
    const {todoId} = req.params;
    const {userId} = req.body;
    const todo = await NoteModel.findOne({_id:todoId})
    if(todo.userId === userId){
        const new_todo = await NoteModel.findOneAndUpdate({_id:todoId},req.body,{new:true});
        return res.send({new_todo})
    }else{
        return res.send("Login first with valid credentials");
    }
})

notesController.delete("/:todoId/delete",async (req,res)=>{
    const {todoId}= req.params;
    const {userId} = req.body;
    const todo = await NoteModel.findOne({_id : todoId});

    if(todo.userId === userId){
        await NoteModel.findOneAndDelete({_id : todoId});
        return res.send({'mesaage':'Successfully deleted'});
    }
    else{
        return res.send("You are not authorize");
    }
})

module.exports=notesController