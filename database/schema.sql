-- CREATE DATABASE e_commerce;

CREATE TABLE IF NOT EXISTS customer(
    customer_id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    birth_date TIMESTAMP NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS customer_account(
    customer_id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active_status boolean DEFAULT true,
    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id)
);

CREATE TABLE IF NOT EXISTS user_details(
    user_id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date TIMESTAMP NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS user_account(
    user_id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    usertype TEXT NOT NULL,
    active_status boolean DEFAULT true,
    FOREIGN KEY (user_id)
    REFERENCES user_details(user_id)
);

CREATE TABLE IF NOT EXISTS category(
    category_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS product(
    product_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id TEXT NOT NULL,
    quantity_in_stock INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (category_id)
    REFERENCES category(category_id)
);

CREATE TABLE IF NOT EXISTS product_review(
    review_id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    rating TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id),
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS payment_method(
    payment_method_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS courier(
    courier_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS order_status(
    order_status_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS order_details(
    order_id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    order_status_id TEXT NOT NULL,
    comments TEXT,
    dispatched_date TIMESTAMP NOT NULL,
    payment_method_id TEXT NOT NULL,
    courier_id TEXT NOT NULL,
    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id),
    FOREIGN KEY (order_status_id)
    REFERENCES order_status(order_status_id),
    FOREIGN KEY (payment_method_id)
    REFERENCES payment_method(payment_method_id),
    FOREIGN KEY (courier_id)
    REFERENCES courier(courier_id)
);


CREATE TABLE IF NOT EXISTS order_item(
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (order_id)
    REFERENCES order_details(order_id),
    FOREIGN KEY (product_id)
    REFERENCES product(product_id),
    PRIMARY KEY(order_id, product_id)
);

CREATE TABLE IF NOT EXISTS order_item_note(
    note_id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    note TEXT NOT NULL,
    FOREIGN KEY (order_id)
    REFERENCES order_details(order_id),
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
);








