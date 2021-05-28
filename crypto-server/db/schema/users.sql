DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (email)
);

-- ALTER TABLE users ADD COLUMN name VARCHAR(255) NOT NULL;
-- ALTER TABLE users DROP column balance;
-- ALTER TABLE users DROP column balance_date_update;