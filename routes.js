const express = require('express');
const app = express();
// const router = require("express").Router();
const mongoose = require('mongoose');
const Wish = mongoose.model("wishes");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/withoutreduxCRUD')

module.exports = (app)=>{

app.get('/data',(req,res)=>{
    Wish.find({}).then(data=>{
        console.log(data)
        // res.render('home',{wish:data})
        res.send(data)
    })
})

app.get('/about',(req,res)=>{
    res.render('about')
})   

app.get('/:postId',async(req,res)=>{
    console.log("aaaaaaaa")
    try{
        const post =await Wish.findOne({_id: req.params.postId})
        res.send(post)
    } catch (error){
        res.status(500)
    }   
})


app.post('/sent',(req,res)=>{
    const Item = new Wish({
        item:req.body.item
    });
    Item.save().then(data=>{
        console.log("saved")
        res.send(data)
    }).catch(err=>{
        throw err;
    })
  
})

app.put("/update/:postId", async (req,res)=>{
    console.log("bbbbbbb")
    try{
        const post = await Wish.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body,{
            new:true,
            runValidatiors : true
        });
        res.send(post)
        console.log(post)
        console.log(req.body)
    } catch (error){
        res.status(500)
    }
})

app.delete('/remove/:id',(req,res)=>{

    Wish.findOneAndRemove({_id:req.params.id}).then(data=>{
        console.log("deleted")
        res.send(data)
    })

})



}

