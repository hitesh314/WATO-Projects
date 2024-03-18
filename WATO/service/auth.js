const jwt =  require('jsonwebtoken');
const dotenv = require('dotenv');

console.log(process.env.JWT_SECRET_KEY);

exports.setUser = (user) => {
  console.log(user);
    const newUser = {
      name : user.name,
      email : user.email,
      userId : user._id,
      urls : user.urls
    };

  return jwt.sign(newUser, 'hitesh_johar_secret')
}

exports.getUser = (token) => {
  return jwt.verify(token, 'hitesh_johar_secret');
}