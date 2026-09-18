const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

// Analytics Endpoint
router.get('/dashboard-analytics', superAdminController.getDashboardAnalytics);

// Team Endpoints
router.get('/team', superAdminController.getTeamMembers);
router.post('/team', superAdminController.addTeamMember);

// Comms Endpoints
router.get('/comms/rate-cards', superAdminController.getRateCards);
router.put('/comms/rate-cards', superAdminController.updateRateCards);

// Website Content
router.get('/website/templates', superAdminController.getWebsiteTemplates);

module.exports = router;
