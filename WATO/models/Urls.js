const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: { 
    type: String, 
    required: true 
  },
  shortUrl: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: {
     type: Date, 
     default: Date.now 
    },
  userId : {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 24 * 60 * 60 * 1000 // Default to 24 hours from now
  }
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
