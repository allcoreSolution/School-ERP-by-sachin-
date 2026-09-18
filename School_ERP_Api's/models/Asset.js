const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetName: { type: String, required: true },
  assetType: { type: String, required: true }, // Electronics, Furniture, etc.
  quantity: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
  purchaseDate: { type: Date },
  cost: { type: Number },
  status: { type: String, enum: ['Active', 'Damaged', 'Lost'], default: 'Active' }
}, { timestamps: true });

const assetIssueSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ['Issued', 'Returned'], default: 'Issued' }
}, { timestamps: true });

const Asset = mongoose.model('Asset', assetSchema);
const AssetIssue = mongoose.model('AssetIssue', assetIssueSchema);

module.exports = { Asset, AssetIssue };
