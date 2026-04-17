function updateTheme(time) {
    const colors = { "Palmeiras": "#00ff62", "Corinthians": "#ffffff", "Flamengo": "#ff0000", "Sao Paulo": "#ff4d4d" };
    if (colors[time]) {
        document.documentElement.style.setProperty('--main-color', colors[time]);
        // Salva visualmente, mas garantimos o dado final no clique do botão
        localStorage.setItem('themeColor', colors[time]); 
    }
}

function toggleSocioPay(val) {
    document.getElementById('area-pagamento-socio').style.display = (val > 0) ? 'block' : 'none';
}

function setSocioPay(modo) {
    document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('socio-card-fields').style.display = (modo === 'pix') ? 'none' : 'block';
    document.getElementById('socio-pix-fields').style.display = (modo === 'pix') ? 'block' : 'none';
    const btnId = modo === 'credito' ? 's-btn-cred' : (modo === 'debito' ? 's-btn-deb' : 's-btn-pix');
    document.getElementById(btnId).classList.add('active');
}

function finalizarCadastro() {
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    
    // CORREÇÃO: Pegamos o valor do time e do sócio EXATAMENTE na hora do clique
    const timeEscolhido = document.getElementById('cad-time').value;
    const descontoSocio = document.getElementById('cad-socio').value;

    if(!timeEscolhido || !email || !senha) {
        return alert("Preencha todos os campos obrigatórios (E-mail, Senha e Selecione um Time)!");
    }
    
    // CORREÇÃO: Salva no Banco Local com garantia
    localStorage.setItem('userTeam', timeEscolhido);
    localStorage.setItem('userDiscount', descontoSocio);

    // Como o arquivo cadastro.html já está na pasta 'pages', ele acha o 'jogos.html' direto
    window.location.href = "jogos.html";
}