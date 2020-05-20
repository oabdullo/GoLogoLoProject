var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: [{
    text: String,
    fontSize : { type: Number, min: 2, max: 144 },
    color : String,
    x: Number,
    y: Number
  }],
  // url: [String],
  height : {type:Number},
  width: {type: Number},
  
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  margin: { type: Number, min: 0, max: 100 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);