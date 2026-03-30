CREATE DATABASE lets_coffee;
USE lets_coffee;

-- Tabela de categorias de insumos (ex: cafés, laticínios, confeitaria)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela de insumos/produtos utilizados internamente
CREATE TABLE insumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    unidade_medida VARCHAR(20) NOT NULL, -- ex: kg, g, L, ml, unidade
    quantidade_estoque DECIMAL(10,2) DEFAULT 0,
    categoria_id INT,
    fornecedor_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
);

-- Tabela de movimentações de estoque (entrada e saída de insumos)
CREATE TABLE movimentacoes_estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    insumo_id INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    FOREIGN KEY (insumo_id) REFERENCES insumos(id)
);

-- Tabela de receitas (para vincular insumos usados em cada preparo)
CREATE TABLE receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT
);

-- Tabela de insumos usados em cada receita
CREATE TABLE receita_insumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receita_id INT NOT NULL,
    insumo_id INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (receita_id) REFERENCES receitas(id),
    FOREIGN KEY (insumo_id) REFERENCES insumos(id)
);