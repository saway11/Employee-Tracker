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
                    break;
                case 'view all roles':
                    viewAll(`SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary
                    FROM role
                    INNER JOIN department ON role.department_id = department.id`);
                    break;
                case 'view all employees':
                    viewAll(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, salary, CONCAT(manager.first_name , " ", manager.last_name) as Manager
                    FROM employee
                    INNER JOIN role ON employee.role_id = role.id
                    INNER JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON employee.manager_id = manager.id
                    ORDER BY id;`);
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break;
                default:
                    process.exit();
                    break;
            }
        })
        .catch((err) => console.log(err));
}

// General view all results function
function viewAll(queryStatement) {
    db.query(queryStatement, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        askQuestion();
    });
}

// Add new deparment
function addDepartment() {
    const question = [
        {
            type: 'input',
            name: 'addDepartment',
            message: `What is the name of the deparment`,
        },
    ];
    //
}

