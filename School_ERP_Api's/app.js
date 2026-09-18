const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const feeTypeRoutes = require('./routes/feeTypeRoutes');
const feeGroupRoutes = require('./routes/feeGroupRoutes');
const feeDiscountRoutes = require('./routes/feeDiscountRoutes');
const assignFeeRoutes = require('./routes/assignFeeRoutes');
const feeCollectionRoutes = require('./routes/feeCollectionRoutes');
const feeChallanRoutes = require('./routes/feeChallanRoutes');
const feesDashboardRoutes = require('./routes/feesDashboardRoutes');
const searchDueFeesRoutes = require('./routes/searchDueFeesRoutes');
const allTransactionsRoutes = require('./routes/allTransactionsRoutes');
const onlineTransactionsRoutes = require('./routes/onlineTransactionsRoutes');
const feesCarryForwardRoutes = require('./routes/feesCarryForwardRoutes');
const generateDueSlipRoutes = require('./routes/generateDueSlipRoutes');
const dueSlipHistoryRoutes = require('./routes/dueSlipHistoryRoutes');
const feeDataAuditRoutes = require('./routes/feeDataAuditRoutes');
const financeReportRoutes = require('./routes/financeReportRoutes');
const academicsRoutes = require('./routes/academicsRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const transportRoutes = require('./routes/transportRoutes');
const examRoutes = require('./routes/examRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const frontOfficeRoutes = require('./routes/frontOfficeRoutes');
const liveClassRoutes = require('./routes/liveClassRoutes');
const assetRoutes = require('./routes/assetRoutes');
const eventRoutes = require('./routes/eventRoutes');
const lessonPlanRoutes = require('./routes/lessonPlanRoutes');
const studyMaterialRoutes = require('./routes/studyMaterialRoutes');
const onlineExamRoutes = require('./routes/onlineExamRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const chatRoutes = require('./routes/chatRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const leadRoutes = require('./routes/leadRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const ptmRoutes = require('./routes/ptmRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const branchRoutes = require('./routes/branchRoutes');
const locationRoutes = require('./routes/locationRoutes');
const healthRoutes = require('./routes/healthRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const aiRoutes = require('./routes/aiRoutes');
const coachingRoutes = require('./routes/coachingRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const planRoutes = require('./routes/planRoutes');
const globalSettingRoutes = require('./routes/globalSettingRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');

const app = express();


// Standard middlewares
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (photos and documents)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes mapping
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/fee-types', feeTypeRoutes);
app.use('/api/fee-groups', feeGroupRoutes);
app.use('/api/fee-discounts', feeDiscountRoutes); // Backward compatibility
app.use('/api/fees-discount', feeDiscountRoutes); // Menu Exact Match
app.use('/api/assign-fees', assignFeeRoutes);
app.use('/api/collect-fees', feeCollectionRoutes);
app.use('/api/fee-challans', feeChallanRoutes);
app.use('/api/fees-dashboard', feesDashboardRoutes);
app.use('/api/search-due-fees', searchDueFeesRoutes);
app.use('/api/all-transactions', allTransactionsRoutes);
app.use('/api/online-transactions', onlineTransactionsRoutes);
app.use('/api/fees-carry-forward', feesCarryForwardRoutes);
app.use('/api/generate-due-slip', generateDueSlipRoutes);
app.use('/api/due-slip-history', dueSlipHistoryRoutes);
app.use('/api/fee-data-audit', feeDataAuditRoutes);
app.use('/api/finance-reports', financeReportRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/front-office', frontOfficeRoutes);
app.use('/api/live-classes', liveClassRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/lesson-plans', lessonPlanRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use('/api/online-exams', onlineExamRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/hardware', hardwareRoutes);
app.use('/api/ptm', ptmRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/health-records', healthRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/ai-assistant', aiRoutes);
app.use('/api/coaching', coachingRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/settings', globalSettingRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/webhooks', webhookRoutes);

// Base Status Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'School ERP Student Admission API is running...',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Catch Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File upload size exceeds the 5MB limit!'
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
