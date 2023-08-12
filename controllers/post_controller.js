const Post = require("../models/Post.js");
module.exports.create = async function (req, res) {
    console.log(req.body)
    try{
        await Post.uploadedPost(req , res , async function(err){
            if(err){console.log("Multer Error" , err)};
            let post = {
                caption: req.body.caption,
                image: Post.postPath + '/' + req.file.filename,
            }
            let newPost = await Post.create(post)
            if(!newPost){
                alert("Error in creating post");
                return res.send({
                    data: false,
                    message: "Error in creating post",
                    status: 500
                })
            }
            alert("Post created successfully");
            console.log("Post is created ", newPost)
            return res.send({
                    data: {
                        post: newPost
                    },
                    message: "Post created successfully",
                    status: 200
            })
    })
    }catch(err){
        alert("Error in creating post");
        console.log("Error in creating post", err)
        return res.send({
            data: false,
            message: "Error in creating post",
            status: 500
        })
    }   
};