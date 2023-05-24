const express = require('express');
const router = express.Router()
// import the Post model 
const Posts = require('../models/Posts');

router.get('/', (req, res) => {
    res.send('route to get all posts')
})

// route for creating and saving a post in the db
router.post('/', (req, res) => {
    // creating the post
    const {title, description} = req.body
    const post = new Posts({
        title: title,
        description: description
    })
    // saving the post created into the db and handling any errors
    post.save()
        .then((data) => res.json(data))  // res is the res parameter of the callback func
        .catch((err) => res.json({message: err}))
})

module.exports = router