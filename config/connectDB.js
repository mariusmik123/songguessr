const mongoose = require('mongoose')
// https://mongoosejs.com/docs/guide.html

const connectDB = async ()=>{
    try {
     
    await mongoose.connect(process.env.DATABASE_URI)
   
    } catch (error) {
    console.error(error)        
    }
}

module.exports = connectDB