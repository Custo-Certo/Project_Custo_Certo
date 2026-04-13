import type { Request, Response } from 'express';

interface Ingrediente {
    id: number;
    nome: string;
    unidade: string;
    preco: number;
    estoqueAtual: number;
    estoqueMinimo: number;
}

let ingredientesDB: Ingrediente[] = [];
let idContador = 1;

export const ingredientesController = {

    listar: (_: Request, res: Response) => {
        res.json(ingredientesDB);
    },

    cadastrar: (req: Request, res: Response) => {
        const {
            nome,
            unidade,
            preco,
            estoqueAtual,
            estoqueMinimo
        } = req.body;

        const novo: Ingrediente = {
            id: idContador++,
            nome,
            unidade,
            preco: Number(preco),
            estoqueAtual: Number(estoqueAtual),
            estoqueMinimo: Number(estoqueMinimo)
        };

        ingredientesDB.push(novo);
        res.status(201).json(novo);
    },

    deletar: (req: Request<{ id: string }>, res: Response) => {
        const id = Number(req.params.id);
        ingredientesDB = ingredientesDB.filter(i => i.id !== id);
        res.status(204).send();
    }
};