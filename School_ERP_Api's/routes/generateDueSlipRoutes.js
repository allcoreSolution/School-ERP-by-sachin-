const express = require('express');
const router = express.Router();
const { generateDueSlips } = require('../controllers/generateDueSlipController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.use(protect);

/**
 * @app_access Admin App (manage_finance)
 * @app_access Student App (None)
 * @app_access Teacher App (None)
 */
router.post('/', checkPermission('manage_finance'), generateDueSlips);

module.exports = router;
