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
                'update an employee role',
                'quit',
            ],
        },
    ];

    // function to gather user input and perform actions based on the selected choice.
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
    // prompt user to enter what is the name of the deparment
    inquirer.createPromptModule(question).then(({ addDepartment } = data) => {
        const queryStatement = `INSERT INTO department(name)
        Values ('${addDepartment}');
        `;
        db.query(queryStatement, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.info(`Added ${addDepartment} to the database`);
            askQuestion();
        });
    });
}

// Add new Role
async function addRole() {
    try {
        const [result] = await db.promise().query(`SELECT * FROM department`);

        const departmentNameArr = result.map(({ id, name }) => {
            return { name, value: id };
        });

        const question = [
            {
                type: 'input',
                name: 'title',
                message: `What is the name of the Role`,
            },
            // salary of the role
            {
                type: 'input',
                name: 'salary',
                message: `Please add the salary of the role`,
            },
            // which department does the role belong to?
            {
                type: 'list',
                name: 'department_id',
                message: `Which department does the role belong to?`,
                choices: departmentNameArr,
            },
        ];

        // using inquirer to prompt the user for data, insert that data into a databse using SQL and handle any error that occur
        const data = await inquirer.createPromptModule(question);
        const queryStatement = `INSERT INTO role SET ?`;
        awaitdb.promise().query(queryStatement, data);

        console.info(`Added ${data.title} the database`);
        askQuestion();
    } catch (err) {
        console.log(err);
    }
}
// Add new employee
async function addEmployee() {
    let roleArr, managerList;

    const [roles] = await db.promise().query(`SELECT title, id FROM role`);
    // Only need the first array that gets the return from the promise
    roleArr = role.map(({ title, id}) => {
        return { name: title, value: id};
    });

    const [managers] = await db
    .promise()
    .query(
        `SELECT first_name, last_name, id FROM employee WHERE employee.manager_id IS NULL`
    );

    // Only need the first array that gets return from the promise
    managerList = managers.map(({ firs_name, last_name, id }) => {
        return { name: `${first_name} ${last_name}`, value: id};
    });

    // Add none an option
    managerList.push({ name: 'None', value: null});

    const question = [
        {
            type: 'input',
            name: 'first_name',
            message: `What is the first name?`,
        },
        // What is the employee's role
        {
          type: 'list',
          name: 'role_id',
          message: `What is the employee's role?`,
          choices: roleArr,  
        },
        // who is the employee's manager (none is an option)
        {
            type: 'list',
            name: 'manager_id',
            message: `Who is the employee's manager?`,
            choices: managerList,
        },
    ];
    // To prompt the user for data, insert the data into a database table 
    const data = await inquirer.createPromptModule(question);
    const queryStatement = `INSERT INTO employee SET ?`;
    await db.promise().query(queryStatement, data);

    console.info(`Added ${data.first_name} ${data.last_name} to the database`);

    askQuestion();
}


