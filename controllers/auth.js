const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../models');


const register = async (req, res) => {
  const { displayName, email, password } = req.body

  if (!displayName || !email || !password) {
    return res.status(400).json({message: 'All fields are required. Please try again'});
  }

  // VALIDATE PASSWORD LENGTH
  if (password.length < 4) {
    return res.status(400).json({message: 'Password must be at least 4 characters long'});
  }

  let body = req.body
  body.email = email.toLowerCase();

  try {
    const foundUser = await db.User.findOne({ email: body.email });

    if (foundUser) {
      res.status(400).json({
        status: 400,
        message: "Email address has already been registered. Please try again",
      });
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(body.password, salt);

    await db.User.create({ ...body, password: hash });

    return res.status(201).json({status: 201, message: "success"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


const login = async (req, res) => {
  try {
    let body = req.body;
    body.email = req.body.email.toLowerCase();

    // FIND USER BY EMAIL (OR USERNAME)
    const foundUser = await db.User.findOne({ email: body.email });

    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        message: "Email or password is incorrect"
      });
    }

    // CHECK IF PASSWORDS MATCH
    const isMatch = await bcrypt.compare(body.password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Email or password is incorrect",
      });
    }

    // CREATE TOKEN PAYLOAD
    const payload = {
      id: foundUser._id,
      email: foundUser.email,
    };
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "3h"};
    
    // SIGN TOKEN
    const token = await jwt.sign(payload, secret, expiration);
    
    const user = {
      token,
      email: foundUser.email,
      displayName: foundUser.displayName,
      imageURL: foundUser.imageURL
    };
    
    // SEND SUCCESS WITH TOKEN
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


const verify = async (req, res) => {
  const token = req.headers['authorization'];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({
        message: 'You are not authorized. Please login and try again'
      });
    }
    const foundUser = await db.User.findOne({ email: decodedUser.email });
    const user = {
      token,
      email: foundUser.email,
      displayName: foundUser.displayName,
      imageURL: foundUser.imageURL
    };

    res.status(200).json({user: user});

    // ********** --- --- **********
    // CALL NEXT AS MIDDLEWARE FUNCTION
    // next();
  });
};


module.exports = {
  register,
  login,
  verify,
};
