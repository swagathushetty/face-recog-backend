const handleProfile=(req, res,db) => {
    const { id } = req.params

    db.select('*').from('users').where({ id: id })
        .then((user) => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }

        }).catch((e) => {
            return res.status(400).json('error getting user')
        })

}

module.exports={
    handleProfile:handleProfile
}



//Mislenious



    // database.users.forEach((user)=>{
    //     if(user.id===id){
    //         found=true
    //         return res.json(user)
    //     }
    // })

    // if(!found){
    //     res.status(400).json('not found user')
    // }