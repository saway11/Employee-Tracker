// function to call inquirer package
const inquirer = require('inquirer');

// import and require mysql2
const mysql = require('mysql2');
require('dotenv').config();

// calling console.table package
const cTable = require('console.table');

// mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // Todo: Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
)

