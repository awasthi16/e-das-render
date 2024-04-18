const express = require("express")
const app = express();
const cors= require("cors")
const users=require("./db/users")
const Product= require("./db/Product")
require("./db/config")
app.use(express.json())


app.use(cors())

app.post("/register", async (req,resp)=>{
    let data = new users (req.body)
    let result = await data.save()
    result = result.toObject();
    delete result.password
    resp.send(result)
})

app.post ("/login", async (req, resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email)
    {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({result:"No user found "})
        }   
    }
    else{
        resp.send({result:"No user found o"})
    }
})

app.post("/add-product", async (req,resp)=>{
    let product = new Product(req.body);
    let result= await product.save();
    resp.send(result)
    console.log(result)

});


app.get("/products", async(req,resp)=>{
    let products =await Product.find();
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No Products Found"})
    }
})

app.delete("/product/:id",async(req,resp)=>{
   
    const result= await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get("/product/:id"), async(req,resp)=>{
    let result = await product.findOne({_id:req.params.id})
    if(result)
    { resp.send(result)

      }
        else{
        resp.send({result:"no recod found"})
    }
    
}
app.listen(5000)