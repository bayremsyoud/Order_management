const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
const UserSchema = new Schema({
  nomUser: String,
  prenomUser: String,
  emailUser: String,
  numUser: String,
  roleUser: String,
  passUser: String,
  register_at: {
    type: Date,
  },
  update_at: {
    type: Date,
  },  
  isConfirmed:
  { type: Boolean,
    default: false,

  },isActive: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  imageUser: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },

});
//okht oussema
UserSchema.pre("save", async function () {
  if (this.isModified("passUser") || this.isNew) {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(this.passUser, salt);
    this.passUser = hash;
  }
});

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
