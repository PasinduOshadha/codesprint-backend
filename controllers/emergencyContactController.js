const EmergencyContact = require('../models/emergencyContactModel');
const Driver = require('../models/driverModel');
const ActiveCases = require('../models/activecasesModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Register Emergency Contact
// @route POST /api/emergencycontacts
// @access Public
const registerEmergencyContact =asyncHandler(async(req,res) =>{
    const{fname,lname, email, nic, telNum, password} = req.body;

    if(!fname || !lname || !nic|| !email || !telNum || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if emergency contact exists
    const emergencyContactExists = await EmergencyContact.findOne({email})

    if(emergencyContactExists){
        res.status(400)
        throw new Error('Emergency Contact already Exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create emergency contact
    const emergencyContact = await EmergencyContact.create({
        fname, lname, email, nic, telNum,
        password:hashedPassword
    })

    if(emergencyContact){
        res.status(201).json({
            _id:emergencyContact.id,
            fname:emergencyContact.fname,
            lname:emergencyContact.lname,
            nic:emergencyContact.nic,
            email:emergencyContact.email,
            telNum:emergencyContact.telNum,
            token:generateToken(emergencyContact._id),
            userState: 2,
        })
    }else{
        res.status(400)
        throw new Error('Invalid Emergency Contact Data')
    }
})

// @desc Authenticate a Emergency Contact
// @route POST /api/emergencycontacts/login
// @access Public
const loginEmergencyContact =asyncHandler( async(req,res) =>{
    const {email,password} = req.body

    const emergencyContact = await EmergencyContact.findOne({email})

    if(emergencyContact &&(await bcrypt.compare(password, emergencyContact.password))){
        res.status(200).json({
            _id:emergencyContact.id,
            fname:emergencyContact.fname,
            lname:emergencyContact.lname,
            nic:emergencyContact.nic,
            email:emergencyContact.email,
            telNum:emergencyContact.telNum,
            token:generateToken(emergencyContact._id),
        })
    } else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})

// @desc Get Emergency Contact data
// @route GET /api/emergencycontacts/me
// @access Private
const getMe = asyncHandler( async(req,res) =>{
   
    const emergencyContact = await EmergencyContact.findById(req.emergencyContact.id)

    res.status(200).json({
        emergencyContact
    })
});

// @desc Delete Emergency Contact data
// @route DELETE /api/emergencycontacts/me
// @access Private
const removeMe = asyncHandler( async(req,res) =>{
   
    const emergencyContact = await EmergencyContact.findById(req.emergencyContact.id);
    
    emergencyContact.remove()
    res.status(200).json({ 
            id: req.emergencyContact.id,
            message: "Emergency Contact Successfully Deleted"
        })
});

// @desc Update Emergency Contact data
// @route PUT /api/emergencycontacts/me
// @access Private
const updateMe = asyncHandler( async(req,res) =>{
   
    const updatedEmergencyContact = await EmergencyContact.findByIdAndUpdate(req.emergencyContact.id, req.body, {
        new:true,
    });
    res.status(200).json(updatedEmergencyContact)
 
});

// @desc Display an accident to emergency contacts
// @route POST/api/emergencycontacts/accidents
// @access Public
const emergeAccident = asyncHandler( async(req,res) =>{
   
    const emergencyContact = await EmergencyContact.findOne({"nic":req.body.nic})

    const driver = await Driver.findById({"_id":emergencyContact.driver[0]})

    const currentCase= await ActiveCases.findOne({"deviceNum":driver.deviceNum})
    if(!currentCase){
        res.status(201).json({state:"No Accident"})
    }
    else{

        res.status(201).json({
            state:"Accident",
            longitude:currentCase.longitude,
            latitude:currentCase.latitude,
            ambulanceState:currentCase.state,
            criticalState:currentCase.patientCondition
        })
    }

 
});

// @desc Send assigned driver details to emergency contacts
// @route POST/api/emergencycontacts/details
// @access Public
const driverDetails = asyncHandler( async(req,res) =>{
   
    const emergencyContact = await EmergencyContact.findOne({"nic":req.body.nic})

    const driver = await Driver.findById({"_id":emergencyContact.driver[0]})

    if(!driver){
        res.status(201).json({state:"No driver assigned to emergency contact"})
    }
    else{

        res.status(201).json({
            fname:driver.fname,
            lname:driver.lname,
            nic:driver.nic,
            telNum:driver.telNum

        })
    }

 
});

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = {
    registerEmergencyContact,
    loginEmergencyContact,
    getMe,
    removeMe,
    updateMe,
    emergeAccident,
    driverDetails
}