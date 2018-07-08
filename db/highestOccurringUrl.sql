SELECT to_page
FROM site 
    JOIN page ON site.domain = page.domain
    JOIN link ON page.page = link.from_page
WHERE 
    site.domain = $1
AND link.to_page like $2 
AND to_page NOT IN (
    SELECT page
    FROM page
    )
group BY
    site.domain, to_page , count
ORDER BY
    count
    DESC
LIMIT 1;