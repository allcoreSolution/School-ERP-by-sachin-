const express = require('express');
const router = express.Router();
const { issueCertificate, getCertificates, updateCertificate, deleteCertificate } = require('../controllers/certificateController');

router.post('/issue', issueCertificate);
router.get('/', getCertificates);
router.put('/:id', updateCertificate);
router.delete('/:id', deleteCertificate);

module.exports = router;
