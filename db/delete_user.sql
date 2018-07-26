DELETE FROM users
WHERE auth_id LIKE $1;