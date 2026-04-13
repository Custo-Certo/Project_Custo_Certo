const API_URL = 'http://localhost:3000';

let estoque = [];

// ==============================
// CARREGAR ESTOQUE (READ)
// ==============================
async function carregarEstoque() {
    const res = await fetch(`${API_URL}/ingredientes`);
    estoque = await res.json();
    renderEstoque();
}

// ==============================
// RENDER ESTOQUE (UI)
// ==============================
function renderEstoque() {
    const corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = '';

    if (!estoque.length) {
        corpo.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;color:#7f8c8d;padding:40px">
                    Nenhum ingrediente cadastrado
                </td>
            </tr>
        `;
        return;
    }

    estoque.forEach(item => {
        const precisaRepor = item.estoqueAtual < item.estoqueMinimo;

        corpo.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>${item.estoqueAtual.toFixed(3)} ${item.unidade}</td>
                <td>${item.estoqueMinimo.toFixed(3)} ${item.unidade}</td>
                <td style="color:${precisaRepor ? '#e74c3c' : '#2ecc71'}">
                    ${precisaRepor ? 'Repor' : 'OK'}
                </td>
                <td>
                    <button onclick="deletarIngrediente(${item.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

// ==============================
// CADASTRAR (CREATE)
// ==============================
document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ingrediente = {
        nome: document.getElementById('nome').value,
        unidade: document.getElementById('unidade').value,
        preco: Number(document.getElementById('preco').value),
        estoqueAtual: Number(document.getElementById('estoqueAtual').value),
        estoqueMinimo: Number(document.getElementById('estoqueMinimo').value)
    };

    await fetch(`${API_URL}/ingredientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingrediente)
    });

    e.target.reset();
    carregarEstoque();
});

// ==============================
// DELETAR (DELETE)
// ==============================
async function deletarIngrediente(id) {
    const ok = confirm('Deseja excluir este ingrediente?');
    if (!ok) return;

    await fetch(`${API_URL}/ingredientes/${id}`, {
        method: 'DELETE'
    });

    carregarEstoque();
}

// ==============================
// INIT
// ==============================
carregarEstoque();

// =============================
// SOCKET.IO - ATUALIZAÇÃO DE PESO
// ==============================

const socket = io('http://localhost:3000');

socket.on('atualizarPeso', (dados) => {
    document.getElementById('display-peso').innerText =
        dados.peso.toFixed(3) + ' kg';
});