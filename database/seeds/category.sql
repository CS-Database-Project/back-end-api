
--Main Categories--

--Category 1
INSERT INTO category(
    category_id,
    name)
VALUES(
    '997293a1-fe85-4cd1-870b-1ca48f9df71c',
    'Game'
);

--Category 2
INSERT INTO category(
    category_id,
    name)
VALUES(
    'd2a412e1-cf62-4480-acf2-e3c68f2e32f5',
    'Camera & Photo'
);

--Category 3
INSERT INTO category(
    category_id,
    name)
VALUES(
    '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528',
    'Cellphone'
);

--Category 4
INSERT INTO category(
    category_id,
    name)
VALUES(
    'ec2fdb60-a006-492a-bb00-22beffde1e80',
    'Wireless Devices'
);




--Sub Categories--

-- Main Category - 1
--Sub Category - 1

INSERT INTO category(
    category_id,
    name)
VALUES(
    '7b55e1f6-6745-4e67-8f9f-71ec2114b48e',
    'Gaming Console'
);

INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    '7b55e1f6-6745-4e67-8f9f-71ec2114b48e',
    '997293a1-fe85-4cd1-870b-1ca48f9df71c'
);


--Sub Category - 2

INSERT INTO category(
    category_id,
    name)
VALUES(
    'd2d02433-3a24-445b-a87d-f321e71947a2',
    'Gaming Equipment'
);
    
INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    'd2d02433-3a24-445b-a87d-f321e71947a2',
    '997293a1-fe85-4cd1-870b-1ca48f9df71c'
);


-- Main Category - 2
--Sub category - 1
INSERT INTO category(
    category_id,
    name)
VALUES(
    '8fbd41bb-4ef4-4530-8532-b85dd9b7bc45',
    'DSLR'
);

INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    '8fbd41bb-4ef4-4530-8532-b85dd9b7bc45',
    'd2a412e1-cf62-4480-acf2-e3c68f2e32f5'
);


-- Main Category - 3
--Sub Category - 1
INSERT INTO category(
    category_id,
    name)
VALUES(
    'c0bd58a9-490a-464e-9f3e-8f43269ac50f',
    'Smartphone'
);

INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    'c0bd58a9-490a-464e-9f3e-8f43269ac50f',
    '4df3ffc2-da7f-4fb4-99b8-b7fe9503d528'
);


-- Main Category - 4
--Sub Category - 1
INSERT INTO category(
    category_id,
    name)
VALUES(
    'dd5cf553-2c84-4b69-b8cc-0e8177fb2598',
    'Headphone'
);

INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    'dd5cf553-2c84-4b69-b8cc-0e8177fb2598',
    'ec2fdb60-a006-492a-bb00-22beffde1e80'
);

--Sub Category - 2
INSERT INTO category(
    category_id,
    name)
VALUES(
    '2c1ce3ec-c47a-4bed-9443-2354a3befdb6',
    'Echo Dot'
);

INSERT INTO sub_category(
    sub_category_id,
    main_category_id)
VALUES(
    '2c1ce3ec-c47a-4bed-9443-2354a3befdb6',
    'ec2fdb60-a006-492a-bb00-22beffde1e80'
);
