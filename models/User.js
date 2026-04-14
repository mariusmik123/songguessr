const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //User ID 
    userID:{
        type:String,
        required:true,
        unique: true
    },
    //username
    username:{
        type: String,
        default: "Guest67"
    },
    //trophies
    trophies:{
        type: Number,
        default:500
    },
    //energyCount
    energyCount:{
        type:Number,
        default:10
    },
    //max energy
    maxEnergy: {
        type: Number,
        default: 10
    },
    //lastEnergyUpdate
    lastEnergyUpdate:{
        type:Date,
        default: Date.now
    },
    //hasInfinityEnergy
    hasInfinityEnergy:{
        type:Boolean,
        default:false
    }
}, { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)