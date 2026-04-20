// ===========================
// TELA 2: CADASTRO
// ===========================
const TIME_CLASSES = {
  "palmeiras":   "time-palmeiras",
  "flamengo":    "time-flamengo",
  "corinthians": "time-corinthians",
  "sao paulo":   "time-sao-paulo",
  "santos":      "time-santos",
};

document.getElementById('cad-plano').addEventListener('change', function () {
  const secao = document.getElementById('secao-pagamento-cadastro');
  const plano = parseInt(this.value);
  if (plano > 0) {
    secao.classList.remove('hidden');
    document.getElementById('cad-bloco-pix').classList.add('hidden');
    const btnPix = document.getElementById('btn-pix-toggle');
    if (btnPix) { btnPix.classList.remove('ativo'); btnPix.textContent = 'PAGAR POR PIX'; }
  } else {
    secao.classList.add('hidden');
  }
  document.getElementById('cad-time').dispatchEvent(new Event('change'));
});

function togglePixCad() {
  const bloco = document.getElementById('cad-bloco-pix');
  const btn   = document.getElementById('btn-pix-toggle');
  const aberto = !bloco.classList.contains('hidden');
  bloco.classList.toggle('hidden', aberto);
  btn.classList.toggle('ativo', !aberto);
  btn.textContent = aberto ? 'PAGAR POR PIX' : 'FECHAR PIX';
}

document.getElementById('cad-time').addEventListener('change', function () {
  const sel = this;
  Object.values(TIME_CLASSES).forEach(c => sel.classList.remove(c));
  const timeNorm = normalizarTime(this.value);
  const classe   = TIME_CLASSES[timeNorm];
  const tema     = TEMAS_TIMES[timeNorm];
  const cor    = (classe && tema) ? tema.primary : 'var(--neon-cyan)';
  const bg     = (classe && tema) ? tema.bg      : 'rgba(0, 229, 255, 0.04)';
  const sombra = (classe && tema) ? `0 0 0 2px ${tema.primary}22` : '0 0 0 2px rgba(0,229,255,0.08)';
  if (classe && tema) sel.classList.add(classe);
  document.querySelectorAll('.secao-cartao').forEach(s => {
    s.style.borderColor = cor;
    s.style.background  = bg;
    s.style.boxShadow   = sombra;
    const label = s.querySelector('.label-pagamento');
    if (label) label.style.color = cor;
  });
  const btnPix = document.getElementById('btn-pix-toggle');
  if (btnPix) { btnPix.style.borderColor = cor; btnPix.style.color = cor; }
  const qrcode   = document.querySelector('#cad-bloco-pix .qrcode');
  const pixChave = document.querySelector('#cad-bloco-pix .pix-chave');
  if (qrcode)   qrcode.style.borderColor = cor;
  if (pixChave) pixChave.style.color = cor;
});

function finalizarCadastro() {
  const nome  = document.getElementById('cad-nome').value.trim();
  const cpf   = document.getElementById('cad-cpf').value.trim();
  const email = document.getElementById('cad-email').value.trim();
  const senha = document.getElementById('cad-senha').value.trim();
  const time  = document.getElementById('cad-time').value;
  const plano = parseInt(document.getElementById('cad-plano').value) || 0;

  if (!nome || !cpf || !email || !senha || !time) {
    mostrarToast('Preencha todos os campos obrigatórios.', 'warning');
    return;
  }

  const usuarios    = carregarUsuariosDB();
  const emailExiste = usuarios.find(u => u.email === email);
  const cpfExiste   = usuarios.find(u => u.cpf   === cpf);

  if (emailExiste && cpfExiste && emailExiste.email === cpfExiste.email) {
    mostrarToast('CPF e e-mail já cadastrados.\nFaça login ou use outros dados.', 'error');
    return;
  }
  if (emailExiste) { mostrarToast('Este e-mail já está cadastrado.', 'error'); return; }
  if (cpfExiste)   { mostrarToast('Este CPF já está cadastrado.', 'error'); return; }

  const timeNorm = normalizarTime(time);
  const cartaoCredito = {
    numero:   document.getElementById('cad-credito-numero').value.trim(),
    validade: document.getElementById('cad-credito-validade').value.trim(),
    cvv:      document.getElementById('cad-credito-cvv').value.trim(),
  };
  const cartaoDebito = {
    numero:   document.getElementById('cad-debito-numero').value.trim(),
    validade: document.getElementById('cad-debito-validade').value.trim(),
    cvv:      document.getElementById('cad-debito-cvv').value.trim(),
  };

  let codigoSocio = null;
  if (plano > 0) codigoSocio = gerarCodigoSocio();

  const novoUsuario = { nome, cpf, email, senha, plano, time: timeNorm, cartaoCredito, cartaoDebito, codigoSocio };
  salvarUsuarioDB(novoUsuario);

  estado.usuarioLogado = novoUsuario;
  estado.timeDoUsuario = timeNorm;
  aplicarTema(timeNorm);

  if (codigoSocio) {
    mostrarToast(`Cadastro realizado!\n🎫 SEU CÓDIGO DE SÓCIO: ${codigoSocio}\nAnote este código para usar nos ingressos.`, 'success');
  }

  setTimeout(() => {
    mostrarSplashTime(timeNorm, () => {
      carregarPartidas();
      irPara('screen-partidas');
    });
  }, codigoSocio ? 1800 : 300);
}
