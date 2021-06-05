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
  deleteUserCoin,
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
router.post('/add',  async (req, res) => {
  const { coinSymbol, userId } = req.body;
  let alert = null;
  let coinHolder = await getCoinByName(coinSymbol)
  if (!coinHolder) {
    try {
      // if no - add coin 
      coinHolder = await addCoin(coinSymbol)
      console.log('new coin added to coins')
    } catch(error) {
      console.log('error adding coin:', error)
    }
  }
  // check if user has connection to coin 
  const userCoin = await getUserCoin(userId, coinHolder.id)
  if (!userCoin) {
    try {
      await addUserCoin(userId, coinHolder.id)
      console.log('coin added to user_coins')
    } catch(error) {
      console.log('error adding user_coin:', error)
    }
  } else {
    alert = `${coinSymbol} already on watchlist`
  }
  const userCoins = await getUserCoins(userId)
  console.log('sending response')
  return res.send({userCoins, alert})
})
  // if no - add coin 
  // check if user has connection to coin 
  // if no - add user_coin and send coins back
  // if yes - send error 
  
//   let coinHolder = null;
//   getCoinByName(coinSymbol).
//   then(coin => {
//     coinHolder = coin;
//     if (!coin) {
//       addCoin(coinSymbol)
//       .then(coinInfo => {
//         coinHolder = coinInfo;
//       })
//     }
//     getUserCoin(userId, coinHolder)
//     .then(coinConnect => {
//       if (!coinConnect) {
//         addUserCoin(userId, coinHolder.id)
//         .then(userCoin => {
//           getUserCoins(userId)
//           .then(coins => {
//             return res.status(200).json(coins)
//           })
//         })
//       } else {
//       return res.send('coin already on watchlist')
//       }
//     })
//   })
//   .catch(err => {
//     console.log(err)
//   })
// })

router.post('/delete', async (req, res) => {
  const { userId, coin } = req.body;
  try {
    const userCoin = await getCoinByName(coin)
    await deleteUserCoin(userId, userCoin.id);
    const userCoins = await getUserCoins(userId)
    return res.send(userCoins)
  } catch(error) {
    console.log(error)
  }
})

// GET COIN DATA
router.get('/show/:coin/:uuid/:candleLength', async (req, res) => {
  const { coin, candleLength, uuid } = req.params;
  try {
    const candles = await getCandles(coin, candleLength);
    const coinInfo = await getCoinInfo(uuid)
    
    return res.send({candles, coinInfo});
  } catch(error) {
    console.log(error.response.data)
  }
})

module.exports = router;