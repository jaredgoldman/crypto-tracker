## Crypto-Tracker 

Crypto tracker is a cryptocurrency portfolio-tracker that allows users to view their favourite coins performance on an ongoing basis. Users can also enter their exchange-API credentials and view important performance-related stats. This includes balance, profit and loss, trades, and other metrics for 100s of cryptocurrencies across many major exchanges. This project is an expiriment in utilizing API data from several sources and manipulating and displaying data using client-side logic. The tracker is built with React.js, CCXT trading library, ApexCharts and Sass. Our backend server uses a Express.js and PostgreSQL via Node. Crypto-Tracker is currently under development but suggestions and pull-requests are extremely welcome.

## Views

!["landing page"](https://github.com/jaredgoldman/crypto-tracker/blob/main/docs/welcome.png)
!["watchlist"](https://github.com/jaredgoldman/crypto-tracker/blob/main/docs/watchlist.png)
!["coin dashboard"](https://github.com/jaredgoldman/crypto-tracker/blob/main/docs/coin-show.png)

## Dependencies (tracker)

- testing-library/jest-dom: ^5.12.0,
- testing-library/react: ^11.2.7,
- testing-library/user-event: ^12.8.3,
- apexcharts: ^3.26.3,
- axios: ^0.21.1,
- dotenv: ^10.0.0,
- http-proxy-middleware: ^2.0.0,
- node-sass: ^6.0.0,
- react: ^17.0.2,
- react-apexcharts: ^1.3.9,
- react-cookie: ^4.0.3,
- react-dom: ^17.0.2,
- react-router-dom: ^5.2.0,
- react-scripts: 4.0.3,
- web-vitals: ^1.1.2

## Dependencies (server)

- axios: ^0.21.1,
- ccxt: ^1.50.91,
- cookie-parser: ~1.4.4,
- cors: ^2.8.5,
- debug: ~2.6.9,
- express: ~4.16.1,
- http-errors: ~1.6.3,
- jade: ~1.11.0,
- morgan: ~1.9.1,
- pg: ^8.6.0,
- pg-native: ^3.0.0

## Getting Started

- Install all dependencies (using the `npm i` command).
- Run the backend web server inside of the 'express-server' folder using the `npm run start`
- You'll need postGres installed on your local machine to run this app. More info on this can be found https://www.postgresqltutorial.com/install-postgresql/ 
- Run the React development sever in the root folder using `npm run start`
- Start tracking your favourite coins! 

