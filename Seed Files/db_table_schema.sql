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
