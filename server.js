const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'toby4545',
      database: 'corporate_db',
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
];

// function to view all employees employee.manager_id CONCAT(employee.first_name, ' ', employee.last_name)
// "SELECT role.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, employee.manager_id AS manager from employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee ON employee.manager_id = employee.id"
function viewAllEmployees() {
    console.log('Viewing all Employees');
    db.query("SELECT role.id, employee1.first_name, employee1.last_name, role.title, department.department_name AS department, role.salary, employee1.manager_id AS manager FROM employee AS employee1 JOIN role ON employee1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS employee2 ON employee1.manager_id = employee2.id", (err, result) => {
        if (err) {
            console.log(err)
        } 
        console.table(result);
        init();
    });
};

function viewAllRoles() {
    console.log('View all Roles');
    db.query("SELECT role.id, role.title, department.department_name, role.salary from role join department on role.department_id = department.id", (err, result) => {
        if (err) {
            console.log(err)
        } 
        console.table(result);
        init();
    });
};

function viewAllDepartments() {
    console.log('View all Departments');
    db.query("SELECT * FROM department", (err, result) => {
        if (err) {
            console.log(err)
        } 
        console.table(result);
        init();
    });

};

// initiate prompt questions
function init() {
    console.log('prompts questions')
    inquirer
        .prompt(questions)
        .then((responses) => {
            console.log(responses);
            if (responses.tracker === "View All Employees") {
                viewAllEmployees();
              } else if (responses.tracker === "Add Employee") {
                addEmployee();
              } else if (responses.tracker === "Update Employee Role") {
                updateEmployeeRole();
              } else if (responses.tracker === "View All Roles") {
                viewAllRoles();
              } else if (responses.tracker === "Add Role") {
                addRole();
              } else if (responses.tracker === "View All Departments") {
                viewAllDepartments();
              } else if (responses.tracker === "Add Department") {
                addDepartment();
              } else if (responses.tracker === "Quit") {
                quit();
              } 
        });
};