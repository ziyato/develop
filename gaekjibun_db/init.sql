CREATE SCHEMA IF NOT EXISTS user_schema;

CREATE TABLE
    user_schema.user_data (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        profile_pic VARCHAR(255),
        alert_date INT DEFAULT 5
    );

CREATE SCHEMA IF NOT EXISTS food_schema;

CREATE TABLE
    food_schema.food_data (
        food_id SERIAL PRIMARY KEY,
        food_name VARCHAR(100) NOT NULL,
        food_pic VARCHAR(255),
        category VARCHAR(50),
        purchase_date DATE NOT NULL,
        expiration_date DATE NOT NULL,
        user_id INT,
        food_amount INTEGER DEFAULT 1 NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user_schema.user_data (user_id)
    );