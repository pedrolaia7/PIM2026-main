const JOGOS = [
    { t: "Palmeiras vs Flamengo", p: 180, timeA: "Palmeiras", timeB: "Flamengo" },
    { t: "Corinthians vs Santos", p: 120, timeA: "Corinthians", timeB: "Santos" },
    { t: "São Paulo vs Grêmio", p: 100, timeA: "Sao Paulo", timeB: "Gremio" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Busca o time no banco local
    const userTeam = localStorage.getItem('userTeam');
    const list = document.getElementById('lista-jogos');
    
    list.innerHTML = ""; // Limpa a lista antes de carregar

    // Trava de segurança: Se não achou o time, avisa o usuário
    if (!userTeam) {
        list.innerHTML = `<p style="color: red; text-align: center; font-size: 12px; margin-top: 20px;">Erro: Time não identificado. Volte e faça login ou cadastro.</p>`;
        return; // Para o código aqui
    }

    // Filtra apenas os jogos do time escolhido
    const filtrados = JOGOS.filter(j => j.timeA === userTeam || j.timeB === userTeam);
    
    // Trava de segurança 2: Se o time não tiver jogo marcado na lista
    if (filtrados.length === 0) {
        list.innerHTML = `<p style="text-align: center; font-size: 12px; margin-top: 20px; color: #888;">Nenhum jogo disponível para o ${userTeam} no momento.</p>`;
        return;
    }

    // Renderiza os jogos filtrados na tela
    filtrados.forEach(j => {
        list.innerHTML += `
        <div style="background:rgba(255,255,255,0.03); padding:15px; margin-bottom:10px; border-left:4px solid var(--main-color); transition: 0.3s; cursor: pointer;" 
             onclick="abrirMapa('${j.t}', ${j.p})">
            <strong>${j.t}</strong><br><small>R$ ${j.p.toFixed(2)}</small>
        </div>`;
    });
});

function abrirMapa(nome, preco) {
    localStorage.setItem('jogoNome', nome);
    localStorage.setItem('jogoPreco', preco);
    // Vai para a tela do estádio (ambos estão dentro de 'pages')
    window.location.href = "estadio.html"; 
}