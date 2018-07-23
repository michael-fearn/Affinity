INSERT INTO users
(auth_id, user_name)
values
($1, $2)
RETURNING *;
