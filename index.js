const bodyParser = require('body-parser')// import bodyparser
const express = require('express')// import an express
const req = require('express/lib/request')
const res = require('express/lib/response')
const { validateUser } = require('./validation')
const app = express()// create express

const users = [{
    id: 1,
    name: "tresor",
    age: 20,
    gender: "male"

}]
// it is a function it will run before arriving to the reqiure request
//parser application /x-ww-form-urlencoded 
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//api to get all users
app.get('/api/users/', (req, res) => {
    res.send(users)

})
//api to get user by id
app.get('/api/users/:id', (req, res) => {
    for (const i in users) {
        if (users[i].id == req.params.id)
            return res.send(users[i])
    }
    return res.status(404).send(`uses with is(${req.params.id}) was not found`)
})
//api to create a user 
app.post('/api/users', (req, res) => {
    //joi 
    let error = validateUser(req.body)
    // is to check if the data the users have inputed it valid
    if(error != '')
        return res.status(400).send(error)
   
    let user = {
        id:users ==[]? 1 : users[users.length -1].id + 1,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender

    }
    //it add element we added in the array
    users.push(user)
return res.status(201).send(user)

})
// to update the users
app.put('/api/users/:id', (req, res) => {
    //joi 
    
    let error = validateUser(req.body)
    if (error != '')
        return res.status(400).send(error)
   
 
    for (let i=0; i < users.length; i++) {
        if (users[i].id == req.params.id){
            users[i].name= req.body.name
            users[i].age= req.body.age
            users[i].gender= req.body.gender
            return res.send(users[i])
        }
        
    }
    return res.status(404).send(`uses with is(${req.params.id}) was not found`)
})

// api to delete users  by id
app.delete('/api/users/:id', (req, res) => {
    for (const i in users) {
        if (users[i].id == req.params.id){
            users.splice(i,1)
            return res.send( `user with id(${req.params.id}) was deleted`)
        }
}
    return res.status(404).send(`uses with is(${req.params.id}) was not found`)
})
app.listen(3000, () => {
    console.log("Server is running ...");
})