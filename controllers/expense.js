const Expense=require("../models/expense2")


exports.getExpenses=async(req,res,next)=>{
    try{
      const expenses =await Expense.findAll();
      res.status(200).json({allUsers:expenses})
    }catch(err){
      console.log(err)
      res.status(500).json({error:'Internal server error'});
    }
  };

  exports.postExpense=async(req,res,next)=>{
    try{
      
      console.log(req.body)
      const amount=req.body.amount;
      const description=req.body.description;
      const category=req.body.category;
      const data=await Expense.create({amount:amount, description:description, category:category});
      res.status(201).json({newExpense:data})
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  exports.deleteExpense=async(req,res,next)=>{
    try{
      const prodId=req.params.id;
      console.log(prodId)
      const expense=await Expense.findByPk(prodId)
      if (!expense) {
        return res.status(404).json({ error: 'expense not found' });
      }
      await expense.destroy();
      res.status(200).json({ message: 'expense deleted successfully' });
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

