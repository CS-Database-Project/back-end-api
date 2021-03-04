

 --Product 7

 INSERT INTO product(
     product_id,
     title,
     sku,
     weight,
     description)
 VALUES(
     'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
     'Samsung Galaxy 7',
    1,
     60.5,
     'This product is the updated version of the Samsung Galaxy 6'
 );

 INSERT INTO product_variant(
   product_id,
   variant_name,
   unit_price,
   count_in_stock
 )
VALUES(
   'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
   'default',
   449.99,
   5
 );

INSERT INTO product_variant(
  product_id,
  variant_name,
   unit_price,
  count_in_stock
)
VALUES(
  'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
   '64 GB Memory',
   449.99,
   5
 );

 INSERT INTO product_variant(
   product_id,
   variant_name,
   unit_price,
   count_in_stock
 )
VALUES(
   'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
   '128 GB Memory',
  499.99,
  8
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
  '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  'dbc7683e-4690-4739-8c3d-777ddc4a72b7',
  'c0bd58a9-490a-464e-9f3e-8f43269ac50f'
);

--Product 8

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
    'Google Pixel 5',
    1,
    55.5,
    'Google Pixel can capture high-quality photos in both bright and poorly-lit environments. For selfie enthusiasts, Google smartphone also sports an 8-megapixel front camera, which is much more powerful than the iPhone 7s.'
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
  'default',
  479.99,
  7
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
  '64 GB Memory',
  499.99,
  5
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
  '128 GB Memory',
  559.99,
  3
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
  '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '61e22ea1-9ee7-4978-aaa6-8892df0fa25f',
  'c0bd58a9-490a-464e-9f3e-8f43269ac50f'
);



--Product 9

INSERT INTO product(
    product_id,
    title,
    sku,
    weight,
    description)
VALUES(
    '1a67aeb3-23f7-4986-9734-aa42cc12dca9',
    'Huawei Nova 7i',
    1,
    57.5,
    ''
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '1a67aeb3-23f7-4986-9734-aa42cc12dca9',
  'default',
  559.99,
  5
);

INSERT INTO product_variant(
  product_id,
  variant_name,
  unit_price,
  count_in_stock
)
VALUES(
  '1a67aeb3-23f7-4986-9734-aa42cc12dca9',
  '32 GB Memory',
  599.99,
  7
);

--Can be more categories for one product. So, many rows can be created...
INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '1a67aeb3-23f7-4986-9734-aa42cc12dca9',
  '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528'
);

INSERT INTO product_category(
  product_id,
  category_id

)
VALUES(
  '1a67aeb3-23f7-4986-9734-aa42cc12dca9',
  'c0bd58a9-490a-464e-9f3e-8f43269ac50f'
);