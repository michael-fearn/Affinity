
UPDATE users
set user_name = $1
WHERE auth_id = $2;