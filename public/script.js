const API_URL = 'http://localhost:3000';

let estoque = [];
let pesoAtual = 0;

// ==============================
// ESTOQUE
// ==============================
async function carregarEstoque() {
  const res = await fetch(`${API_URL}/ingredientes`);
  estoque = await res.json();
  renderEstoque();
}

function renderEstoque() {
  const corpo = document.getElementById('tabela-corpo');
  corpo.innerHTML = '';

  estoque.forEach(item => {
    corpo.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td>${item.estoqueAtual.toFixed(3)} ${item.unidade}</td>
        <td>${item.estoqueMinimo.toFixed(3)} ${item.unidade}</td>
        <td>
          <button onclick="deletarIngrediente(${item.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

async function deletarIngrediente(id) {
  await fetch(`${API_URL}/ingredientes/${id}`, { method: 'DELETE' });
  carregarEstoque();
}

// ==============================
// BALANÇA (PESO AO VIVO)
// ==============================
setInterval(async () => {
  const res = await fetch(`${API_URL}/balanca/peso`);
  const data = await res.json();

  if (typeof data.peso === 'number') {
    pesoAtual = data.peso;
    document.getElementById('display-peso').innerText =
      pesoAtual.toFixed(3) + ' kg';
  }
}, 500);

// ==============================
// AÇÕES
// ==============================
document.getElementById('btn-tara').addEventListener('click', async () => {
  await fetch(`${API_URL}/balanca/tara`, { method: 'POST' });
});

document.getElementById('btn-confirmar').addEventListener('click', async () => {
  const res = await fetch(`${API_URL}/balanca/confirmar`, { method: 'POST' });
  const data = await res.json();

  document.getElementById('status-acao').innerText =
    data.ok
      ? `Pesagem confirmada: ${data.pesoConfirmado.toFixed(3)} kg`
      : data.erro;
});

// ==============================
// INIT
// ==============================
carregarEstoque();