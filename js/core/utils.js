window.addEventListener('DOMContentLoaded', () => {
    const user = Storage.getSession();
    const cores = {
        "Palmeiras": "#00ff88",
        "Corinthians": "#ffffff",
        "Flamengo": "#ff1111",
        "São Paulo": "#ff4444",
        "Santos": "#00aaff"
    };

    if (user && cores[user.time]) {
        document.documentElement.style.setProperty('--p', cores[user.time]);
    }
});