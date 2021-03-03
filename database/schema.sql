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
    usertype TEXT NOT NULL,
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
    active_status boolean DEFAULT true,
    usertype TEXT NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES user_details(user_id)
);

CREATE TABLE IF NOT EXISTS category(
    category_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS sub_category(
    sub_category_id TEXT,
    main_category_id TEXT,
    FOREIGN KEY (sub_category_id)
    REFERENCES category(category_id),
    FOREIGN KEY (main_category_id)
    REFERENCES category(category_id),
    PRIMARY KEY(sub_category_id, main_category_id)
);

CREATE TABLE IF NOT EXISTS product(
    product_id TEXT PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    sku TEXT NOT NULL,
    weight NUMERIC(10,2) NOT NULL,
    description TEXT NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS product_category(
    product_id TEXT,
    category_id TEXT,
    FOREIGN KEY (product_id)
    REFERENCES product(product_id),
    FOREIGN KEY (category_id)
    REFERENCES category(category_id),
    PRIMARY KEY(product_id,category_id)
);

CREATE TABLE IF NOT EXISTS custom_attribute(
    custom_attribute_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product_custom_attribute(
    product_id TEXT,
    custom_attribute_id TEXT,
    value TEXT NOT NULL,
    PRIMARY KEY(product_id, custom_attribute_id),
    FOREIGN KEY (custom_attribute_id)
    REFERENCES custom_attribute(custom_attribute_id)
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


CREATE TABLE IF NOT EXISTS product_variant(
    product_id TEXT,
    variant_name TEXT,
    unit_price NUMERIC(10,2) NOT NULL,
    count_in_stock INT NOT NULL,
    FOREIGN KEY (product_id)
    REFERENCES product(product_id),
    PRIMARY KEY(product_id,variant_name)
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
    delivery_method TEXT NOT NULL,
    order_status_id TEXT NOT NULL,
    comments TEXT,
    dispatched_date TIMESTAMP NOT NULL,
    payment_method_id TEXT NOT NULL,
    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id),
    FOREIGN KEY (order_status_id)
    REFERENCES order_status(order_status_id),
    FOREIGN KEY (payment_method_id)
    REFERENCES payment_method(payment_method_id)
);


CREATE TABLE IF NOT EXISTS order_item(
    order_id TEXT,
    product_id TEXT,
    product_variant TEXT,
    quantity INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (order_id)
    REFERENCES order_details(order_id),
    FOREIGN KEY (product_id)
    REFERENCES product(product_id),
    PRIMARY KEY(order_id, product_id,product_variant)
);

CREATE TABLE IF NOT EXISTS order_item_note(
    note_id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_variant TEXT NOT NULL,
    note TEXT NOT NULL,
    FOREIGN KEY (order_id)
    REFERENCES order_details(order_id),
    FOREIGN KEY (product_id)
    REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS order_courier(
    order_id TEXT PRIMARY KEY,
    courier_id TEXT NOT NULL,
    FOREIGN KEY (order_id)
    REFERENCES order_details(order_id),
    FOREIGN KEY (courier_id)
    REFERENCES courier(courier_id)
);








