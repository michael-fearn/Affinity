select domain
FROM users u
    JOIN user_site_reference usr ON u.user_id = usr.user_id
    JOIN domains d ON d.domain_id = usr.domain_id
WHERE u.auth_id = $1;