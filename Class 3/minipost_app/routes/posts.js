const express = require('express');
const router = express.Router();

const Post = require('../models/Posts');


// post route
router.post('/', async (req, res)=> {
    const post = req.body;
    const postData = new Post({
        user: post.user,
        title: post.title,
        text: post.text,
        hashtag: post.hashtag,
        location: post.location,
        url: post.url
    })
    try { 
        const postToSave = await postData.save()
        res.send(postToSave)
    } catch (error) {
        res.send({message: error})
    }
})


// get all the posts
router.get('/', async (req, res)=> {
    try {
        const getPosts = await Post.find();
        res.send(getPosts);
    } catch (error) {
        res.send({message: error})
    }
})


// get posts by id
router.get('/:postId', async (req, res)=> {

    try {
        const getPostsById = await Post.findById(req.params.postId);
        res.send(getPostsById);
    } catch (error) {
        res.send({message: error})
    }
})

// update post by id
router.patch('/:postId', async (req, res)=> {
    try {
        const post = req.body;
        const updatePostById = await Post.updateOne(
            {
                    "_id": req.params.postId
            },
            {
                "$set": {
                    user: post.user,
                    title: post.title,
                    text: post.text,
                    hashtag: post.hashtag,
                    location: post.location,
                    url: post.url
                }
            }
        )
        res.send(updatePostById)
    } catch (error) {
        res.send({message: error})
    }
})


// delete a post

router.delete('/:postId', async (req, res)=> {
    try {
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
    res.send(deletePostById)
    } catch (error) {
        res.send({message: error})
    }

})



module.exports = router;