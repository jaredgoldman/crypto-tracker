DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE accounts(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  exchange_id INTEGER REFERENCES exchanges(id) NOT NULL,
  api_key VARCHAR(100),
  api_secret VARCHAR(100) 
)