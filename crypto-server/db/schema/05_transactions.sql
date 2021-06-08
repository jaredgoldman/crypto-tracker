DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY NOT NULL,
    account_id INTEGER REFERENCES accounts(id),
    transaction_id VARCHAr(25),
    coin_symbol VARCHAR(10),
    base_currency VARCHAR(10),
    quote_currency VARCHAR(10),
    side VARCHAR(15),
    order_type VARCHAR(15),
    unit_price DOUBLE PRECISION,
    amount DOUBLE PRECISION,
    cost DOUBLE PRECISION,
    transaction_time TIMESTAMP WITH TIME ZONE,
    transaction_fee DOUBLE PRECISION,
    fee_currency VARCHAR(5),
    UNIQUE (transaction_id)
)

-- ALTER TABLE transactions 
-- DROP COLUMN account_id;

-- ALTER TABLE transactions 
-- ADD COLUMN account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE;

-- ALTER TABLE transactions 
-- ADD CONSTRAINT accounts_transaction_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE;

