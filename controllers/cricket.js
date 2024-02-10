const Cricket=require('../models/cricket2')

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
      const matches=req.body.matches;
      const fifties=req.body.fifties;
      const centuries=req.body.centuries;
      const wickets=req.body.wickets;
      const average=req.body.average;
      const data=await Cricket.create({name:name, dob:dob, photo:photo,career:career,
         matches:matches, fifties:fifties, centuries:centuries, wickets:wickets, average:average 
         });
      res.status(201).json({newPlayer:data})
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server err' });
    }
  }
//   exports.putPLayer = async(req, res, next) => {
//     try {
//       const id = req.params.id;
//       console.log(id);
//       const player = await Cricket.findByPk(id);
  
//       if (player) {
//         const updatedData = {
//           id: id, // should i include the id ??
//           name: req.body.name,
//           dob: req.body.dob,
//           photo: req.body.photo,
//           career: req.body.career,
//           matches:req.body.matches,
//           fifties:req.body.fifties,
//           centuries:req.body.centuries,
//           wickets:req.body.wickets,
//           average:req.body.average
//         };
  
//         await player.update(updatedData);
//         res.status(200).json({ updatedPlayer: player });
//       } else {
//         res.status(404).json({ error: 'Player not found' });
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
exports.deletePlayer=async(req,res,next)=>{
    try{
      const prodId=req.params.id;
      console.log(prodId)
      const player=await Cricket.findByPk(prodId)
      if (!player) {
        return res.status(404).json({ error: 'player not found' });
      }
      await player.destroy();
      res.status(200).json({ message: 'player edited successfully' });
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }