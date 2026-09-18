const AssignFee = require('../models/AssignFee');
const FeeCollection = require('../models/FeeCollection');

const getExpectedAmount = (assignRecord) => {
  if (assignRecord.customAmount !== null && assignRecord.customAmount !== undefined) {
    return assignRecord.customAmount;
  }
  if (!assignRecord.feeGroup || !assignRecord.feeGroup.feeTypes) return 0;
  return assignRecord.feeGroup.feeTypes.reduce((sum, item) => sum + (item.amount || 0), 0);
};

exports.getDashboardStats = async (req, res) => {
  try {
    const assigned = await AssignFee.find().populate({
      path: 'feeGroup',
      populate: { path: 'feeTypes.feeType' }
    });
    const totalExpected = assigned.reduce((sum, r) => sum + getExpectedAmount(r), 0);

    const collections = await FeeCollection.find().populate('discount');
    const totalCollected = collections.reduce((sum, c) => sum + c.amountPaid, 0);
    const totalFines = collections.reduce((sum, c) => sum + c.fineAmount, 0);

    let totalDiscount = 0;
    collections.forEach(c => {
      if (c.discount) {
        if (c.discount.discountType === 'Percentage') {
          totalDiscount += (totalExpected * c.discount.amount) / 100;
        } else {
          totalDiscount += c.discount.amount;
        }
      }
    });

    const totalDue = Math.max(0, totalExpected - totalCollected);

    const paymentModeBreakdown = { Cash: 0, Cheque: 0, Online: 0, DD: 0 };
    collections.forEach(c => {
      if (paymentModeBreakdown[c.paymentMode] !== undefined) {
        paymentModeBreakdown[c.paymentMode] += c.amountPaid;
      }
    });

    const recentPayments = await FeeCollection.find()
      .populate('student', 'firstName lastName aparId')
      .populate('feeGroup', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalExpected,
        totalCollected,
        totalDue,
        totalFines,
        totalDiscount,
        paymentModeBreakdown,
        recentPayments
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
