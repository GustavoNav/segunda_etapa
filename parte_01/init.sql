\c segunda_etapa;

CREATE TABLE vendas (
    id_venda INT PRIMARY KEY,
    data_venda DATE,
    cliente VARCHAR(255),
    produto VARCHAR(255),
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    total_vendas DECIMAL(10, 2)
);