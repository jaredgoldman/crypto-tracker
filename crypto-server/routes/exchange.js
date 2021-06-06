const express = require('express');
const router = express.Router();
const ccxt = require('ccxt')

router.get("/", (req, res) => {
  res.send(ccxt.exchanges)
})

module.exports = router;