const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ['EMPLOYEE','MANAGER','ADMIN'], default: 'EMPLOYEE' },
  passwordHash: { type: String, required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = model('User', UserSchema);
