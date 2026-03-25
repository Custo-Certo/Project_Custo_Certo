import type { Request, Response } from 'express';

interface Ingrediente {
    id: number;
    nome: string;
    unidade: string;
    preco: number;
}

let ingredientesDB: Ingrediente[] = [];
let idContador = 1;

export const ingredientesController = {
       cadastrar: (req: Request, res: Response) => {
        const { nome, unidade, preco } = req.body;
        
        // Validação básica para o TS parar de reclamar
        if (typeof nome !== 'string' || typeof unidade !== 'string') {
            return res.status(400).json({ erro: "Nome e unidade devem ser textos." });
        }

        const novo: Ingrediente = { 
            id: idContador++, 
            nome, 
            unidade, 
            preco: Number(preco) 
        };
        ingredientesDB.push(novo);
        res.status(201).json(novo);
    },


    listar: (req: Request, res: Response) => {
        res.json(ingredientesDB);
    },

    atualizar: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = ingredientesDB.findIndex(i => i.id === id);
        if (index !== -1) {
            ingredientesDB[index] = { ...ingredientesDB[index], ...req.body };
            return res.json(ingredientesDB[index]);
        }
        res.status(404).send("Não encontrado");
    },

    deletar: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        ingredientesDB = ingredientesDB.filter(i => i.id !== id);
        res.status(200).send("Excluído");
    }
};
