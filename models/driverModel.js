const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    fname:{
        type: String,
        required: [true, 'Please add a first name']
    },
    lname:{
        type: String,
        required: [true, 'Please add a last name']
    },
    nic:{
        type: String,
        required: [true, 'Please add a NIC'],
        unique:true
    },
    email:{
        type: String,
        required: [true, 'Please add an email'], 
        unique:true
    },
    telNum:{
        type: String,
        required: [true, 'Please add an telephone number'], 
        unique:true
    },
    vehicleType:{
        type: String,
        required: [true, 'Please add vehicle type']
    },
    lisencePlateNum:{
        type: String,
        required: [true, 'Please add lisence plate number']
    },
    deviceNum:{
        type: String,
        required: [true, 'Please add device number'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    },
    emergency:[{
            name: {
                type: String
        },
            phoneNum:{
                type: String,
        }
    }],
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Driver',driverSchema);