 const bodyParser = require('body-parser');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
 const app =express()

 const users =[{
     id :1,
     name :"tresor",
     age: 20,
     gender :"male"

 }]
//api to get all users
app.get('/api/users/', (req,res)=> {
    res.send(users)

})
//api to get user by id
app.get('/api/user/:id',(req,res)=>{
    for(const i in users) {
        if(usres[i].id == req.params.id)
        return res.send(users[i])
    }
    return res.status(404).send('uses with is(${eq.params.id}) was not found')
}) 

app.listen(3000, () => {
    console.log("Server is running ...");
})