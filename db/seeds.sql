INSERT INTO department (department_name)
VALUES ('sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales lead', 100000.00, 1 ),
       ('Salesperson', 80000.00, 1),
       ('Lead Engineer', 150000.00, 2),
       ('Software Engineer', 120000.00, 2),
       ('Account bManager', 160000.00, 3),
       ('Accountant', 125000.00, 3),
       ('Legal Team Lead', 250000.00, 4),
       ('Lawyer', 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 7),
       ('Mike', 'Chan',2, 1),
       ('Ashley', 'Rodriguez', 3, 1),
       ('Kevin', 'Tupik', 4, 3),
       ('Kunal', 'Singh', 5, 3),
       ('Malia', 'Brown', 6, 5),
       ('Sarah', 'Lourd', 7, 5),
       ('Tom', 'Allen', 8, 7);