const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const authService = require('../service/auth')

exports.register = async (req, res) => {
  try{
    const {
       name, email, password} = req.body;

    //Creating a hash value for the password.
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    //Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address format' });
    }
  
    // Checking if the referral token is valid.
    const newUser = new User({
        name,
        email,
        password : hashPassword,
    });
    
    const userToken = authService.setUser(newUser);
    await newUser.save();

      res.status(201).json(
        { message: "The user has been registered successfully" ,
          token : userToken
        })
  }
  catch(error){
    res.status(400).json(
        {
          result : error.message,
        });

    console.log(error);
  }
};

//Controller method for login.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if username and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Both username and password are required.' });
    }

    //Get details of user with given username
    const findUser = await User.findOne({ email });

    if (findUser) {
      if (bcrypt.compareSync(password, findUser.password)) {
        const userToken = authService.setUser(findUser);
        res.status(201).json({
          message: "Login successful",
          result: {
            result : userToken,
          },
        });
      } else {
        res.status(400).json({
          message: 'Invalid password for email address : ' + email,
        });
      }
    } else {
      res.status(400).json({
        message: 'User does not exist',
      });
    }
  } catch (error) {
      res.status(400).json({
        message: error.message,
      });
      console.log(error);
  }
};

//controller method to get user details from authorization token
exports.getUserAuth = async (req, res) => {
  try {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract user information from the token
    const decodedUser = authService.getUser(token);

    res.status(200).json({ user: decodedUser });
  } 
  catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    console.log(error);
  }
};