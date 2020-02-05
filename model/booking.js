const mongoose = require('mongoose');

const bookingschema=new mongoose.Schema({
    username: {
        type: String   
    },
    homeName:{
        type:String
    },
    hostName: {  
        type: String  
    },
    bookIn: {  
        type: Date  
    },
    bookOut: {  
        type: Date  
    },
    bookDays: {  
        type: Number  
    },
    bookPrice: {  
        type: Number  
    },
    bookTotal: {  
        type: Number  
    },
    bookStatus:{
        type:Boolean
    },
    bookCreatedAt:{
        type:Date
    }
    
});

const Booking = mongoose.model('Booking',bookingschema);
module.exports = Booking