const {User} =require('../models/user.model.js');
const {Post} = require('../models/post.model');
const {Comment} = require('../models/comment.model')
const { filterObj } = require('../util/filterObj');
const {catchAsync} = require('../util/catchAsync');
const {AppError} = require('../util/appError');

// Get all users
exports.getAllUsers = catchAsync (async (req, res) => {
    const users = await User.findAll({
        where:{status:'active'},
        include:[
            {model:Post, include:[{model:Comment, include:[{model:User}]}]},
            {model:Comment, include:[{model:Post}]}]
});
    res.status(200).json({
        status:'succes',
        data:{users}
    });
});

// Get user by ID
exports.getUserById = catchAsync (async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findOne({where:{id:id,status:'active'}});
    if(!user){
        return next(new AppError(404,'User not found'));
    }

    res.status(200).json({
        stsus:'success',
        data: {user}
    });    
});

// Save new user
exports.createNewUser = async (req,res) => {
try {
    const {name,email,password} = req.body;
    if (!name||!email||!password){
        res.status(400).json({
            status:'error',
            message:'must provide a valid name, email and password'
        });
        return;}
    const newUser =  await User.create({
        name: name,
        email: email,
        password:password,
    });
    res.status(201).json({
        status:'success',
        data:{newUser},
    });
} catch (error) {
    console.log(error)
}
};


// Update user (patch)
exports.updateUser = async(req,res) => {
try {
    const { id } = req.params;
    const data = filterObj(req.body,'name', 'age');

    const user = await User.findOne({
        where: {id:id,status:'active'},
    });

    if (!user){
        res.status(404).json({
            stsus:'error',
            message:'cont update user, not a valid ID'
        });
        return;
    }
    await user.update({...data})

    res.status(204).json({
        status:'success'});
} catch (error) {
    console.log(error)
}
};

// Delete user
exports.deleteUser = async (req,res) => {
try {
    const {id} = req.params;

    const user = await User.findOne({where:{id:id,status:'active'}});

    if(!user){
        res.status(404).json({
            stsus:'error',
            message:'cant delete invalid ID'
        });
        return;
    }
    await user.update({status:'deleted'});

    res.status(204).json({status:'success'});
} catch (error) {
    console.log(error)
}
};