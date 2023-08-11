const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const POST_PATH = path.join('/uploads/posts/images')
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    image:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null , path.join(__dirname,'..' , POST_PATH));
    },
    filename: function(req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req , file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){

        cb(null , true);
    }else{

        cb(null , false); 
    }
}


// static
postSchema.statics.uploadedPost = multer({storage , fileFilter}).single('image');

postSchema.statics.postPath = POST_PATH;
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
 