function selecionarSetor(setor) {
    localStorage.setItem('jogoSetor', setor);
    window.location.href = "pagamento.html";
}