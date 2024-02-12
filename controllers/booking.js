const User = require('../models/user');


exports.getUser=async(req,res,next)=>{
    try{
      const users=await User.findAll();
    res.status(200).json({allUsers:users})
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  exports.postUsers=async(req,res,next)=>{
    // console.log(req.body);
    try{
      const name=req.body.name;
    const email=req.body.email;
    const data= await User.create({name: name, email:email});
    res.status(201).json({newUserDetail:data});
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  exports.deleteUser=async(req, res, next) => {
    try {
      const prodId = req.params.id;
      console.log(prodId)
      const user = await User.findByPk(prodId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
