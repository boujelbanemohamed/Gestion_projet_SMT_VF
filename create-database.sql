-- Create database for Bank Card Stock Management System
-- Run this with: psql -U postgres -f create-database.sql

-- Create the database
CREATE DATABASE bank_card_db;

-- Create a user (optional, you can use postgres user)
-- CREATE USER bank_user WITH PASSWORD 'your_password';
-- GRANT ALL PRIVILEGES ON DATABASE bank_card_db TO bank_user;

-- Connect to the database to verify
\c bank_card_db;

-- Show confirmation
SELECT 'Database bank_card_db created successfully!' as message;
