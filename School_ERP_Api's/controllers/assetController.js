const { Asset, AssetIssue } = require('../models/Asset');

exports.addAsset = async (req, res, next) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json({ success: true, data: asset });
  } catch (error) { next(error); }
};

exports.getAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find();
    res.status(200).json({ success: true, count: assets.length, data: assets });
  } catch (error) { next(error); }
};

exports.issueAsset = async (req, res, next) => {
  try {
    const issue = await AssetIssue.create(req.body);
    await Asset.findByIdAndUpdate(req.body.asset, { $inc: { available: -1 } });
    res.status(201).json({ success: true, data: issue });
  } catch (error) { next(error); }
};
