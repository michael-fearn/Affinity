CREATE TABLE site (
site_id serial primary key,
domain VARCHAR(2000)
);

CREATE TABLE page (
    page_id  SERIAL PRIMARY KEY,
    site_id  INTEGER REFERENCES site(site_id),
    url VARCHAR(2000) UNIQUE,
    scan_time INTEGER
)
CREATE TABLE link (
    from_page VARCHAR(2000) REFERENCES page(url),
    to_page VARCHAR(2000)
)