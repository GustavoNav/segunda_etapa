// Escreva uma consulta MongoDB para retornar os pedidos realizados em fevereiro de 2024.
db.pedidos.find({
    "data_pedido": {
	    $gte: "2024-02-01",
		$lt: "2024-03-01"
	}
})


// Escreva uma query SQL para obter o valor médio dos pedidos por mês.
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