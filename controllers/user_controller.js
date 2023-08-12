const User = require("../models/User.js");
const jwt  = require('jsonwebtoken')
module.exports.create = function (req, res) {
    if (req.body.body.password !== req.body.body.confirmPassword) {
      return res.redirect("back");
    }
    User.find({ email: req.body.body.email })
      .then(function (user) {
        if (!user) {
          console.log("User Already Exits ", user);
          alert("User Already Exits");
          return res.send({
            status: 422,
            message: "User Already Exits",
          })
        }
        User.create(req.body.body)
          .then(function (newUser) {
            alert("User Created Successfully");
            return res.send({
              status: 200,
              message: "User Created Successfully",
                data: newUser,
            })
          })
          .catch(function (err) {
            alert("Internal  Error");
            return res.send({
              status: 500,
              message: "Internal  Error",
              data:err
            })
          });
      })
      .catch(function (err) {
        alert("Internal Server Error");
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
            alert("Sign in Successfully");
            return res.send({
                status: 200,
                message: "Sign in Successfully",
                data: token
            })
        }else{
          alert("Invalid Email/Password");
            return res.send({
                status: 422,
                message: "Invalid Email/Password",
                data: false
            })
        }
    }
    catch(err){
      alert("Internal Server Error");
        console.log("Error", err);
        return res.send({
            status: 500,
            message: "Internal Server Error",
            data:false
          })
    }
};