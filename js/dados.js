// ===========================
// NOTÍCIAS POR TIME
// ===========================
const NOTICIAS_TIMES = {
  "palmeiras":   "🏆 Time com vantagem no Brasileirão!\nExcelente momento da equipe.",
  "flamengo":    "🔴 Flamengo em boa forma!\nOtimismo com o elenco.",
  "corinthians": "⚠️ Time em crise!\nNecessita de reforços urgentes.",
  "sao paulo":   "📍 São Paulo buscando recuperação.\nFoco total no campeonato.",
  "santos":      "⚽ Santos com bom desempenho!\nTime confiante para os jogos.",
  "default":     "⚽ Acompanhe as notícias do seu time!",
};

function obterNoticiaTime() {
  const time = estado.timeDoUsuario;
  return NOTICIAS_TIMES[time] || NOTICIAS_TIMES["default"];
}

// ===========================
// LOGOS DOS TIMES — SVG inline (#6)
// Sem dependência externa, 100% confiável
// ===========================
const LOGOS_BASE64 = {
  "flamengo": "data:image/png;base64,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",
  "palmeiras": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABWCAYAAAAHWZ75AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAABCjklEQVR42u19e5RUxbnvr6r23l07zc7MPBiG4REQEAmCEHniQwRESAKJUUSUhwYlxFzFBxFQEBRFEB+ABhAUiIiI4oMkHn0oICLKQ0AikuYmg0EeMyTPmWFmz0x37133Pue7f3Tvnt27d3cbAomkh3XY9KN31a1b9e1f1fn92N/fz4AxxhDCMGIAjDHE2LAEDoCIEGPM3hgJAIQBBu0CBJKACZg+eNApIAwBBoBBixgg0cFhEiZGEYCIH4y4FYsYCBUeAQAfMAGv3wQwAREAJgfRAiAICYiCCB8AAAHwAAL4gYGBBvmtg+vH/yvwm+cC/FNxHPB/T0BwagADaCHKA1cJHQyQCQOYOFAbAAAAAABJRU5ErkJggg==",
  "corinthians": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABwCAYAAADWrHjSAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAABeeklEQVR42tW9d5gUVfbH/bm3qjpNHnLOQXIWVBAUQUHMoqsu5rhittV11TUn1EXX7LpiWsUIdziAQixRAiLKQ0EiMLQHjnJAGBiGYUafV//Od9ypnpnpnqEw3vMzH7enp3v61rnn/s53v39RWlah",
  "sao paulo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABaCAYAAABwm16CAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAgz0lEQVR42u19e5RUxbnvr6r23l07zc7MPBiG4REQEAmCEHniQwRESAIkGEUQOJAoEMUHkY8gBRGNhCCCiA8IACECIQ8lMQmiiCiJoEYgEiGRCNbISB5JyDzSvTNbr7Xv72fX7uns3t09A+yQp8NaY85013bVqc+pe37n/O7nFmMMwBhCCGMMMQAGwBhj7I0BAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
  "santos": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABhCAYAAAAeJqnsAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAxXklEQVR42u1deXgU17n2c1dXr6CqSgoBAgECsYkdW8bGjm3c2I2N25qkSdOkTuMkTdPFSbo0aVN3aZqmaZumbdqkadu0bZYubZq2adImbWI3dmNiG2MbsMHAKBb7ztJaVfdz3j+mGzGjRUKzY+bzPc8+s8vMnO/M+8373TnnnA=="
};

// Fundos por time para os escudos
const LOGO_BGS = {
  "flamengo":    "#1a0000",
  "palmeiras":   "#0a1a0a",
  "corinthians": "#111111",
  "sao paulo":   "#111111",
  "santos":      "#0a0a12",
};

function logoHtml(time, size = 20) {
  const src = LOGOS_BASE64[time];
  if (!src) return '';
  const bg = LOGO_BGS[time] || 'transparent';
  return `<img src="${src}" alt="${time}" class="time-logo" style="width:${size}px;height:${size}px;object-fit:contain;vertical-align:middle;margin:0 4px;border-radius:3px;background:${bg};padding:1px;">`;
}

function logoHtmlBig(time, size = 90) {
  const src = LOGOS_BASE64[time];
  if (!src) return '';
  const bg = LOGO_BGS[time] || 'transparent';
  return `<img src="${src}" alt="${time}" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:50%;background:${bg};padding:4px;animation:splashPulse 1.5s ease-in-out infinite;">`;
}

// ===========================
// PARTIDAS
// ===========================
const PARTIDAS = [
  { id: 1, nome: "Palmeiras vs Flamengo",     preco: 180, times: ["palmeiras", "flamengo"],    data: "10/05/2026", hora: "16:00" },
  { id: 2, nome: "Corinthians vs São Paulo",   preco: 150, times: ["corinthians", "sao paulo"], data: "11/05/2026", hora: "18:30" },
  { id: 3, nome: "Flamengo vs Corinthians",    preco: 200, times: ["flamengo", "corinthians"],  data: "17/05/2026", hora: "20:00" },
  { id: 4, nome: "Palmeiras vs Corinthians",   preco: 160, times: ["palmeiras", "corinthians"], data: "18/05/2026", hora: "16:00" },
  { id: 5, nome: "São Paulo vs Flamengo",      preco: 170, times: ["sao paulo", "flamengo"],    data: "24/05/2026", hora: "19:00" },
  { id: 6, nome: "Santos vs Palmeiras",        preco: 140, times: ["santos", "palmeiras"],      data: "25/05/2026", hora: "11:00" },
];

// ===========================
// TEMAS POR TIME
// ===========================
const TEMAS_TIMES = {
  "palmeiras":   { primary: "#00c853", hover: "#009624", bg: "rgba(0,200,83,0.07)"    },
  "flamengo":    { primary: "#e53935", hover: "#b71c1c", bg: "rgba(229,57,53,0.07)"   },
  "corinthians": { primary: "#ffffff", hover: "#cccccc", bg: "rgba(255,255,255,0.05)" },
  "sao paulo":   { primary: "#e53935", hover: "#b71c1c", bg: "rgba(229,57,53,0.07)"   },
  "santos":      { primary: "#f5f5f5", hover: "#bdbdbd", bg: "rgba(245,245,245,0.05)" },
  "default":     { primary: "#00ff6a", hover: "#00cc55", bg: "rgba(0,255,106,0.05)"   },
};

function aplicarTema(time) {
  const tema = TEMAS_TIMES[time] || TEMAS_TIMES["default"];
  const root = document.documentElement;
  root.style.setProperty('--neon-green',     tema.primary);
  root.style.setProperty('--neon-green-dim', tema.hover);
  root.style.setProperty('--setor-bg',       tema.bg);
  root.style.setProperty('--border-green',   tema.primary);
}
