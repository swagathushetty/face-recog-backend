const Clarifai=require('clarifai')

const app = new Clarifai.App({
    apiKey: '68d5e14b6a354c96957087d4de1d2ac3'
})

const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('Unable to work with API'))
}



const handleImage=(req, res,db) => {
    console.log('PUT request made at /image')
    const { id } = req.body

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))

}

module.exports={
    handleImage:handleImage,
    handleApiCall,handleApiCall
}

//Mislenious

    // database.users.forEach((user) => {
    //     if (user.id === id) {
    //         found = true
    //         user.entries++
    //         return res.json(user.entries)
    //     }
    // })
