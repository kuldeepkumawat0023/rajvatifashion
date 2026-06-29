const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
} = require('../controllers/addressController');

router.use(protect);

router.post('/add', addAddress);
router.get('/all', getAddresses);
router.put('/update/:id', updateAddress);
router.delete('/delete/:id', deleteAddress);

module.exports = router;
