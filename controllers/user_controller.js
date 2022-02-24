const User = require('../models/user_model')
const {CreateUserValidation} = require('../validation/user_schema')
module.exports = {
    createUser:(req,res,next)=>{
        const {error} = CreateUserValidation(req.body)
        if(error){
            return res.json({
                success:false,
                errors :error,
                message:"user data validation error"
            })
        }
      User.create(req.body,(err,user)=>{
         if (err) {
             res.status(500).json({
                 success:false,
                 errors:err,
                 message:"error creating new user",
                 data:null
             })
         } else {
            res.status(201).json({
                success:true,
                message:"success creating new user",
                data:user
            })
         }
      })
    },
    deleteUser:(req,res,next)=>{
        User.findByIdAndDelete({_id:req.params.id},(err,userDeleted)=>{
            if(err){
                res.status(500).json({
                    success:false,
                    errors:err,
                    message:"user not deleted",
                    data:null
                })
            }else{
                res.status(200).json({
                success:true,
                message: "user successfully deleted",
                data:userDeleted
            })
            }
        })
    },
    updateUser : (req,res,next)=>{
        User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,userUpdated)=>{
            if(err){
                res.status(500).json({
                    success:false,
                    errors:err,
                    message:"error updating user",
                    data:null
                })
            }else{
                res.status(200).json({
                    success:true,
                    message:"user successfully updated",
                    data:userUpdated
                })
            }
        })
    },
    getAll :(req,res,next)=>{
        User.find({})
        .then(users=>{
            res.status(200).json({
                success:true,
                message:"users in system",
                data:users
            })
        })
        .catch(err=>{
            res.status(500).json({
                success:false,
                message:"no users found",
                errors:err,
                data:null
            })
        })
    },
    getById:(req,res,next)=>{
        User.findById({_id:req.params.id},(err,user)=>{
            if(err){
                res.status(500).json({
                  success:false,
                  message:"user not found" ,
                  errors:err,
                  data:null 
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:user,
                    message:"user is found"
                })

            }
        })
    },
    getByName:(req,res,next)=>{
        User.find({username:{$regex : req.body.keyword}},(err,users)=>{
            if(err){
                res.status(500).json({
                    success: false,
                    message: 'no users in system',
                    errors: err
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: 'users in system :' + users.length,
                    data: users
                })
            }
        })
    },

    uploadAvatar:(req,res,next)=>{
        User.findByIdAndUpdate(
            {_id:req.params.id},
            {avatar:req.file.filename},
            {new:true},
            (err,userUpdated)=>{
            if(err){
                res.status(500).json({
                    succes:false,
                    errors:err,
                    message:"failed upload image by updating user",
                    data:null
                })
            }else{
                res.status(200).json({
                    success:true,
                    data:userUpdated,
                    message:"image saved"  
                })
            }
        })
    }
}