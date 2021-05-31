const express = require('express');
const router = express.Router();
const axios = require('axios');

const { formatCoins } = require('../helpers/exchange-helpers');
const { getCoinByName, addCoin, addUserCoin, getUserCoin, getUserCoins } = require('../db/helpers/coinHelpers');

// GET TOP 100 COINS FROM COIN RANKING
router.get('/all', (req, res) => {

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
            console.log(coins)
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


module.exports = router;