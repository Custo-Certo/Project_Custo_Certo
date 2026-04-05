# API Custo Certo

API desenvolvida para gerenciamento de estoque e cálculo de custo médio de produtos em estabelecimentos do ramo alimentício, como padarias e restaurantes.

Permite controlar matérias-primas, acompanhar custos e auxiliar na definição de preços de venda.

---

## Como executar o projeto

```bash
# Clonar repositório
git clone <URL_DO_REPOSITORIO>

# Entrar na pasta
cd Project_Custo_Certo

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

---

## Acesso

* API: http://localhost:3000
* Documentação (Swagger): http://localhost:3000/docs

---

## Endpoints

### Ingredientes

| Método | Rota                | Descrição                   |
| ------ | ------------------- | --------------------------- |
| GET    | `/ingredientes`     | Lista todos os ingredientes |
| POST   | `/ingredientes`     | Cria um novo ingrediente    |
| PUT    | `/ingredientes/:id` | Atualiza um ingrediente     |
| DELETE | `/ingredientes/:id` | Remove um ingrediente       |

---

##  Exemplos de requisição

###  Criar ingrediente

```json
{
  "nome": "Farinha",
  "unidade": "kg",
  "preco": 8
}
```

---

###  Atualizar ingrediente

```json
{
  "preco": 10
}
```

---

##  Testes

Os testes podem ser realizados de duas formas:

*  Pelo Swagger (interface interativa no navegador)
*  Pelo Postman

---

## Tecnologias utilizadas

* TypeScript
* Node.js
* Express
* Swagger
* Postman

---

##  Observações

Este projeto foi desenvolvido para fins acadêmicos, com foco em aprendizado de APIs REST e boas práticas de desenvolvimento.

---
