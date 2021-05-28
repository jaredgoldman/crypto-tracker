const getMockData = (exchange, coin) => {
  // get exchange data 
  const selectedExchange = mockData[exchange]
  // get selectedCoin data 
  const selectedCoin = mockData.selectedCoins[coin];
  return {...selectedExchange }
}

const mockData = {

  kraken: {
    
    balance: {
      USD: 179.3275,
      CAD: 2146.1453,
      BTC: 0.430334396,
      XRP: 0,
      LTC: 3.27868852,
      DOGE: 2200,
      XLM: 100,
      ETH: 2.22547244,
      BCH: 0,
      ADA: 1128.91763873,
      SC: 40000,
      ALGO: 150,
      DOT: 256.77018894,
      KSM: 1.934236,
      UNI: 15.67303869
    },
    timeframes: [
      { id: '1m', name: '1m' },
      { id: '5m', name: '5m' },
      { id: '15m', name: '15m' },
      { id: '30m', name: '30m' },
      { id: '1h', name: '1h' },
      { id: '4h', name: '4h' },
      { id: '1d', name: '1d' },
      { id: '1w', name: '1w' },
      { id: '2w', name: '2w' }
    ],
    coins: [
      {
        coinLogo: 'images/coin-logo/DOT.png',
        coinSymbol: 'DOT/USD',
        price: 39.2234,
        change: 4.78,
        changePercent: 11.49,
        volume:  860816.40563964
      },
      {
        coinLogo: 'images/coin-logo/KSM.png',
        coinSymbol:  'KSM/USD', 
        price: 588.4,
        change: 30.00,
        changePercent: 5.24,
        volume:  27131.51005139,
      },
      {
        coinLogo: 'images/coin-logo/SC.png',
        coinSymbol:  'SC/USD', 
        price:  0.02636, 
        change:  0.0011, 
        changePercent: 0.75,
        volume:  282042931.6698535,
      },
      {
        coinLogo: 'images/coin-logo/UNI.png',
        coinSymbol:  'UNI/USD',
        price:  34.668,
        change:  2.11,
        changePercent:  6.32,
        volume:  97139.19783492
      }
    ],
    trades: [
      {
        coinSymbol: 'USD/CAD',
        price: 1.26978,
        amount: 1418.26662886,
        cost: 1800.8865999938507,
        time: 1613149172015,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 28.98033,
        amount: 50,
        cost: 1449.0165,
        time: 1613152470963,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'ADA/USD',
        price: 0.926975,
        amount: 1128.91763873,
        cost: 1046.4784281617417,
        time: 1613155328703,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/USD',
        price: 46809.1,
        amount: 0.01671926,
        cost: 782.613513266,
        time: 1613226271318,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 1670.9554,
        cost: 999.999968684,
        time: 1613332085973,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 0.00005232,
        cost: 0.0000313114272,
        time: 1613332087026,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 20,
        amount: 52.04470707,
        cost: 1040.8941414,
        time: 1613352995749,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 2157.07503794,
        cost: 1170.7309060915557,
        time: 1613361922713,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 606.67924587,
        cost: 329.2690939034838,
        time: 1613361922955,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 29.1416,
        amount: 30.25665715,
        cost: 881.72740000244,
        time: 1613420213156,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62565,
        amount: 4434.70973614,
        cost: 2774.576146415991,
        time: 1613510368587,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 300,
        cost: 187.365,
        time: 1613510871887,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 2153.899531,
        cost: 1345.21795208605,
        time: 1613510872325,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 1969.99199424,
        cost: 1230.358500002592,
        time: 1613510875490,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 227.96,
        amount: 6.98031976,
        cost: 1591.2336924896,
        time: 1613632793491,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.01643275,
        cost: 1080.086862175,
        time: 1613658165554,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.1357101,
        cost: 8919.91273977,
        time: 1613658169546,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64511.11557,
        amount: 0.33923545,
        cost: 21884.457320390957,
        time: 1613700561605,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XLM/USD',
        price: 0.48,
        amount: 1351.35135135,
        cost: 648.648648648,
        time: 1613860686663,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.49,
        amount: 4423.89152524,
        cost: 2167.7068473676,
        time: 1613860728548,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 13.48556459,
        cost: 522.445606337649,
        time: 1613921887542,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.03497154,
        cost: 1.354835928294,
        time: 1613921887544,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.00009069,
        cost: 0.003513430359,
        time: 1613921887545,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 2.4e-7,
        cost: 0.000009297864,
        time: 1613921887547,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.68858896,
        cost: 26.676693758256,
        time: 1613921904179,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 99.12122526,
        cost: 3840.065299920186,
        time: 1613922148567,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 69415.3,
        amount: 0.01440604,
        cost: 999.999588412,
        time: 1613968486248,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65712.7,
        amount: 0.01521775,
        cost: 999.999440425,
        time: 1614000791997,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65120,
        amount: 0.23034398,
        cost: 14999.9999776,
        time: 1614002401603,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.892,
        cost: 1921.1004,
        time: 1614002794868,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 1.1138,
        cost: 2398.79106,
        time: 1614002802945,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.21967244,
        cost: 473.108534028,
        time: 1614002803357,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.00359821,
        cost: 233.10643664,
        time: 1614002969632,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.15045582,
        cost: 9747.12984288,
        time: 1614002978507,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.3203665,
        amount: 4103.07,
        cost: 1314.486175155,
        time: 1619803833032,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.22847,
        amount: 1308.45159144,
        cost: 1607.3935265362968,
        time: 1619803979452,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/BTC',
        price: 0.00001032,
        amount: 2000,
        cost: 0.02064,
        time: 1620171194755,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.55,
        amount: 1500,
        cost: 825,
        time: 1620223861519,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.4808526,
        amount: 1700,
        cost: 817.44942,
        time: 1620569577381,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 61181.6,
        amount: 0.01193169,
        cost: 729.999884904,
        time: 1621002800938,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.21101,
        amount: 3608.49886311,
        cost: 4369.928208214841,
        time: 1621046569611,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'ALGO/USD',
        price: 1.41747,
        amount: 150,
        cost: 212.6205,
        time: 1621105260964,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'SC/USD',
        price: 0.03018,
        amount: 40000,
        cost: 1207.2,
        time: 1621136077314,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.02418,
        cost: 1432.20558,
        time: 1621165224191,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.00114457,
        cost: 67.79402567,
        time: 1621165224926,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 37.5,
        amount: 15.67303869,
        cost: 587.738950875,
        time: 1621175778912,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 305,
        amount: 3.27868852,
        cost: 999.9999986,
        time: 1621178347742,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.20079,
        amount: 582.9398,
        cost: 699.988282442,
        time: 1621215466707,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 0.1043,
        cost: 53.9231,
        time: 1621215665750,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 1.829936,
        cost: 946.076912,
        time: 1621215674914,
        orderType: 'limit',
        side: 'buy'
      }
    ],
  },
  binance: {
    balance: {
      USD: 179.3275,
      CAD: 2146.1453,
      BTC: 0.430334396,
      XRP: 0,
      LTC: 3.27868852,
      DOGE: 2200,
      XLM: 1e-8,
      ETH: 2.22547244,
      BCH: 0,
      ADA: 1128.91763873,
      SC: 40000,
      ALGO: 150,
      DOT: 0,
      'DOT.S': 256.77018894,
      KSM: 1.934236,
      UNI: 15.67303869
    },
    timeframes: [
      { id: '1m', name: '1m' },
      { id: '5m', name: '5m' },
      { id: '15m', name: '15m' },
      { id: '30m', name: '30m' },
      { id: '1h', name: '1h' },
      { id: '4h', name: '4h' },
      { id: '1d', name: '1d' },
      { id: '1w', name: '1w' },
      { id: '2w', name: '2w' }
    ],
    coins: [
      {
        coinLogo: 'images/coin-logo/DOGE.png',
        coinSymbol: 'DOGE/USD',
        price:  0.4746492,
        change: -0.01335,
        changePercent: -2.72,
        volume:  137236887.2886881,
      },
      {
        coinLogo: 'images/coin-logo/ETH.png',
        coinSymbol: 'ETH/CAD',
        price:  4047.88,
        change:  -710.54,
        changePercent:  -20.94,
        volume:  991.69599645,
      }, 
      {
        coinLogo: 'images/coin-logo/LTC.png',
        coinSymbol: 'LTC/USD',
        price:  292.46,
        change: 3.25,
        changePercent: 1.12,
        volume:  122075.42303656
      },
      {
        coinLogo: 'images/coin-logo/BTC.png',
        coinSymbol: 'BTC/CAD',
        price:  51628.5,
        change:  -331.11,
        changePercent:  -0.77,
        volume:  108.05256622,
      },
      {
        coinLogo: 'images/coin-logo/BTC.png',
        coinSymbol: 'BTC/USD',
        price:  42735.7,
        change: -1644.19,
        changePercent: -3.71,
        volume:  8169.16403102
      }
    ],
    trades: [
      {
        coinSymbol: 'USD/CAD',
        price: 1.26978,
        amount: 1418.26662886,
        cost: 1800.8865999938507,
        time: 1613149172015,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 28.98033,
        amount: 50,
        cost: 1449.0165,
        time: 1613152470963,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'ADA/USD',
        price: 0.926975,
        amount: 1128.91763873,
        cost: 1046.4784281617417,
        time: 1613155328703,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/USD',
        price: 46809.1,
        amount: 0.01671926,
        cost: 782.613513266,
        time: 1613226271318,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 1670.9554,
        cost: 999.999968684,
        time: 1613332085973,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 0.00005232,
        cost: 0.0000313114272,
        time: 1613332087026,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 20,
        amount: 52.04470707,
        cost: 1040.8941414,
        time: 1613352995749,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 2157.07503794,
        cost: 1170.7309060915557,
        time: 1613361922713,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 606.67924587,
        cost: 329.2690939034838,
        time: 1613361922955,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 29.1416,
        amount: 30.25665715,
        cost: 881.72740000244,
        time: 1613420213156,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62565,
        amount: 4434.70973614,
        cost: 2774.576146415991,
        time: 1613510368587,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 300,
        cost: 187.365,
        time: 1613510871887,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 2153.899531,
        cost: 1345.21795208605,
        time: 1613510872325,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 1969.99199424,
        cost: 1230.358500002592,
        time: 1613510875490,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 227.96,
        amount: 6.98031976,
        cost: 1591.2336924896,
        time: 1613632793491,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.01643275,
        cost: 1080.086862175,
        time: 1613658165554,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.1357101,
        cost: 8919.91273977,
        time: 1613658169546,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64511.11557,
        amount: 0.33923545,
        cost: 21884.457320390957,
        time: 1613700561605,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XLM/USD',
        price: 0.48,
        amount: 1351.35135135,
        cost: 648.648648648,
        time: 1613860686663,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.49,
        amount: 4423.89152524,
        cost: 2167.7068473676,
        time: 1613860728548,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 13.48556459,
        cost: 522.445606337649,
        time: 1613921887542,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.03497154,
        cost: 1.354835928294,
        time: 1613921887544,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.00009069,
        cost: 0.003513430359,
        time: 1613921887545,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 2.4e-7,
        cost: 0.000009297864,
        time: 1613921887547,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.68858896,
        cost: 26.676693758256,
        time: 1613921904179,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 99.12122526,
        cost: 3840.065299920186,
        time: 1613922148567,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 69415.3,
        amount: 0.01440604,
        cost: 999.999588412,
        time: 1613968486248,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65712.7,
        amount: 0.01521775,
        cost: 999.999440425,
        time: 1614000791997,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65120,
        amount: 0.23034398,
        cost: 14999.9999776,
        time: 1614002401603,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.892,
        cost: 1921.1004,
        time: 1614002794868,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 1.1138,
        cost: 2398.79106,
        time: 1614002802945,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.21967244,
        cost: 473.108534028,
        time: 1614002803357,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.00359821,
        cost: 233.10643664,
        time: 1614002969632,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.15045582,
        cost: 9747.12984288,
        time: 1614002978507,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.3203665,
        amount: 4103.07,
        cost: 1314.486175155,
        time: 1619803833032,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.22847,
        amount: 1308.45159144,
        cost: 1607.3935265362968,
        time: 1619803979452,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/BTC',
        price: 0.00001032,
        amount: 2000,
        cost: 0.02064,
        time: 1620171194755,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.55,
        amount: 1500,
        cost: 825,
        time: 1620223861519,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.4808526,
        amount: 1700,
        cost: 817.44942,
        time: 1620569577381,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 61181.6,
        amount: 0.01193169,
        cost: 729.999884904,
        time: 1621002800938,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.21101,
        amount: 3608.49886311,
        cost: 4369.928208214841,
        time: 1621046569611,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'ALGO/USD',
        price: 1.41747,
        amount: 150,
        cost: 212.6205,
        time: 1621105260964,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'SC/USD',
        price: 0.03018,
        amount: 40000,
        cost: 1207.2,
        time: 1621136077314,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.02418,
        cost: 1432.20558,
        time: 1621165224191,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.00114457,
        cost: 67.79402567,
        time: 1621165224926,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 37.5,
        amount: 15.67303869,
        cost: 587.738950875,
        time: 1621175778912,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 305,
        amount: 3.27868852,
        cost: 999.9999986,
        time: 1621178347742,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.20079,
        amount: 582.9398,
        cost: 699.988282442,
        time: 1621215466707,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 0.1043,
        cost: 53.9231,
        time: 1621215665750,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 1.829936,
        cost: 946.076912,
        time: 1621215674914,
        orderType: 'limit',
        side: 'buy'
      }
    ],
  },
  aax: {
    balance: {
      USD: 179.3275,
      CAD: 2146.1453,
      BTC: 0.430334396,
      XRP: 0,
      LTC: 3.27868852,
      DOGE: 2200,
      XLM: 1e-8,
      ETH: 2.22547244,
      BCH: 0,
      ADA: 1128.91763873,
      SC: 40000,
      ALGO: 150,
      DOT: 0,
      'DOT.S': 256.77018894,
      KSM: 1.934236,
      UNI: 15.67303869
    },
    timeframes: [
      { id: '1m', name: '1m' },
      { id: '5m', name: '5m' },
      { id: '15m', name: '15m' },
      { id: '30m', name: '30m' },
      { id: '1h', name: '1h' },
      { id: '4h', name: '4h' },
      { id: '1d', name: '1d' },
      { id: '1w', name: '1w' },
      { id: '2w', name: '2w' }
    ],
    coins: [
      {
        coinLogo: 'images/coin-logo/DOGE.png',
        coinSymbol: 'DOGE/BTC',
        price:  0.0000111,
        change: 0.00000005,
        changePercent:  0.45,
        volume:  17844894.92259835
      },
      {
        coinLogo: 'images/coin-logo/XLM.png',
        coinSymbol: 'XLM/USD',
        price: 0.639477,
        change: 0.00071,
        changePercent: 0.11,
        volume:  16804445.88101703
      },
      {
        coinLogo: 'images/coin-logo/XRP.png',
        coinSymbol: 'XRP/USD',
        price:  1.55609,
        change:  0.1197,
        changePercent: +7.95,
        volume:  49040856.42974203
      },
      {
        coinLogo: 'images/coin-logo/USDT.png',
        coinSymbol: 'USD/CAD',
        price:  1.20698,
        change:  -0.006545,
        changePercent:  -0.5392,
        volume:  1740320.23424103
      }
    ],
    trades: [
      {
        coinSymbol: 'USD/CAD',
        price: 1.26978,
        amount: 1418.26662886,
        cost: 1800.8865999938507,
        time: 1613149172015,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 28.98033,
        amount: 50,
        cost: 1449.0165,
        time: 1613152470963,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'ADA/USD',
        price: 0.926975,
        amount: 1128.91763873,
        cost: 1046.4784281617417,
        time: 1613155328703,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/USD',
        price: 46809.1,
        amount: 0.01671926,
        cost: 782.613513266,
        time: 1613226271318,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 1670.9554,
        cost: 999.999968684,
        time: 1613332085973,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.59846,
        amount: 0.00005232,
        cost: 0.0000313114272,
        time: 1613332087026,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 20,
        amount: 52.04470707,
        cost: 1040.8941414,
        time: 1613352995749,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 2157.07503794,
        cost: 1170.7309060915557,
        time: 1613361922713,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.54274,
        amount: 606.67924587,
        cost: 329.2690939034838,
        time: 1613361922955,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 29.1416,
        amount: 30.25665715,
        cost: 881.72740000244,
        time: 1613420213156,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62565,
        amount: 4434.70973614,
        cost: 2774.576146415991,
        time: 1613510368587,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 300,
        cost: 187.365,
        time: 1613510871887,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 2153.899531,
        cost: 1345.21795208605,
        time: 1613510872325,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'XRP/CAD',
        price: 0.62455,
        amount: 1969.99199424,
        cost: 1230.358500002592,
        time: 1613510875490,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 227.96,
        amount: 6.98031976,
        cost: 1591.2336924896,
        time: 1613632793491,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.01643275,
        cost: 1080.086862175,
        time: 1613658165554,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65727.7,
        amount: 0.1357101,
        cost: 8919.91273977,
        time: 1613658169546,
        orderType: 'limit',
        side: 'sell'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64511.11557,
        amount: 0.33923545,
        cost: 21884.457320390957,
        time: 1613700561605,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'XLM/USD',
        price: 0.48,
        amount: 1351.35135135,
        cost: 648.648648648,
        time: 1613860686663,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'XRP/USD',
        price: 0.49,
        amount: 4423.89152524,
        cost: 2167.7068473676,
        time: 1613860728548,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 13.48556459,
        cost: 522.445606337649,
        time: 1613921887542,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.03497154,
        cost: 1.354835928294,
        time: 1613921887544,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.00009069,
        cost: 0.003513430359,
        time: 1613921887545,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 2.4e-7,
        cost: 0.000009297864,
        time: 1613921887547,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 0.68858896,
        cost: 26.676693758256,
        time: 1613921904179,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOT/USD',
        price: 38.7411,
        amount: 99.12122526,
        cost: 3840.065299920186,
        time: 1613922148567,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 69415.3,
        amount: 0.01440604,
        cost: 999.999588412,
        time: 1613968486248,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65712.7,
        amount: 0.01521775,
        cost: 999.999440425,
        time: 1614000791997,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 65120,
        amount: 0.23034398,
        cost: 14999.9999776,
        time: 1614002401603,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.892,
        cost: 1921.1004,
        time: 1614002794868,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 1.1138,
        cost: 2398.79106,
        time: 1614002802945,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'ETH/CAD',
        price: 2153.7,
        amount: 0.21967244,
        cost: 473.108534028,
        time: 1614002803357,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.00359821,
        cost: 233.10643664,
        time: 1614002969632,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 64784,
        amount: 0.15045582,
        cost: 9747.12984288,
        time: 1614002978507,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.3203665,
        amount: 4103.07,
        cost: 1314.486175155,
        time: 1619803833032,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.22847,
        amount: 1308.45159144,
        cost: 1607.3935265362968,
        time: 1619803979452,
        orderType: 'market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/BTC',
        price: 0.00001032,
        amount: 2000,
        cost: 0.02064,
        time: 1620171194755,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.55,
        amount: 1500,
        cost: 825,
        time: 1620223861519,
        orderType: 'stop market',
        side: 'sell'
      },
      {
        coinSymbol: 'DOGE/USD',
        price: 0.4808526,
        amount: 1700,
        cost: 817.44942,
        time: 1620569577381,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 61181.6,
        amount: 0.01193169,
        cost: 729.999884904,
        time: 1621002800938,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.21101,
        amount: 3608.49886311,
        cost: 4369.928208214841,
        time: 1621046569611,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'ALGO/USD',
        price: 1.41747,
        amount: 150,
        cost: 212.6205,
        time: 1621105260964,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'SC/USD',
        price: 0.03018,
        amount: 40000,
        cost: 1207.2,
        time: 1621136077314,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.02418,
        cost: 1432.20558,
        time: 1621165224191,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'BTC/CAD',
        price: 59231,
        amount: 0.00114457,
        cost: 67.79402567,
        time: 1621165224926,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'UNI/USD',
        price: 37.5,
        amount: 15.67303869,
        cost: 587.738950875,
        time: 1621175778912,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'LTC/USD',
        price: 305,
        amount: 3.27868852,
        cost: 999.9999986,
        time: 1621178347742,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'USD/CAD',
        price: 1.20079,
        amount: 582.9398,
        cost: 699.988282442,
        time: 1621215466707,
        orderType: 'market',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 0.1043,
        cost: 53.9231,
        time: 1621215665750,
        orderType: 'limit',
        side: 'buy'
      },
      {
        coinSymbol: 'KSM/USD',
        price: 517,
        amount: 1.829936,
        cost: 946.076912,
        time: 1621215674914,
        orderType: 'limit',
        side: 'buy'
      }
    ],
  },


  selectedCoins: {
    'USD/CAD': {
      symbol: 'USD/CAD',
      timestamp: 1621367710280,
      datetime: '2021-05-18T19:55:10.280Z',
      high: 1.2089,
      low: 1.182,
      bid: 1.20671,
      bidVolume: undefined,
      ask: 1.20699,
      askVolume: undefined,
      vwap: 1.20342,
      open: 1.20685,
      close: 1.20699,
      last: 1.20699,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 1576537.15850475,
      quoteVolume: 1897236.3472877862,
      info: {
        a: [ '1.20699', '8', '8.000' ],
        b: [ '1.20671', '724', '724.000' ],
        c: [ '1.20699', '331.73133165' ],
        v: [ '1049304.22166837', '1576537.15850475' ],
        p: [ '1.20282', '1.20342' ],
        t: [ 2257, 2901 ],
        l: [ '1.19463', '1.18200' ],
        h: [ '1.20700', '1.20890' ],
        o: '1.20685'
      }
    },
    'DOT/USD': {
      symbol: 'DOT/USD',
      timestamp: 1621367801477,
      datetime: '2021-05-18T19:56:41.477Z',
      high: 41.6345,
      low: 37.621,
      bid: 39.84,
      bidVolume: undefined,
      ask: 39.8401,
      askVolume: undefined,
      vwap: 39.63318,
      open: 38.6984,
      close: 39.84,
      last: 39.84,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 866567.08646964,
      quoteVolume: 34344809.32012681,
      info: {
        a: [ '39.84010', '292', '292.000' ],
        b: [ '39.84000', '750', '750.000' ],
        c: [ '39.84000', '0.73000000' ],
        v: [ '724408.70797153', '866567.08646964' ],
        p: [ '39.72854', '39.63318' ],
        t: [ 12905, 15765 ],
        l: [ '37.76000', '37.62100' ],
        h: [ '41.63450', '41.63450' ],
        o: '38.69840'
      }
    },
    'BTC/USD':{
      symbol: 'BTC/USD',
      timestamp: 1621367867957,
      datetime: '2021-05-18T19:57:47.957Z',
      high: 45823.4,
      low: 42392,
      bid: 43280.8,
      bidVolume: undefined,
      ask: 43286.7,
      askVolume: undefined,
      vwap: 43949.01032,
      open: 43551.9,
      close: 43281,
      last: 43281,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 8186.9043115,
      quoteVolume: 359806342.074966,
      info: {
        a: [ '43286.70000', '2', '2.000' ],
        b: [ '43280.80000', '1', '1.000' ],
        c: [ '43281.00000', '0.03010000' ],
        v: [ '6394.11483457', '8186.90431150' ],
        p: [ '43987.19676', '43949.01032' ],
        t: [ 58723, 74120 ],
        l: [ '42392.00000', '42392.00000' ],
        h: [ '45823.40000', '45823.40000' ],
        o: '43551.90000'
      }
    },
    'KSM/USD':{
      symbol: 'KSM/USD',
      timestamp: 1621367899530,
      datetime: '2021-05-18T19:58:19.530Z',
      high: 625.01,
      low: 553.39,
      bid: 599.58,
      bidVolume: undefined,
      ask: 600.64,
      askVolume: undefined,
      vwap: 590.10298,
      open: 574.92,
      close: 599.72,
      last: 599.72,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 26122.34372756,
      quoteVolume: 15414872.878217464,
      info: {
        a: [ '600.64000', '1', '1.000' ],
        b: [ '599.58000', '2', '2.000' ],
        c: [ '599.72000', '0.36057143' ],
        v: [ '22553.32166526', '26122.34372756' ],
        p: [ '592.59092', '590.10298' ],
        t: [ 6399, 7737 ],
        l: [ '556.79000', '553.39000' ],
        h: [ '625.01000', '625.01000' ],
        o: '574.92000'
      }
    },
    'XRP/USD':{
      symbol: 'XRP/USD',
      timestamp: 1621368046001,
      datetime: '2021-05-18T20:00:46.001Z',
      high: 1.70425,
      low: 1.456,
      bid: 1.58106,
      bidVolume: undefined,
      ask: 1.58168,
      askVolume: undefined,
      vwap: 1.58586198,
      open: 1.49577,
      close: 1.58106,
      last: 1.58106,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 47936339.89774987,
      quoteVolume: 76020418.9041986,
      info: {
        a: [ '1.58168000', '3163', '3163.000' ],
        b: [ '1.58106000', '3500', '3500.000' ],
        c: [ '1.58106000', '500.00000000' ],
        v: [ '44516225.85165769', '47936339.89774987' ],
        p: [ '1.59330345', '1.58586198' ],
        t: [ 22466, 25040 ],
        l: [ '1.47331000', '1.45600000' ],
        h: [ '1.70425000', '1.70425000' ],
        o: '1.49577000'
      }
    },
    'UNI/USD':{
      symbol: 'UNI/USD',
      timestamp: 1621368075553,
      datetime: '2021-05-18T20e:01:15.553Z',
      high: 36.655,
      low: 32.644,
      bid: 35.058,
      bidVolume: undefined,
      ask: 35.06,
      askVolume: undefined,
      vwap: 34.82606,
      open: 33.367,
      close: 35.048,
      last: 35.048,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 97121.6110897,
      quoteVolume: 3382363.0551065574,
      info: {
        a: [ '35.06000', '2', '2.000' ],
        b: [ '35.05800', '10', '10.000' ],
        c: [ '35.04800', '0.00000015' ],
        v: [ '79738.21897193', '97121.61108970' ],
        p: [ '35.08350', '34.82606' ],
        t: [ 3068, 3626 ],
        l: [ '33.07500', '32.64400' ],
        h: [ '36.65500', '36.65500' ],
        o: '33.36700'
      }
    },
    'LTC/USD':{
      symbol: 'LTC/USD',
      timestamp: 1621368123704,
      datetime: '2021-05-18T20:02:03.704Z',
      high: 318.17,
      low: 273.49,
      bid: 294.04,
      bidVolume: undefined,
      ask: 294.11,
      askVolume: undefined,
      vwap: 298.97163,
      open: 281.76,
      close: 294.18,
      last: 294.18,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 119558.3747781,
      quoteVolume: 35744562.18755945,
      info: {
        a: [ '294.11000', '20', '20.000' ],
        b: [ '294.04000', '3', '3.000' ],
        c: [ '294.18000', '0.12650000' ],
        v: [ '93125.42885789', '119558.37477810' ],
        p: [ '302.98868', '298.97163' ],
        t: [ 13439, 16655 ],
        l: [ '278.34000', '273.49000' ],
        h: [ '318.17000', '318.17000' ],
        o: '281.76000'
      }
    },
    'BTC/CAD':{
      symbol: 'BTC/CAD',
      timestamp: 1621368169284,
      datetime: '2021-05-18T20:02:49.284Z',
      high: 55248.9,
      low: 51182.3,
      bid: 52147.3,
      bidVolume: undefined,
      ask: 52288.4,
      askVolume: undefined,
      vwap: 53171.96669,
      open: 52711.6,
      close: 52191.3,
      last: 52191.3,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 91.46788723,
      quoteVolume: 4863527.452998237,
      info: {
        a: [ '52288.40000', '1', '1.000' ],
        b: [ '52147.30000', '1', '1.000' ],
        c: [ '52191.30000', '0.03700261' ],
        v: [ '72.71334709', '91.46788723' ],
        p: [ '53155.56826', '53171.96669' ],
        t: [ 1655, 2016 ],
        l: [ '51182.30000', '51182.30000' ],
        h: [ '55248.90000', '55248.90000' ],
        o: '52711.60000'
      }
    },
    'DOGE/USD':{
      symbol: 'DOGE/USD',
      timestamp: 1621368203302,
      datetime: '2021-05-18T20:03:23.302Z',
      high: 0.5148367,
      low: 0.465,
      bid: 0.4784149,
      bidVolume: undefined,
      ask: 0.478415,
      askVolume: undefined,
      vwap: 0.487740921,
      open: 0.4879501,
      close: 0.478415,
      last: 0.478415,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 135084081.4176285,
      quoteVolume: 65886034.283073105,
      info: {
        a: [ '0.478415000', '36904', '36904.000' ],
        b: [ '0.478414900', '11409', '11409.000' ],
        c: [ '0.478415000', '109.00000000' ],
        v: [ '115328206.37311069', '135084081.41762849' ],
        p: [ '0.487283465', '0.487740921' ],
        t: [ 18844, 23218 ],
        l: [ '0.465000000', '0.465000000' ],
        h: [ '0.514836700', '0.514836700' ],
        o: '0.487950100'
      }
    },
    'XLM/USD':{
      symbol: 'XLM/USD',
      timestamp: 1621368232469,
      datetime: '2021-05-18T20:03:52.469Z',
      high: 0.7,
      low: 0.627634,
      bid: 0.650011,
      bidVolume: undefined,
      ask: 0.650221,
      askVolume: undefined,
      vwap: 0.65865981,
      open: 0.643611,
      close: 0.650001,
      last: 0.650001,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 15674358.41876461,
      quoteVolume: 10324069.937975397,
      info: {
        a: [ '0.65022100', '7084', '7084.000' ],
        b: [ '0.65001100', '1500', '1500.000' ],
        c: [ '0.65000100', '757.86166000' ],
        v: [ '11761246.17937789', '15674358.41876461' ],
        p: [ '0.66034488', '0.65865981' ],
        t: [ 8670, 11037 ],
        l: [ '0.63274900', '0.62763400' ],
        h: [ '0.70000000', '0.70000000' ],
        o: '0.64361100'
      }
    },
    'ETH/CAD':{
      symbol: 'ETH/CAD',
      timestamp: 1621368270830,
      datetime: '2021-05-18T20:04:30.830Z',
      high: 4299.02,
      low: 3858.16,
      bid: 4115.28,
      bidVolume: undefined,
      ask: 4120.5,
      askVolume: undefined,
      vwap: 4072.89126,
      open: 3946.6,
      close: 4120.5,
      last: 4120.5,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 910.18443673,
      quoteVolume: 3707082.23734564,
      info: {
        a: [ '4120.50000', '7', '7.000' ],
        b: [ '4115.28000', '2', '2.000' ],
        c: [ '4120.50000', '0.10151044' ],
        v: [ '690.04167232', '910.18443673' ],
        p: [ '4087.45926', '4072.89126' ],
        t: [ 1446, 1857 ],
        l: [ '3928.51000', '3858.16000' ],
        h: [ '4299.02000', '4299.02000' ],
        o: '3946.60000'
      }
    },
    'DOGE/BTC':{
      symbol: 'DOGE/BTC',
      timestamp: 1621368298033,
      datetime: '2021-05-18T20:04:58.033Z',
      high: 0.00001128,
      low: 0.00001085,
      bid: 0.00001106,
      bidVolume: undefined,
      ask: 0.00001107,
      askVolume: undefined,
      vwap: 0.000011042,
      open: 0.00001117,
      close: 0.00001105,
      last: 0.00001105,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 17935542.41918022,
      quoteVolume: 198.044259392588,
      info: {
        a: [ '0.000011070', '257776', '257776.000' ],
        b: [ '0.000011060', '105', '105.000' ],
        c: [ '0.000011050', '2928.00000000' ],
        v: [ '15153599.71401575', '17935542.41918022' ],
        p: [ '0.000011020', '0.000011042' ],
        t: [ 3547, 4114 ],
        l: [ '0.000010850', '0.000010850' ],
        h: [ '0.000011280', '0.000011280' ],
        o: '0.000011170'
      }
    },
    'SC/USD':{
      symbol: 'SC/USD',
      timestamp: 1621368330085,
      datetime: '2021-05-18T20:05:30.085Z',
      high: 0.02872,
      low: 0.02551,
      bid: 0.02665,
      bidVolume: undefined,
      ask: 0.02667,
      askVolume: undefined,
      vwap: 0.026937,
      open: 0.02609,
      close: 0.02668,
      last: 0.02668,
      previousClose: undefined,
      change: undefined,
      percentage: undefined,
      average: undefined,
      baseVolume: 274361247.26615864,
      quoteVolume: 7390468.917608515,
      info: {
        a: [ '0.026670', '40000', '40000.000' ],
        b: [ '0.026650', '57000', '57000.000' ],
        c: [ '0.026680', '2958.52623720' ],
        v: [ '224521501.66485101', '274361247.26615865' ],
        p: [ '0.027035', '0.026937' ],
        t: [ 7562, 9797 ],
        l: [ '0.025720', '0.025510' ],
        h: [ '0.028720', '0.028720' ],
        o: '0.026090'
      }
    }
  }
}

module.exports = { getMockData }