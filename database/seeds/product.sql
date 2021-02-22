
--Product 1

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '40f2c63d-5bb8-452b-897d-92a6423231ee',
    'Airpods Wireless Bluetooth Headphones',
    '1',
    '12.5',
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '40f2c63d-5bb8-452b-897d-92a6423231ee',
  'default',
  89.99,
  10
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '40f2c63d-5bb8-452b-897d-92a6423231ee',
  'ec2fdb60-a006-492a-bb00-22beffde1e80'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '40f2c63d-5bb8-452b-897d-92a6423231ee',
  'dd5cf553-2c84-4b69-b8cc-0e8177fb2598'
);




--Product 2

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
    'iPhone 11 Pro',
    1,
    50.5,
    'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
  'default',
  599.99,
  7
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
  '128 GB Memory',
  599.99,
  7
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
  '256 GB Memory',
  699.99,
  10
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
  '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '6c1474f5-4df7-4942-9afc-73a644d8cbd3',
  'c0bd58a9-490a-464e-9f3e-8f43269ac50f'
);


--Product 3

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    'd208b515-03af-40f7-af3f-4662e710bc67',
    'Cannon EOS 80D DSLR Camera',
    1,
    100.5,
    'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  'd208b515-03af-40f7-af3f-4662e710bc67',
  'default',
  929.99,
  6
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'd208b515-03af-40f7-af3f-4662e710bc67',
  'd2a412e1-cf62-4480-acf2-e3c68f2e32f5'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'd208b515-03af-40f7-af3f-4662e710bc67',
  '8fbd41bb-4ef4-4530-8532-b85dd9b7bc45'
);

--Product 4

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '85fd5456-434b-487d-9df9-d0da3b10bf9f',
    'Sony Playstation 4 Pro White Version"',
    1,
    1000.5,
    'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '85fd5456-434b-487d-9df9-d0da3b10bf9f',
  'default',
  1029.99,
  11
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '85fd5456-434b-487d-9df9-d0da3b10bf9f',
  '997293a1-fe85-4cd1-870b-1ca48f9df71c'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '85fd5456-434b-487d-9df9-d0da3b10bf9f',
  '7b55e1f6-6745-4e67-8f9f-71ec2114b48e'
);


--Product 5

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    'f5afcb4a-bcc2-473a-9376-521dff4cc3a2',
    'Logitech G-Series Gaming Mouse',
    1,
    50.5,
    'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  'f5afcb4a-bcc2-473a-9376-521dff4cc3a2',
  'default',
  50.99,
  20
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'f5afcb4a-bcc2-473a-9376-521dff4cc3a2',
  '997293a1-fe85-4cd1-870b-1ca48f9df71c'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'f5afcb4a-bcc2-473a-9376-521dff4cc3a2',
  'd2d02433-3a24-445b-a87d-f321e71947a2'
);

--Product 6

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '9b1f4306-ae7f-4cee-8ade-768297efc949',
    'Amazon Echo Dot 3rd Generation',
    1,
    250.5,
    'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '9b1f4306-ae7f-4cee-8ade-768297efc949',
  'default',
  150.99,
  10
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '9b1f4306-ae7f-4cee-8ade-768297efc949',
  'ec2fdb60-a006-492a-bb00-22beffde1e80'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '9b1f4306-ae7f-4cee-8ade-768297efc949',
  '2c1ce3ec-c47a-4bed-9443-2354a3befdb6'
);







