# ☕ Banco de Dados `lets_coffee`

Este banco foi criado para gerenciar **insumos, estoque e receitas** de uma cafeteria. Ele organiza categorias, produtos, movimentações de estoque e receitas, permitindo controle completo dos ingredientes usados.

---

## 📂 Estrutura das Tabelas

### 1. `categorias`
- **Finalidade:** agrupar insumos por tipo (ex.: cafés, laticínios, confeitaria).  
- **Campos:**
  - `id` → identificador único.  
  - `nome` → nome da categoria.  
  - `descricao` → descrição opcional.  

---

### 2. `insumos`
- **Finalidade:** armazenar os produtos usados internamente (ex.: leite, café em pó, açúcar).  
- **Campos:**
  - `id` → identificador único.  
  - `nome` → nome do insumo.  
  - `descricao` → detalhes opcionais.  
  - `unidade_medida` → unidade (kg, g, L, ml, unidade).  
  - `quantidade_estoque` → quantidade atual em estoque.  
  - `categoria_id` → vínculo com a tabela `categorias`.  
  - `fornecedor_id` → fornecedor (pode ser detalhado em outra tabela futuramente).  

---

### 3. `movimentacoes_estoque`
- **Finalidade:** registrar entradas e saídas de insumos no estoque.  
- **Campos:**
  - `id` → identificador único.  
  - `insumo_id` → vínculo com o insumo movimentado.  
  - `tipo` → entrada ou saída.  
  - `quantidade` → quantidade movimentada.  
  - `data_movimentacao` → data/hora automática.  
  - `observacao` → observações opcionais.  

---

### 4. `receitas`
- **Finalidade:** guardar receitas da cafeteria (ex.: cappuccino, bolo de chocolate).  
- **Campos:**
  - `id` → identificador único.  
  - `nome` → nome da receita.  
  - `descricao` → descrição opcional.  

---

### 5. `receita_insumos`
- **Finalidade:** vincular insumos às receitas, indicando quanto de cada insumo é usado.  
- **Campos:**
  - `id` → identificador único.  
  - `receita_id` → vínculo com a receita.  
  - `insumo_id` → vínculo com o insumo.  
  - `quantidade` → quantidade usada na receita.  

---

## 🔗 Relacionamentos
- **`categorias` → `insumos`**: cada insumo pertence a uma categoria.  
- **`insumos` → `movimentacoes_estoque`**: cada movimentação está ligada a um insumo.  
- **`receitas` → `receita_insumos` → `insumos`**: cada receita usa vários insumos.  

---

## 🚀 Possíveis Usos
- **Controle de estoque:** saber quanto há de cada insumo.  
- **Histórico de movimentações:** acompanhar entradas e saídas.  
- **Gestão de receitas:** calcular insumos necessários para cada preparo.  
- **Relatórios:** gerar informações sobre consumo e fornecedores.  

---

## 🛠️ Próximos Passos
- Criar tabela de **fornecedores** para detalhar `fornecedor_id`.  
- Implementar **triggers** para impedir estoque negativo.  
- Integrar com o **back-end** para automatizar pesagem e baixa de estoque.  
