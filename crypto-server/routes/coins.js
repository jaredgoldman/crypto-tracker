const express = require('express');
const router = express.Router();
const axios = require('axios');

const { 
  formatCoins, 
  getCandles, 
  getCoinInfo
} = require('../helpers/api-helpers');

const { 
  getCoinByName, 
  addCoin, 
  addUserCoin, 
  getUserCoin, 
  getUserCoins 
} = require('../db/helpers/coinHelpers');

// GET TOP 100 COINS FROM COIN RANKING AND USER COINS 
router.get('/:id', (req, res) => {

  const { id } = req.params;
  const URL = `https://api.coinranking.com/v2/coins?limit=100`
  const config = {
    headers: {
      'x-access-token': process.env.CR_API
    }
  }

  axios.get(URL, config)
  .then(response => {
    // grab user coins from database 
    getUserCoins(id).then(userCoins => {
      const coins = formatCoins(response.data.data.coins);
      return res.status(200).json({userCoins, coins});
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// ADD USER COIN AND SEND ALL USER COINS BACK
router.post('/add', (req, res) => {
  const { coinSymbol, userId } = req.body;
  let coinHolder = null;

  // check if coin is in database 
  getCoinByName(coinSymbol).
  then(coin => {
    coinHolder = coin;
    // if no - add coin 
    if (!coin) {
      addCoin(coinSymbol)
      .then(coinInfo => {
        coinHolder = coinInfo;
      })
    }
    // check if user has connection to coin 
    getUserCoin(userId, coinHolder)
    .then(coinConnect => {
      // if no - add user_coin and send coins back
      if (!coinConnect) {
        addUserCoin(userId, coinHolder.id)
        .then(userCoin => {
          getUserCoins(userId)
          .then(coins => {
            return res.status(200).json(coins)
          })
        })
      } else {
        // if yes - send error 
      return res.send('coin already on watchlist')
      }
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// GET COIN DATA
router.get('/show/:coin/:uuid/:candleLength', async (req, res) => {
  const { coin, candleLength, uuid } = req.params;
  console.log(uuid)
  try {
    const candles = await getCandles(coin, candleLength);
    const coinInfo = await getCoinInfo(uuid)
    return res.send(candles);
  } catch(error) {
    console.log(error.response.data)
  }
})

module.exports = router;