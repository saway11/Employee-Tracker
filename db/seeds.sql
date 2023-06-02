INSERT INTO department (name)
VALUES ("Development"),
        ("Marketing"),
        ("Sales"),
        ("Advertising");

INSERT INTO role ( title, salary, department_id )
VALUES  ("Tech Lead", 900000.00, 1),
        ("Front End Developers" ,310000.00, 1),
        ("Software Developer" ,510000.00, 1),
        ("Backend Developer" ,310000.00, 1),
        ("Marketing Manager", 100000.00, 2),
        ("Marketing Specialist" , 60000.00, 2),
        ("Sales Manager" , 129000.00, 3),
        ("Sales Rep" ,70000.00, 3),
        ("Advertising Manager", 200000.00, 4),
        ("Art Director" ,134000.00, 4),
        ("Copy Writer" ,156000.00, 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES  ("Tom", "Hanks", 9, null),
        ("Taylor", "Swift", 1, 1),
        ("Thor", "Smith", 3, null),
        ("Steve", "Rogers", 2, 2),
        ("Elon", "Musk", 8, null),
        ("Tim", "Cook", 7, 3),
        ("Skylar", "Grey", 5, null ),
        ("Paige", "Gerrad", 4, 4),
        ("Sam", "Smith", 6, 2),
        ("Adele", "Notsure", 2, 4),
        ("Sam", "Drinkwater", 4, 3),
        ("Mark", "Messi", 5, 1),
        ("Sarah", "Ronaldo", 6, 2),
        ("Zara", "Neymar", 11, 1),
        ("Mary", "Me", 10, 4);