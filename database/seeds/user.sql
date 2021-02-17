--User 1

INSERT INTO user_details(
    user_id, 
    first_name, 
    last_name,
    email,
    birth_date,
    phone,
    address,
    city,
    state)
VALUES (
    '5afc7431-5d9b-404c-908c-ac88e8fd61c6', 
    'John',
    'Smith',
    'johnsmith@gmail.com',
    '1998-12-26',
    '076-2141663',
    '22/37 Saddasena Mawatha',
    'Nugegoda',
    'Colombo');

INSERT INTO user_account(
     user_id, 
     username,
     password,
     active_status,
     usertype)
VALUES (
    '5afc7431-5d9b-404c-908c-ac88e8fd61c6',
    'john',
    '$2y$10$OVyhhdEfUWz/1EVTHyiBbeKmys.ERKx4NgSZeb44i7T9DCyqCymvm',
    'true',
    'admin'
);

--User 2

INSERT INTO user_details(
    user_id, 
    first_name, 
    last_name,
    email,
    birth_date,
    phone,
    address,
    city,
    state)
VALUES (
    '2a9390ef-792e-40a4-8822-1907c7bf28fb ', 
    'Lionel',
    'Messi',
    'lionelmessi@gmail.com',
    '1986-05-20',
    '071-1274300',
    '1/129 Susila Mawatha Giripura',
    'Hikkaduwa',
    'Galle');

INSERT INTO user_account(
     user_id, 
     username,
     password,
     active_status,
     usertype)
VALUES (
    '2a9390ef-792e-40a4-8822-1907c7bf28fb ',
    'lionel',
    '$2y$12$YJXvC.pzyaPpgU5wR2wcc.vReqts1lieZ9C0OUmbu31GBnE1RE0bS ',
    'true',
    'admin'
);

--User 3

INSERT INTO user_details(
    user_id, 
    first_name, 
    last_name,
    email,
    birth_date,
    phone,
    address,
    city,
    state)
VALUES (
    '92891d5d-7e60-405e-8835-e4c6d5db5592', 
    'Cristiano',
    'Ranaldo',
    'ranaldo7@gmail.com',
    '1995-11-26',
    '076-2163463',
    '22/37 Samagi Mawatha',
    'Moratuwa',
    'Colombo');

INSERT INTO user_account(
     user_id, 
     username,
     password,
     active_status,
     usertype)
VALUES (
    '92891d5d-7e60-405e-8835-e4c6d5db5592',
    'ronaldo',
    '$2y$12$DgJFqVrFdCyE7pRiQc6usunS5sG3d.IEyHXT3cIKdtr4JMB0Stwk2',
    'true',
    'admin'
);

--User 4

INSERT INTO user_details(
    user_id, 
    first_name, 
    last_name,
    email,
    birth_date,
    phone,
    address,
    city,
    state)
VALUES (
    '39cc8776-0a8a-4e8b-88be-9296962338e6', 
    'Yasasi',
    'Pabasara',
    'yasasipabasara@gmail.com',
    '1994-05-06',
    '078-9845673',
    '1/99 wepathaira',
    'Tangalle',
    'Hambanthota');

INSERT INTO user_account(
     user_id, 
     username,
     password,
     active_status,
     usertype)
VALUES (
    '39cc8776-0a8a-4e8b-88be-9296962338e6',
    'Yasasi',
    '$2y$10$5NHZZRuuqeUieTCsAsocAOufdjud9V6YjJj5T67LQ8YMaGVLJFUF',
    'false',
    'admin'
);

--User 5

INSERT INTO user_details(
    user_id, 
    first_name, 
    last_name,
    email,
    birth_date,
    phone,
    address,
    city,
    state)
VALUES (
    '409da249-c194-49da-969c-e1f733df345b ', 
    'ranjan',
    'ramanadhan',
    'ranjanramanadhan@gmail.com',
    '1990-01-07',
    '078-9867873',
    '15/45 Kalapura',
    'Ranminithanna',
    'Hambanthota');

INSERT INTO user_account(
     user_id, 
     username,
     password,
     active_status,
     usertype)
VALUES (
    '409da249-c194-49da-969c-e1f733df345b ',
    'ranjan',
    '$2y$12$o5aDZbzLyS.CJwuvETHRiuhuz0YxcgpZH3TCUkP.yO/ftefTt25jC ',
    'false',
    'admin'
);
