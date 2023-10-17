const inquirer = require('inquirer');
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'corporate_db'
    },
    console.log(`Connected to the corporate_db database.`)
);

db.connect(() => {
    init();
});

const questions = [
    {
        type: "list",
        name: "tracker",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Departments",
            "Quit"
        ]
    }
]

function init() {
    console.log('prompts questions')
    inquirer
        .prompt(questions)
        .then((responses) => {
            console.log(responses);
        });
};