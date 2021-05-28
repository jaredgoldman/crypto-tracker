# CRYPTO-TRACKER 2 

## Details

- improvement on first iteration 
- allow user to search and select multiple coins
- User can then select each coin and then see dashboard with coin stats 
- User can connect exchange via CCXT (or other library) see personal coin stats 

## Development Stages

1. Plan app
  - user stories 
  - API strategy 
  - features
  - ERD and dB approach
  - App flow 
  - Exchange connection
  - Pages 
  - Routes
  - Chart 
  - Wireframes

2. Find decent api
  - Coinranking looks good 
  - Crypto compare is also an option 
  - look into pagination issue 

3. Build front and backend 
  - Start with just being able to search and add coins to watchlist 
  - Move on to generating a dashboard page for each coin 

4. Style front-end

## Planning 

### User Stories 

- As a user I want to be able to register an account so I can save my exchange data and see how my coin stats change over time 
- As a user I want to be able to select certain coins to keep on my profile and/or watchlist so I can monitor them 
- As a user I want to be able to see general stats regarding coins on my watchlist 
- As a user I want to be able to see my balance, profit and loss and my entries and exits
- As a user I want to be able to see a candlestick chart for all coins on my watchlist 
- As a user I want to be able to see all coins/markets through a certain currency 

### API 

- use Coinranking to generate initial cointable and single coin information 
- use CCXT to get user exchange information 
- may be issue with pagination 
- use cryptoCompare or CCXT for OCLH data 

## Features 

- Login/Register
- Watchlist 
- Coin show 
  - Chart
  - 24hr volume
  - 24hr change
  - 24hr change in percent
  - User transaction info
    - list of all transactions
    - Average net cost 
    - Profit and loss 
    - Net Cost
  - Social feeds 

### ERD and dB

#### Tables

- users 
- user_coins
  - many-to-many
- accounts
  - connection from users to exchanges
- exchanges
  - many-to-many
- transactions 

#### Challenges 

- what order should I seed the tables in?
- how do we add coins to db?
  - when user adds a coin to their watchlist, we add the coin to our coins table IF the coin is not already there

### App Flow 

- User logs in -> user sees watchlist with selected coins -> user clicks on coin and sees coin show 
- User can go back to watch list
- User can access settings to change currency of choice 

### Exchange Connection 

- CCXT to get user trades

### Pages

- Landing page 
- Login
- Register 
- Watch list
- Show Coin 
- Settings 

### Routes

#### React Router

- /
- /login
- /logout
- /register
- /watchlist
- /coin:/show
- /settings

#### API routes

- /api/login
- /api/register
- /api/:coin/new
- /api/:coin
- /api/:exchange/new
- probably more needed here

### Chart 

- use Apex charts to start 
- upgrade to TradingView or D3 once MVP is complete 

### Stretch features

- use cryptocompare and socket.io to generate live price/chart info\
- social media feeds 
- smart chain support 
- user can see entries and exits on chart 

### Wireframes

- Can use wireframes from crypto tracker 1 for MVP 

### Things I don't know how to do yet 

- Search bar that predicts and offers options 

### General goals for this project

- use more higher-order functions when possible
- 