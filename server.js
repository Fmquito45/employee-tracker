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
function viewAllEmployees() {
    console.log('Viewing all Employees');
    db.query("SELECT e1.id, e1.first_name AS employee_first_name, e1.last_name AS employee_last_name, role.title, department.department_name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager_name FROM employee AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS e2 ON e1.manager_id = e2.id", (err, result) => {
        if (err) {
            console.log(err)
        } 
        console.table(result);
        init();
    });
};

function addEmployee() {
    console.log('Add employee data');
    db.query("SELECT id, title FROM role", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const roles = result.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, result) => {
             if (err) {
                    console.log(err);
                    return;
            }
            const managers = result.map(({ id, name }) => ({
                name,
                value: id,
            }));
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "What is the employees's first name?",
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "What is the employees's last name?",
                    },
                    {
                        type: "list",
                        name: "roleId",
                        message: "What is the employees's role?",
                        choices: roles,
                    },
                    {
                        type: "list",
                        name: "managerId",
                        message: "Who is the employee's manager?",
                        choices: [
                            { name: "None", value: null },
                            ...managers,
                            ],
                    },
                ])
                .then((responses) => {
                    console.log(responses);
                    const sql =
                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    const values = [
                        responses.firstName,
                        responses.lastName,
                        responses.roleId,
                        responses.managerId,
                        ];
                    db.query(sql, values, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("Welcome to the team!!");
                        init();
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        );
    });

   
};

// function to view all Roles
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
// function to view all Departments
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