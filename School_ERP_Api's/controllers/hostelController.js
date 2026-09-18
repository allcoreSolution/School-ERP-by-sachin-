const HostelRoom = require('../models/Hostel');

exports.addRoom = async (req, res, next) => {
  try {
    const room = await HostelRoom.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) { next(error); }
};

exports.getRooms = async (req, res, next) => {
  try {
    const { hostelName } = req.query;
    let query = {};
    if (hostelName) query.hostelName = hostelName;

    const rooms = await HostelRoom.find(query).populate('allocatedStudents', 'firstName lastName rollNo contactNumber');
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) { next(error); }
};

exports.updateRoom = async (req, res, next) => {
  try {
     const room = await HostelRoom.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.status(200).json({ success: true, data: room });
  } catch (error) { next(error); }
};

exports.deleteRoom = async (req, res, next) => {
  try {
     const room = await HostelRoom.findById(req.params.id);
     if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
     if (room.allocatedStudents && room.allocatedStudents.length > 0) {
         return res.status(400).json({ success: false, message: 'Cannot delete room with allocated students' });
     }
     await room.deleteOne();
     res.status(200).json({ success: true, message: 'Room deleted' });
  } catch (error) { next(error); }
};

exports.allocateBed = async (req, res, next) => {
    try {
        const { roomId, studentId } = req.body;
        const room = await HostelRoom.findById(roomId);
        if(!room) return res.status(404).json({ success: false, message: 'Room not found' });
        
        if (room.allocatedStudents.length >= room.bedCapacity) {
            return res.status(400).json({ success: false, message: 'Room is full' });
        }
        
        if (!room.allocatedStudents.includes(studentId)) {
            room.allocatedStudents.push(studentId);
            await room.save();
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) { next(error); }
};

exports.deallocateBed = async (req, res, next) => {
    try {
        const { roomId, studentId } = req.body;
        const room = await HostelRoom.findById(roomId);
        if(!room) return res.status(404).json({ success: false, message: 'Room not found' });
        
        room.allocatedStudents = room.allocatedStudents.filter(id => id.toString() !== studentId.toString());
        await room.save();
        
        res.status(200).json({ success: true, message: 'Student deallocated', data: room });
    } catch (error) { next(error); }
};
