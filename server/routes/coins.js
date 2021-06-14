const express = require('express');
const router = express.Router();
const axios = require('axios');

const { 
  formatCoins, 
  getCoinInfo,
  getUserStats
} = require('../helpers/api-helpers');

const { 
  getCoinByName, 
  addCoin,
  deleteUserCoin,
  addUserCoin, 
  getUserCoin, 
  getUserCoins,
  getUserTransactionsByCoin
} = require('../db/queries/coin-queries');

const { formatDbTrades } = require('../helpers/exchange-helpers')



// get top 100 coins from coin ranking and user coins 
router.get('/:id', async (req, res) => {

  const { id } = req.params;
  const URL = `https://api.coinranking.com/v2/coins?limit=100`
  const config = { headers: { 'x-access-token': process.env.CR_API } }
  let coins = null;
  let userCoins = null;
  
  try {
    const res = await axios.get(URL, config)
    coins = formatCoins(res.data.data.coins);
    userCoins = await getUserCoins(id)
  } catch(error) {
    return res.send 
  }
 
  return res.status(200).json({userCoins, coins});
})

// ADD USER COIN AND SEND ALL USER COINS BACK
router.post('/add',  async (req, res) => {
  const { coinSymbol, userId } = req.body;
  let alert = null;
  // check if coin is in db, if not add coin
  let coinHolder = await getCoinByName(coinSymbol)
  if (!coinHolder) {
    try {
      coinHolder = await addCoin(coinSymbol)
    } catch(error) {
      alert = `error adding coin`
    }
  }
  // check if user has connection to coin 
  const userCoin = await getUserCoin(userId, coinHolder.id)
  if (!userCoin) {
    try {
      await addUserCoin(userId, coinHolder.id)
    } catch(error) {
      alert = `error adding coin to user database`
    }
  } else {
    alert = `${coinSymbol} already on watchlist`
  }
  // send all user coins and alert if alert
  const userCoins = await getUserCoins(userId)
  return res.send({userCoins, alert})
})

// delete user coin and send all user coins back
router.post('/delete', async (req, res) => {
  let alert = null;
  const { userId, coin } = req.body;
  try {
    const userCoin = await getCoinByName(coin)
    await deleteUserCoin(userId, userCoin.id);
  } catch(error) {
    alert = 'error deleting coin'
  }
  const userCoins = await getUserCoins(userId)
  return res.send({userCoins, alert})
})

// get data for coins show page
router.get('/show/:userId/:coin/:uuid/:candleLength/:currency/:currencyUuid', async (req, res) => {
  const { userId, coin, candleLength, uuid, currency, currencyUuid } = req.params;

  let coinInfo = null;
  let userCoinTrades = null;
  let userCoinStats = null;

  try {
    coinInfo = await getCoinInfo(coin, uuid, candleLength, currency, currencyUuid);
  } catch(error) {
    console.log(error)
    console.log('error getting coin info')
  }

  try {
    dbTrades = await getUserTransactionsByCoin(userId, coin);
    userCoinTrades = formatDbTrades(dbTrades)
  } catch(error) {
    console.log(error)
    console.log('error getting user trades')
  }

  try {
    // depending on currencyticker, calculate profit and loss, average price 
    userCoinStats = await getUserStats(userCoinTrades, currency, coinInfo);
  } catch(error) {
    console.log(error)
    console.log('error getting coin stats')
  }

  return res.send({coinInfo, userCoinTrades, userCoinStats});
})

module.exports = router;