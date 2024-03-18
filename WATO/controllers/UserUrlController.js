const Url = require('../models/Urls');
const User = require('../models/Users');
const authService = require('../service/auth')
const validUrl = require('valid-url');
const shortid = require('shortid');

exports.generate = async (req, res) => {
  try{
    const {
       longerUrl, userId } = req.body;

    // Validate the long URL
    if (!longerUrl) {
      return res.status(400).json({ error: 'Please enter a url' });
    }
    var userDetails = await User.findById(userId);
    console.log(userDetails);
    if (!userId || !userDetails) {
      return res.status(400).json({ error: 'Invalid user input' });
    }
    
    var url = await Url.findOne({ longUrl : longerUrl });
    if (!url) {
      const shortUrl = shortid.generate();
      const newUrl = new Url({ longUrl : longerUrl, shortUrl, userId });

      url = await newUrl.save();
      userDetails.urls.push(url._id);
      userDetails.save();

      res.status(201).json(
        { 
          message: "The given url has been shortened" ,
          result : url
        })
    }
    else
    {
      res.status(400).json({
        message : "The url is already shortened",
      })
    }
  }
  catch(error){
    res.status(400).json(
        {
          result : error.message,
        });
  }
};

//Get the shorten url details .
exports.getShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // Check if username and password are provided
    if (!longUrl) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    //Get details of url with given longer url.
    var findUrl = await Url.findOne({ longUrl : longUrl });

    console.log(findUrl);

    if(findUrl)
    {
      res.status(200).json({
        message : 'Short url has been shortened',
        result : findUrl,
      });
    } 
    else {
      res.status(400).json({
        message: 'Url does not exist',
      });
    }
  } catch (error) {
      res.status(400).json({
        message: error.message,
      });
      console.log(error);
  }
};

exports.getUserUrls = async(req,res) => {
  try{
    const {
      userId } = req.body;

      const userDetails = await User.findById(userId);

      const urlDetails = [];
      for (const url of userDetails.urls) {
        const urlDetail = await Url.findById(url._id);
        urlDetails.push(urlDetail);
      }

      if (userDetails) {
        res.status(200).json({
          result: urlDetails
        });
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
  }
  catch(error)
  {
      res.status(401).json({
        message : error.message,
      });
  }
}