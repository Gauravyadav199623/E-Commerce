const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors')

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');




const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.post('/users/add-user', async(req,res,next)=>{
  // console.log(req.body);
  const name=req.body.name;
  const email=req.body.email;
  const data= await User.create({name: name, email:email});
  res.status(201).json({newUserDetail:data});
})

app.get('/users/get-user', async(req,res,next)=>{
  const users=await User.findAll();
  res.status(200).json({allUsers:users})
})


app.delete('/user/delete-user/:id',async(req, res, next) => {
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
