const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    urls : [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Url',
        required: true,
      }
    ]
  },
)

const User = mongoose.model('user', userSchema)
module.exports = User