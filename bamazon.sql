CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (

    ItemID INT(10) UNSIGNED AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(255) NOT NULL,
    DepartmentName VARCHAR(255) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY(ItemID)
);
INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)

VALUES
("Macbook Pro", "Laptops", 100, 3000),
("Windows 10 PC", "Laptops",456.00, 5000),
("iPhone 7", "Phones", 649, 700),
("Samsung Galaxy", "Phones", 400, 1000),
("Microwave", "Appliances", 70, 1000),
("Dishwasher", "Appliances", 550, 3000),
("Wii Pro", "Electronics", 300.00, 500),
("Washing Machine", "Appliances", 150, 5000),
("Piano", "Music", 500, 400),
("Violin", "Music", 45, 400);