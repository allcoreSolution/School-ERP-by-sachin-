const Event = require('../models/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) { next(error); }
};

exports.getEvents = async (req, res, next) => {
  try {
    const { month, year, status } = req.query; // optional filtering
    let query = {};
    if(month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.startDate = { $gte: startDate, $lte: endDate };
    }
    if (status) query.status = status;
    const events = await Event.find(query).sort({ startDate: 1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) { next(error); }
};

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: event });
    } catch (error) { next(error); }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Event deleted' });
    } catch (error) { next(error); }
};
