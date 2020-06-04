const express=require('express')
const app=express()
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')
const knex=require('knex')

const register=require('./controllers/register')
const signin=require('./controllers/signin')
const profile=require('./controllers/profile')
const image=require('./controllers/image')

const PORT = process.env.PORT || 3000;




 const db=knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //localhost
        user: 'udayshetty',
        password: '',
        database: 'smart-brain'
    }
})



app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('its working')
})

app.post('/signin',(req,res)=>{
    signin.handleSignin(req, res, bcrypt, db)
})

//dependecy injection
app.post('/register',(req,res)=>register.handleRegister(req,res,db,bcrypt))


app.get('/profile/:id',(req,res)=>{
    profile.handleProfile(req,res,db)
})

//updates the entires
app.put('/image',(req,res)=>{
    image.handleImage(req,res,db)
})


app.post('/imageURL',(req,res)=>{
    image.handleApiCall(req,res)
})


app.listen(PORT||3001,()=>{
    console.log(`app is running at server ${PORT}`)
})




//Mislenious



// db.select('*').from('users').then((data)=>{
//     console.log(data) //we get [] when there is nothing.if data exists we have array of obj
// })


// bcrypt.hash("bacon", null, null, function (err, hash) {
//     console.log(hash)
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
   // res = false
// });