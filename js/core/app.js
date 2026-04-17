

const { useState, useEffect } = React;

const CLUBES = {
    "Palmeiras": { color: "#00ff88", glow: "rgba(0,255,136,0.3)", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg" },
    "Corinthians": { color: "#ffffff", glow: "rgba(255,255,255,0.3)", logo: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png" },
    "Flamengo": { color: "#ff1111", glow: "rgba(255,17,17,0.3)", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_brazil.svg" },
    "São Paulo": { color: "#ff4444", glow: "rgba(255,68,68,0.3)", logo: "https://upload.wikimedia.org/wikipedia/pt/4/4b/S%C3%A3o_Paulo_Futebol_Clube.svg" }
};

const JOGOS = [
    { id: 1, casa: "Palmeiras", fora: "Flamengo", data: "20 MAI 2026", estadio: "ALLIANZ PARQUE HUD", preco: 180 },
    { id: 2, casa: "Corinthians", fora: "São Paulo", data: "24 MAI 2026", estadio: "NEO QUÍMICA ARENA HUD", preco: 150 },
    { id: 3, casa: "Palmeiras", fora: "Corinthians", data: "01 JUN 2026", estadio: "ALLIANZ PARQUE HUD", preco: 220 }
];

const App = () => {
    // Usando as funções do seu Storage.js
    const [currentUser, setCurrentUser] = useState(Storage.getSession());
    const [authMode, setAuthMode] = useState('login'); 
    const [page, setPage] = useState(currentUser ? 'home' : 'auth');
    const [myTickets, setMyTickets] = useState(Storage.getMyTickets(currentUser?.email));
    const [selectedJogo, setSelectedJogo] = useState(null);
    const [setor, setSetor] = useState(null);

    // Efeito para mudar as cores do sistema conforme o time
    useEffect(() => {
        if(currentUser) {
            const team = CLUBES[currentUser.time];
            document.documentElement.style.setProperty('--p', team.color);
            document.documentElement.style.setProperty('--p-glow', team.glow);
        }
    }, [currentUser]);

    const handleAuth = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        
        if (authMode === 'cadastro') {
            const success = Storage.saveUser({ ...data, isSocio: data.isSocio === 'true' });
            if (!success) return alert("ERRO: E-mail já cadastrado.");
            alert("CADASTRO COMPLETO!");
            setAuthMode('login');
        } else {
            const db = Storage.getUsers();
            const user = db.find(u => u.email === data.email && u.senha === data.senha);
            if (user) {
                Storage.setSession(user);
                setCurrentUser(user);
                setPage('home');
            } else { alert("ACESSO NEGADO."); }
        }
    };

    const finalize = () => {
        const ticket = { 
            ...selectedJogo, 
            setor: setor.nome, 
            userEmail: currentUser.email,
            ref: Math.random().toString(36).substr(2,8).toUpperCase() 
        };
        Storage.savePurchase(ticket);
        setMyTickets(Storage.getMyTickets(currentUser.email));
        setPage('meus-ingressos');
    };

    // Renderização condicional das telas (Auth, Home, Checkout, Ingressos)
    // [Aqui você mantém os componentes que estavam no seu HTML original: AuthScreen, Navbar, etc]
    // ...
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);