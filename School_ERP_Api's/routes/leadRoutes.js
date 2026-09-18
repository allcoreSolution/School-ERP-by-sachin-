const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads);
router.put('/:id', updateLeadStatus);
router.delete('/:id', deleteLead);

module.exports = router;
