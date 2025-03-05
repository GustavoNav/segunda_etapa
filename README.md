# Desafio Segunda Etapa

Este repositório contém a solução para o desafio de desenvolvimento, dividido em 3 partes. Clique nos links abaixo para acessar diretamente cada seção:

## Índice

1. [Parte 1: Manipulação de Dados com Python](#parte-1-manipulação-de-dados-com-python)
2. [Parte 2: Modelagem e Querying em Bancos de Dados](#parte-2-modelagem-e-querying-em-bancos-de-dados)
3. [Parte 3: Integração de Dados com Node.js](#parte-3-integração-de-dados-com-nodejs)

## Parte 1: Manipulação de Dados com Python

### Resumo
O objetivo aqui é criar um script para extração, transformação e carga dos dados (ETL). Para realizar o objetivo, criei uma pipeline, dividindo os módulos em 3 partes principais:
- Extract
- Transform
- Load

Na extração, o arquivo CSV é acessado e carregado para o formato de um dataframe pandas.  
Na transformação, os dados do dataframe recebem diversos tratamentos, como: 
- Ajuste do formato da data para `YYYY-MM-DD`
- Criação de uma nova coluna, calculando o total de vendas
- Remoção de linhas com valores nulos

Na carga, os dados são inseridos nos bancos de dados PostgreSQL e MongoDB. O processo foi feito utilizando SQLAlchemy e ajustado para que não sejam inseridos dados duplicados, com base no campo `id_venda`.

Por fim todas as classes são instanciadas no arquivo 'main.py' e executadas em sequência.

### Como executar

#### Configurando o ambiente
Acesse o diretório da Pipeline
```bash
cd parte_01
```

Crie um ambiente virtual e o ative

Linux
```bash
python -m venv .venv
source .venv/bin/activate
```

Windows
```bash
python -m venv .venv
.venv\Scripts\activate
```

instale as dependências
```
pip install -r requirements.txt
```

#### Executar com Banco de Dados local
Adicione, na raiz de parte_01, um arquivo nomeado .env e configure as variáveis de ambiente para os bancos de dados PostgreSQL e MongoDB, conforme suas configurações. Exemplo:

```
DB_USER=postgres
DB_PASS=senhaForte321
DB_HOST=localhost
DB_PORT=5432
DB_NAME=segunda_etapa_pg

MONGO_DB=segunda_etapa_mg
```

No seu banco de dados PostgreSQL, crie a tabela de vendas:

```SQL
CREATE TABLE vendas (
    id_venda INT PRIMARY KEY,
    data_venda DATE,
    cliente VARCHAR(255),
    produto VARCHAR(255),
    quantidade INT,
    preco_unitario DECIMAL(10, 2),
    total_vendas DECIMAL(10, 2)
);
```


Uma vez configurado, basta rodar o arquivo main.py dentro do diretório parte_01:
```bash
python3 main.py
```

Caso tudo tenha sido configurado corretamente, os dados serão extraídos, transformados e carregados corretamente em ambos os bancos de dados.

#### Executar com Banco de Dados docker


## Parte 2: Modelagem e Querying em Bancos de Dados

### Resumo
O objetivo é criar 2 querys, para o banco de dados PostgreSQL e para o MongoDB.
A parte_02 foi divídido em 2 diretórios, cada um com suas respectiva solução.

#### PostgreSQL
1. Escreva uma query SQL para recuperar os 5 clientes que mais gastaram em pedidos.
```SQL
SELECT c.nome, SUM(p.total) AS total_gasto
FROM clientes c
INNER JOIN pedidos p ON (c.id = p.cliente_id)
GROUP BY c.nome
ORDER BY total_gasto DESC
LIMIT 5;
```

2. Escreva uma query SQL para obter o valor médio dos pedidos por mês.
```SQL
SELECT TO_CHAR(DATE_TRUNC('month', data_pedido), 'TMMonth') AS mês, 
       AVG(total) AS média
FROM pedidos
GROUP BY DATE_TRUNC('month', data_pedido)
ORDER BY DATE_TRUNC('month', data_pedido);
```

#### MongoDB
1. Escreva uma consulta MongoDB para retornar os pedidos realizados em fevereiro de 2024.
```js
db.pedidos.find({
    "data_pedido": {
	    $gte: "2024-02-01",
		$lt: "2024-03-01"
	}
})
```

2. Escreva uma query SQL para obter o valor médio dos pedidos por mês.
```js
db.pedidos.aggregate([
    { 
        $unwind: "$itens"
    },
    {
        $group: {
        _id: "$cliente.nome",
        total_pedidos: { 
            $sum: { 
            $multiply: ["$itens.quantidade", "$itens.preco"]
            }
        }
        }
    },
    {
        $group: {
            _id: "$_id",
            media_pedidos: {$avg: "$total_pedidos"}
        }
    }
])
```

## Parte 3: Integração de Dados com Node.js
