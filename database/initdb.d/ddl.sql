CREATE TABLE atrpg.Character (
    CharacterID   NVARCHAR(128) NOT NULL PRIMARY KEY,
    CharacterName NVARCHAR(128) NOT NULL
);

CREATE TABLE atrpg.TransactionTest (
    TestID   NVARCHAR(128) NOT NULL,
    CreatedAt DATETIMEOFFSET NOT NULL,
    CONSTRAINT PK_TransactionTest PRIMARY KEY (TestID, CreatedAt)
);

-- schemaspy sample 用
-- 1. 顧客テーブルの作成
create table atrpg.customers (
    customer_id int primary key,
    first_name nvarchar(50),
    last_name nvarchar(50),
    email nvarchar(100)
);
-- 2. 注文テーブルの作成
create table atrpg.orders (
    order_id int primary key,
    customer_id int,
    order_date date,
    total_amount decimal(10, 2),
    foreign key (customer_id) references atrpg.customers(customer_id)
);
-- 3. 注文詳細テーブルの作成
create table atrpg.order_details (
    order_detail_id int primary key,
    order_id int,
    product_name nvarchar(100),
    quantity int,
    price decimal(8, 2),
    foreign key (order_id) references atrpg.orders(order_id)
);
-- 4. 顧客レコードの追加
insert into atrpg.customers (customer_id, first_name, last_name, email)
values (1, 'John', 'Doe', 'john.doe@example.com'),
       (2, 'Jane', 'smith', 'jane.smith@example.com'),
       (3, 'David', 'johnson', 'david.johnson@example.com');

-- 5. 注文レコードの追加
insert into atrpg.orders (order_id, customer_id, order_date, total_amount)
values (101, 1, '2023-09-20', 150.50),
       (102, 2, '2023-09-21', 220.75),
       (103, 3, '2023-09-22', 75.25);

-- 6. 注文詳細レコードの追加
insert into atrpg.order_details (order_detail_id, order_id, product_name, quantity, price)
values (1001, 101, 'Product A', 2, 30.25),
       (1002, 101, 'Product B', 3, 25.50),
       (1003, 102, 'Product C', 1, 45.00);