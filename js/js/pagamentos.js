document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('jogoNome');
    const preco = parseFloat(localStorage.getItem('jogoPreco'));
    const setor = localStorage.getItem('jogoSetor');
    const desconto = parseFloat(localStorage.getItem('userDiscount')) || 0;

    const valorFinal = preco * (1 - desconto);

    document.getElementById('resumo-jogo').innerText = `${nome} (${setor})`;
    if (desconto > 0) document.getElementById('info-desconto').innerText = `DESCONTO SÓCIO APLICADO: ${desconto * 100}%`;
    document.getElementById('resumo-valor').innerText = `TOTAL: R$ ${valorFinal.toFixed(2)}`;
});

function setPay(modo) {
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('pay-card').style.display = (modo === 'pix') ? 'none' : 'block';
    document.getElementById('pay-pix-checkout').style.display = (modo === 'pix') ? 'block' : 'none';
    const btnId = modo === 'credito' ? 'btn-cred' : (modo === 'debito' ? 'btn-deb' : 'btn-pix');
    document.getElementById(btnId).classList.add('active');
}

function confirmarCompra() {
    alert('INGRESSO COMPRADO COM SUCESSO!');
    window.location.href = "../index.html"; // Volta pro login ou home
}