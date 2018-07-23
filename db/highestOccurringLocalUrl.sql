SELECT num, SUM(size) as size
FROM domains 
    JOIN pages ON domains.domain = pages.domain
    JOIN links ON pages.name = links.parent
WHERE 
    domains.domain = $1
AND links.name like $2 
AND name NOT IN (
    SELECT parent
    FROM pages
    )
group BY
    domains.domain, name , size
ORDER BY
    size
    DESC
LIMIT 1;