-- Escreva uma query SQL para recuperar os 5 clientes que mais gastaram em pedidos.
SELECT c.id, c.nome, SUM(p.total) AS total_gasto
FROM clientes c
INNER JOIN pedidos p ON (c.id = p.cliente_id)
GROUP BY c.id, c.nome
ORDER BY total_gasto DESC
LIMIT 5;


-- Escreva uma query SQL para obter o valor médio dos pedidos por mês.
SELECT TO_CHAR(DATE_TRUNC('month', data_pedido), 'TMMonth') AS mês, 
       AVG(total) AS média
FROM pedidos
GROUP BY DATE_TRUNC('month', data_pedido)
ORDER BY DATE_TRUNC('month', data_pedido);
