DROP TABLE link;
DROP TABLE page;
DROP TABLE site;

CREATE TABLE site (
    site_id serial primary key,
    domain VARCHAR(2000) UNIQUE
);

CREATE TABLE page (
    page_id  SERIAL PRIMARY KEY,
    domain  VARCHAR(2000) REFERENCES site(domain),
    page VARCHAR(2000) UNIQUE,
    scan_time BIGINT
);
CREATE TABLE link (
    from_page VARCHAR(2000) REFERENCES page(page),
    to_page VARCHAR(2000),
    count INTEGER
);



SELECT to_page, SUM(count) as count
FROM site 
    JOIN page ON site.domain = page.domain
    JOIN link ON page.page = link.from_page

group BY
    site.domain, to_page , count
ORDER BY
    count
    DESC
LIMIT 10;