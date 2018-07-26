SELECT sum(size) as size, name
FROM links
WHERE NOT EXISTS ( 
    SELECT parent 
    FROM links 
    WHERE parent = name
    )
GROUP BY
    name
ORDER BY 
    size
    DESC
LIMIT 10; 