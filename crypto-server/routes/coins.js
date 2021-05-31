const express = require('express');
const router = express.Router();
const axios = require('axios');

const { formatCoins } = require('../helpers/exchange-helpers');

router.get('/coins', (req, res) => {

  const config = {
    headers: {
      'x-access-token': process.env.CR_API
    }
  }

  axios.get('https://api.coinranking.com/v2/coins?limit=100', config)
  .then(response => {
    const coins = formatCoins(response.data.data.coins);
    return res.status(200).json(coins);
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;