const Cricket=require('../models/cricket')

exports.boom=async(req,res,next)=>{
    console.log("boom-boom")
}
exports.getPLayer=async(req, res, next) => {
    const playerName = req.params.name;
    console.log(playerName);
    
    const player = await Cricket.findOne({ where: { name: playerName } });
    
    if (player) {
      res.status(200).json({ player });
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  };
exports.postPLayer=async(req,res,next)=>{
    try{
      console.log(req.body)
      const name=req.body.name;
      const dob=req.body.dob;
      const photo=req.body.photo;
      const career=req.body.career;
      const data=await Cricket.create({name:name, dob:dob, photo:photo,career:career});
      res.status(201).json({newPlayer:data})
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server err' });
    }
  }
  exports.putPLayer = async(req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id);
      const player = await Cricket.findOne({ where: { id: id } });
  
      if (player) {
        const updatedData = {
          id: id, // Include the id in the update
          name: req.body.name,
          dob: req.body.dob,
          photo: req.body.photo,
          career: req.body.career
        };
  
        await player.update(updatedData);
        res.status(200).json({ updatedPlayer: player });
      } else {
        res.status(404).json({ error: 'Player not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };