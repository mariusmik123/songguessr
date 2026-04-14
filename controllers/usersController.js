const User = require("../models/User");

const getAllUsers = async (req, res) => {
    const authTry = req.params.auth
    if (authTry === process.env.AUTHPWD){
    res.json(await User.find());
    }
    else { res.status(400).json({ 'message': 'Correct authorication is required.' });}
}

const getUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
    const user = await User.findOne({userID:req.params.id}).exec();
    if (!user){
        const result = await User.create({
            "userID": req.params.id,
        })
        res.status(201).json(result);
        return
    }
    res.json(user);
}

const updateEnergyHandler = async (req,res)=>{
    if (!req.params.id) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
    const user = await User.findOne({userID:req.params.id}).exec();
    if (!user) {
    return res.status(404).json({ message: "User not found" });
}
    if (user.hasInfinityEnergy)return
    const now = Date.now();
    const diff = now - user.lastEnergyUpdate;

    const energyToAdd = Math.floor((diff/(1000*60*5)))
    if (energyToAdd>0){
    user.energyCount = Math.min(user.energyCount + energyToAdd,user.maxEnergy);

    user.lastEnergyUpdate = now;

    await user.save()}
    res.json(user)
}

const spendEnergyHandler = async (req, res) => {
if (!req.params.id) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
const user = await User.findOne({userID:req.params.id}).exec();

if (user.hasInfinityEnergy)return
if (user.energyCount>0){user.energyCount = user.energyCount -1 ;}
await user.save()
res.json(user)
}


const videoEnergyHandler = async (req, res) => {
    if (!req.params.id) {return res.status(400).json({ "message": `User ID ${req.params.id} not found` })}

    // TODO make user watch an add video 


    let user;
    try {
        user = await User.findOne({userID:req.params.id}).exec();

    } catch (error) {
        console.log(error)
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` })
    }
    user.energyCount = user.energyCount + 3;
    if (user.energyCount>user.maxEnergy){user.energyCount =user.maxEnergy}
    await user.save();
    res.json(user)
}


module.exports = { getAllUsers, getUser, updateEnergyHandler, spendEnergyHandler, videoEnergyHandler };