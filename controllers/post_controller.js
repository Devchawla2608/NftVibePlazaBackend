const Post = require("../models/Post.js");
const User = require("../models/User.js");
const jwt  = require('jsonwebtoken')
// module.exports.create = async function (req, res) {
//     try{   
//         await Post.uploadedPost(req , res , async function(err){
//             if(err){console.log("Multer Error" , err)};
//             let post = {
//                 caption: req.body.caption,
//                 image: Post.postPath + '/' + req.file.filename,
//             }
//             let newPost = await Post.create(post)
//             if(!newPost){
//                 return res.send({
//                     data: false,
//                     message: "Error in creating post",
//                     status: 500
//                 })
//             }
//             console.log("Post is created ", newPost)
//             return res.send({
//                     data: {
//                         post: newPost
//                     },
//                     message: "Post created successfully",
//                     status: 200
//             })
//     })
//     }catch(err){
//         console.log("Error in creating post", err)
//         return res.send({
//             data: false,
//             message: "Error in creating post",
//             status: 500
//         })
//     }   
// };

// Create post with post image uploded on cloudinary
module.exports.create = async function (req, res) {
    const token = req.headers['x-access-token'];
    try{
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.email;
        const user = await User.findOne({email: email});
        if(!user){
            return res.send({
                data: false,
                message: "User not found",
                status: 404
            })
        }
        let post = {
            caption: req.body.caption,
            image: req.body.pic,
            user: user
        }
        console.log("This is ppost data " ,post);
        let newPost = await Post.create(post)
        if(!newPost){
            return res.send({
                data: false,
                message: "Error in creating post",
                status: 500
            })
        }
        console.log("Post is created ", newPost)
        return res.send({
                data: {
                    post: newPost
                },
                message: "Post created successfully",
                status: 200
        })
    }
    catch(err){
        console.log("Error in creating post", err)
        return res.send({
            data: false,
            message: "Error in creating post",
            status: 500
        })
    }
};


// Fetch Post
module.exports.fetchPost = async function(req , res){
    try{
        let posts = await Post.find({}).populate('user')
        if(!posts){
            return res.send({
                data: false,
                message: "Error in fetching post",
                status: 500
            })
        }
        return res.send({
            data: {
                posts: posts
            },
            message: "Posts fetched successfully",
            status: 200
        })
    }catch(err){
        console.log("Error in fetching post", err)
        return res.send({
            data: false,
            message: "Error in fetching post",
            status: 500
        })
    }
}