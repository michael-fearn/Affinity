SELECT parent FROM links
WHERE current_node_index = 0
GROUP BY parent
ORDER BY random()
LIMIT 1;