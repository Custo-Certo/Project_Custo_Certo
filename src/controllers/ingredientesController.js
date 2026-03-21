// src/controllers/ingredientesController.js

let ingredientesDB = [];
let idContador = 1;

module.exports = {
    // CADASTRAR (POST)
    cadastrar: (req, res) => {
        const { nome, unidade, preco } = req.body; 
        if (!nome || preco < 0) {
            return res.status(400).json({ erro: "Dados inválidos!" });
        }
        const novoIngrediente = { id: idContador++, nome, unidade, preco };
        ingredientesDB.push(novoIngrediente);
        return res.status(201).json({ mensagem: "Salvo!", dadoSalvo: novoIngrediente });
    },

    // LISTAR (GET)
    listar: (req, res) => {
        return res.status(200).json(ingredientesDB);
    },

    // ATUALIZAR (PUT)
    atualizar: (req, res) => {
        const idDoIngrediente = parseInt(req.params.id); 
        const { nome, unidade, preco } = req.body;
        const index = ingredientesDB.findIndex(item => item.id === idDoIngrediente);

        if (index === -1) return res.status(404).json({ erro: "Não encontrado!" });

        ingredientesDB[index] = {
            id: idDoIngrediente,
            nome: nome || ingredientesDB[index].nome,
            unidade: unidade || ingredientesDB[index].unidade,
            preco: preco !== undefined ? preco : ingredientesDB[index].preco
        };
        return res.status(200).json({ mensagem: "Atualizado!", dadoAtualizado: ingredientesDB[index] });
    },

    // DELETAR (DELETE)
    deletar: (req, res) => {
        const idDoIngrediente = parseInt(req.params.id);
        const index = ingredientesDB.findIndex(item => item.id === idDoIngrediente);

        if (index === -1) return res.status(404).json({ erro: "Não encontrado!" });

        ingredientesDB.splice(index, 1);
        return res.status(200).json({ mensagem: "Excluído!" });
    }
};