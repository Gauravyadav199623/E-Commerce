const fs=require('fs');
const path=require('path');

const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductsFromFile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
            if(err){
                 cb([]);
            }else{

                cb(JSON.parse(fileContent))//to receive as an array(not as a text)
            }
        })
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products=>{
            products.push(this);// to ensure that "this" refers to the class we should use arrow function only
            fs.writeFile(p,JSON.stringify(products),(err)=>{      //convert to json and then written to the file
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
};