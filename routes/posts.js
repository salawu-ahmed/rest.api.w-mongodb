const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
// import the Post model 
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        // find() -> to fetch the data from mongodb
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
})

// route for creating and saving a post in the db
router.post('/', async (req, res) => {
    // creating the post
    const {title, description} = req.body
    const post = new Post({
        title: title,
        description: description
    })
    // saving the post created into the db and handling any errors
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({message : err})
    }
})

//route to get a specific post 
router.get('/:postId', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.postId)
        console.log(posts);
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
})

// router to update a specific post
router.patch("/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            })
        res.json(updatedPost)
    } catch (err) {
        res.json({Message: err})
    }
})

module.exports = router