const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors')

const errorController = require('./controllers/error');
const sequelize = require('./util/database');





const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bookingRoutes=require('./routes/booking')
const expenseRoutes=require('./routes/expense')


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(bookingRoutes)
app.use(expenseRoutes)

const Cricket=require('./models/cricket')

app.get("/cricket/get-player", async(req,res,next)=>{
 

})
app.get("/cricket/get-player/:name", async(req, res, next) => {
  const playerName = req.params.name;
  console.log(playerName);
  
  const player = await Cricket.findOne({ where: { name: playerName } });
  
  if (player) {
    res.status(200).json({ player });
  } else {
    res.status(404).json({ error: "Player not found" });
  }
});

app.post("/cricket/post-player",async(req,res,next)=>{
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
})
app.put("/cricket/put-player/:id",async(req,res,next)=>{
  try{
    const id=req.params.id;
    console.log(id)
    const player=await Cricket.findOne({where:{id:id}});
    
    if(player){
      const name=req.body.name;
      const dob=req.body.dob;
      const photo=req.body.photo;
      const career=req.body.career;

      await player.update({name:name, dob:dob, photo:photo, career:career})
      res.status(200).json({updatedPlayer:player})
    } else{
      res.status(404).json({error:'Player not found'})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server err'})
  }
})






app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
