import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, queryByText, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM, getByDisplayValue } from "@testing-library/react";

import App from "../../App";

// TESTS // 

// when a user logs in..
  // we see the watchlist

  // if user has coins we see coins 
  // if user has no coins we see something directing our user to add a coin

// when a user adds a coin to their watchlist..

  // we see the coin on the users watchlist 

// when a user selects a coin..

  // we are directed to the coin/show page