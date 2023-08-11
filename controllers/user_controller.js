const User = require("../models/user.js");
const jwt  = require('jsonwebtoken')
module.exports.create = function (req, res) {
    if (req.body.body.password !== req.body.body.confirmPassword) {
      return res.redirect("back");
    }
    User.find({ email: req.body.body.email })
      .then(function (user) {
        if (!user) {
          console.log("User Already Exits ", user);
          return res.send({
            status: 422,
            message: "User Already Exits",
          })
        }
        User.create(req.body.body)
          .then(function (newUser) {
            return res.send({
              status: 200,
              message: "User Created Successfully",
                data: newUser,
            })
          })
          .catch(function (err) {
            return res.send({
              status: 500,
              message: "Internal Server Error",
            })
          });
      })
      .catch(function (err) {
        return res.send({
          status: 500,
          message: "Internal Server Error",
        })
      });
};

module.exports.createSession = async function (req, res) {
    try{
        let user = await User.findOne({email:req.body.body.email});
        if(user){
            const token = jwt.sign ({
                name: user.name,
                email: user.email,
            },
            'secret',
            { expiresIn: '1h' }
            );
            return res.send({
                status: 200,
                message: "Sign in Successfully",
                data: token
            })
        }else{
            return res.send({
                status: 422,
                message: "Invalid Email/Password",
                data: false
            })
        }
    }
    catch(err){
        console.log("Error", err);
        return res.send({
            status: 500,
            message: "Internal Server Error",
            data:false
          })
    }
};