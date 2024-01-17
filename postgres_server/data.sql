CREATE TABLE userdata (
    id INT PRIMARY KEY,
    creditScore INT,
    income DECIMAL(15, 2), 
    loanAmount DECIMAL(15, 2), 
    employment BOOLEAN, 
    debt_to_income DECIMAL(5, 3)
    age INT NOT NULL
);
INSERT INTO userdata (id, creditScore, income, loanAmount, employment, debt_to_income, age)
VALUES 
    (2, 680, 50000.00, 200000.00, true, 0.30, 35),
    (3, 720, 75000.00, 150000.00, true, 0.25, 40),
    (4, 650, 60000.00, 100000.00, false, 0.35, 28),
    (5, 710, 80000.00, 250000.00, true, 0.20, 45),
    (6, 640, 55000.00, 120000.00, true, 0.40, 30);
