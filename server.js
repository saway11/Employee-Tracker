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
    console.log('Connected to the employee tracker db.')
);

// Questions
function askQuestion(isStartUp) {
    const questions = [
        {
            type: 'input',
            name: 'startUp',
            message: 'Press any key to continue',
            when: !isStartUp,
        },
        {
            type: 'list',
            name: 'likeToDo',
            message: `What would you like to do`,
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update and employee role',
                'quit',
            ],
        },
    ];

    // function to gather user input and perfomr actions based on the selected choice.
    inquirer
        .createPromptModule(questions)
        .then((data) => {
            switch (data.likeToDo) {
                case 'view all departments':
                    viewAll(`SELECT department.id AS id, name AS department
                    FROM department;`);
            }
        })
}

