const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product= new Product({
    title:title,
    price:price,
    description:description,
    imageUrl:imageUrl,
    userId:req.user  //mongoose will automatically get the user id from user object
  })//key(from model):value(from req.body)
  product
    .save() // this save method is provided by mongoose (we dint declare it)
    // technically we didn't get a promise but mongoose gives us then & catch method
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  
Product.findById(prodId).then(product=>{

  product.title=updatedTitle;
  product.price=updatedPrice;
  product.description=updatedDesc;
  product.imageUrl=updatedImageUrl;
  
  
  return product // this product will we a mongoose object with mongoose method like save 
  //if we call save() on an existing object the it wont save as a new object but only the changes will be save (ie an update)
    .save()
})
.then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
})
.catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
  // .select("title price -_id")
  // .populate('userId','name') 
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
