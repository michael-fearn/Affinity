SELECT from_page FROM link
WHERE current_node_index = 0
GROUP BY from_page
ORDER BY random()
LIMIT 1;