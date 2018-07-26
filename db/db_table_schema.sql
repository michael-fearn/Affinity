DROP TABLE links;
DROP TABLE pages;
DROP TABLE user_site_reference;
DROP TABLE domains;
DROP TABLE users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth_id TEXT,
    user_name VARCHAR(160)
);

CREATE TABLE domains (
    domain_id serial primary key,
    domain VARCHAR(2000) UNIQUE
);

CREATE TABLE pages (
    page_id  SERIAL PRIMARY KEY,
    domain  VARCHAR(2000) REFERENCES domains(domain),
    name VARCHAR(2000) UNIQUE,
    scan_time BIGINT
);
CREATE TABLE links (
    parent VARCHAR(2000) REFERENCES pages(name),
    name VARCHAR(2000),
    current_node_index INTEGER,
    size INTEGER,
    UNIQUE (parent, name)
);

CREATE TABLE user_site_reference (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    domain_id INTEGER REFERENCES domains(domain_id),
    UNIQUE (user_id, domain_id)
);