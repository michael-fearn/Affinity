--  (input array order [domain, url of scanned page, time of scan in milliseconds])
INSERT INTO page 
(
    site_id, 
    url, 
    scan_time
)
SELECT
    site.site_id, $2, $3
FROM
    site
WHERE
    site.domain = $1;