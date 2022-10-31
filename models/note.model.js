const {model, Schema}= require('mongoose');

const NoteSchema=new Schema({
    taskname :{type :String, required :true},
    status :{type :Boolean},
    tag :{type:String, required:true},
    userId: String,
})

const NoteModel = model ('Note',NoteSchema);
module.exports=NoteModel;