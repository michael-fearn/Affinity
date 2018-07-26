SELECT parent FROM links
WHERE current_node_index = 0
    AND parent like $1
GROUP BY parent;