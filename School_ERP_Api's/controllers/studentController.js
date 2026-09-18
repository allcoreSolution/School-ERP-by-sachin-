const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

// Helper to delete file from disk
const deleteFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  // Resolve path
  const absolutePath = path.join(__dirname, '..', relativePath);
  fs.unlink(absolutePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Failed to delete file: ${absolutePath}`, err);
    }
  });
};

// Helper to check if a key is a standard field of Student schema
const standardFields = [
  'aparId', 'firstName', 'middleName', 'lastName', 'gender', 'dateOfBirth',
  'category', 'house', 'religion', 'aadhaar', 'caste', 'subCaste',
  'placeOfBirth', 'nationality', 'bpl', 'rte', 'studentPhone', 'studentEmail',
  'studentPhoto', 'documents', 'height', 'weight', 'medicalHistory',
  'classId', 'sectionId', 'parentId'
];

// @desc    Register a new student admission
// @route   POST /api/students
// @access  Private (requires create_students permission)
const createStudent = async (req, res) => {
  try {
    const studentData = { ...req.body };

    // Check if APAR ID already exists
    if (!studentData.aparId) {
      return res.status(400).json({ success: false, message: 'APAR ID is required' });
    }

    const exists = await Student.findOne({ aparId: studentData.aparId });
    if (exists) {
      // Clean up uploaded files since registration failed
      if (req.files) {
        if (req.files['studentPhoto']) deleteFileFromDisk(`uploads/photos/${req.files['studentPhoto'][0].filename}`);
        if (req.files['documentFiles']) {
          req.files['documentFiles'].forEach(f => deleteFileFromDisk(`uploads/documents/${f.filename}`));
        }
      }
      return res.status(400).json({ success: false, message: `Student with APAR ID ${studentData.aparId} already exists` });
    }

    // Handle student photo
    if (req.files && req.files['studentPhoto']) {
      studentData.studentPhoto = `uploads/photos/${req.files['studentPhoto'][0].filename}`;
    }

    // Handle document files upload
    studentData.documents = [];
    if (req.files && req.files['documentFiles']) {
      const files = req.files['documentFiles'];
      
      // Parse documentNames array sent from frontend (usually as JSON or separate text fields)
      let docNames = [];
      if (req.body.documentNames) {
        try {
          docNames = typeof req.body.documentNames === 'string'
            ? JSON.parse(req.body.documentNames)
            : req.body.documentNames;
        } catch (e) {
          // If not valid JSON, treat it as comma separated list or single string
          docNames = typeof req.body.documentNames === 'string' 
            ? req.body.documentNames.split(',') 
            : [req.body.documentNames];
        }
      }

      files.forEach((file, index) => {
        const docName = (docNames && docNames[index]) 
          ? docNames[index].trim() 
          : file.originalname.split('.')[0]; // Fallback to original file name
        
        studentData.documents.push({
          documentName: docName,
          fileUrl: `uploads/documents/${file.filename}`
        });
      });
    }

    // Parse dynamic fields/extra fields
    const extraFields = {};
    Object.keys(studentData).forEach(key => {
      if (!standardFields.includes(key) && key !== 'documentNames') {
        extraFields[key] = studentData[key];
        delete studentData[key]; // Remove from main level so it doesn't cause schema warnings
      }
    });

    studentData.extraFields = extraFields;

    // Save student
    const student = await Student.create(studentData);

    return res.status(201).json({
      success: true,
      message: 'Student admitted successfully',
      data: student
    });
  } catch (error) {
    console.error(error);
    // Cleanup files on error
    if (req.files) {
      if (req.files['studentPhoto']) deleteFileFromDisk(`uploads/photos/${req.files['studentPhoto'][0].filename}`);
      if (req.files['documentFiles']) {
        req.files['documentFiles'].forEach(f => deleteFileFromDisk(`uploads/documents/${f.filename}`));
      }
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all students (with filters, pagination, search)
// @route   GET /api/students
// @access  Private (requires view_students permission)
const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, gender, category, house, religion } = req.query;

    const query = {};

    // Search filter (searches by APAR ID, First Name, Last Name)
    if (search) {
      query.$or = [
        { aparId: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }

    // Other filters
    if (gender && gender !== 'Select') query.gender = gender;
    if (category && category !== 'Select') query.category = category;
    if (house && house !== 'Select') query.house = house;
    if (religion && religion !== 'Select') query.religion = religion;

    // Calculate options
    const skipIndex = (page - 1) * limit;
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('classId', 'className')
      .populate('sectionId', 'sectionName')
      .populate('parentId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skipIndex);

    return res.json({
      success: true,
      count: students.length,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      },
      data: students
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single student details
// @route   GET /api/students/:id
// @access  Private (requires view_students permission)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('classId', 'className')
      .populate('sectionId', 'sectionName')
      .populate('parentId', 'firstName lastName email');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a student's admission record
// @route   PUT /api/students/:id
// @access  Private (requires update_students permission)
const updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const studentData = { ...req.body };

    // Prevent changing APAR ID to an existing APAR ID
    if (studentData.aparId && studentData.aparId !== student.aparId) {
      const exists = await Student.findOne({ aparId: studentData.aparId });
      if (exists) {
        return res.status(400).json({ success: false, message: 'APAR ID is already in use by another student' });
      }
    }

    // Handle student photo updates
    if (req.files && req.files['studentPhoto']) {
      // Delete old photo if it exists
      if (student.studentPhoto) {
        deleteFileFromDisk(student.studentPhoto);
      }
      studentData.studentPhoto = `uploads/photos/${req.files['studentPhoto'][0].filename}`;
    }

    // Handle new documents uploads
    if (req.files && req.files['documentFiles']) {
      const files = req.files['documentFiles'];
      
      let docNames = [];
      if (req.body.documentNames) {
        try {
          docNames = typeof req.body.documentNames === 'string'
            ? JSON.parse(req.body.documentNames)
            : req.body.documentNames;
        } catch (e) {
          docNames = typeof req.body.documentNames === 'string'
            ? req.body.documentNames.split(',')
            : [req.body.documentNames];
        }
      }

      const newDocs = files.map((file, index) => {
        const docName = (docNames && docNames[index])
          ? docNames[index].trim()
          : file.originalname.split('.')[0];
        
        return {
          documentName: docName,
          fileUrl: `uploads/documents/${file.filename}`
        };
      });

      // Append new documents to existing documents
      studentData.documents = [...(student.documents || []), ...newDocs];
    }

    // Parse dynamic fields/extra fields
    const extraFields = student.extraFields ? Object.fromEntries(student.extraFields) : {};
    Object.keys(studentData).forEach(key => {
      if (!standardFields.includes(key) && key !== 'documentNames') {
        extraFields[key] = studentData[key];
        delete studentData[key];
      }
    });

    studentData.extraFields = extraFields;

    // Perform database update
    student = await Student.findByIdAndUpdate(req.params.id, studentData, {
      new: true,
      runValidators: true
    });

    return res.json({
      success: true,
      message: 'Student record updated successfully',
      data: student
    });
  } catch (error) {
    console.error(error);
    // Cleanup any newly uploaded files on error
    if (req.files) {
      if (req.files['studentPhoto']) deleteFileFromDisk(`uploads/photos/${req.files['studentPhoto'][0].filename}`);
      if (req.files['documentFiles']) {
        req.files['documentFiles'].forEach(f => deleteFileFromDisk(`uploads/documents/${f.filename}`));
      }
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a student admission record (and clean files)
// @route   DELETE /api/students/:id
// @access  Private (requires delete_students permission)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Delete photo from disk
    if (student.studentPhoto) {
      deleteFileFromDisk(student.studentPhoto);
    }

    // Delete documents from disk
    if (student.documents && student.documents.length > 0) {
      student.documents.forEach(doc => {
        deleteFileFromDisk(doc.fileUrl);
      });
    }

    // Delete from DB
    await student.deleteOne();

    return res.json({
      success: true,
      message: 'Student record and associated files deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
