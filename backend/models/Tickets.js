const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type: String},
    status:{type:String,default:'open'},
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Ticket',ticketSchema);