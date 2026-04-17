/**
 * SISTEMA ARENA PRO - CORE STORAGE
 * Gerencia toda a persistência de dados no LocalStorage
 */

const Storage = {
    
    // --- GESTÃO DE USUÁRIOS ---
    saveUser: (user) => {
        const db = JSON.parse(localStorage.getItem('users_db')) || [];
        // Verifica se o email já existe para evitar duplicatas
        if (db.some(u => u.email === user.email)) return false;
        
        db.push(user);
        localStorage.setItem('users_db', JSON.stringify(db));
        return true;
    },

    getUsers: () => {
        return JSON.parse(localStorage.getItem('users_db')) || [];
    },

    // --- GESTÃO DE SESSÃO (LOGIN) ---
    setSession: (user) => {
        localStorage.setItem('session', JSON.stringify(user));
    },

    getSession: () => {
        return JSON.parse(localStorage.getItem('session'));
    },

    logout: () => {
        localStorage.removeItem('session');
        localStorage.removeItem('cart'); // Limpa carrinho ao sair
        window.location.href = "login.html";
    },

    // --- GESTÃO DE CARTÕES ---
    saveCard: (card) => {
        const cards = JSON.parse(localStorage.getItem('cards_db')) || [];
        cards.push(card);
        localStorage.setItem('cards_db', JSON.stringify(cards));
    },

    getCards: (email) => {
        const all = JSON.parse(localStorage.getItem('cards_db')) || [];
        return all.filter(c => c.userEmail === email);
    },

    // --- GESTÃO DE CARRINHO (COMPRA ATUAL) ---
    setCart: (item) => {
        localStorage.setItem('cart', JSON.stringify(item));
    },

    getCart: () => {
        return JSON.parse(localStorage.getItem('cart'));
    },

    clearCart: () => {
        localStorage.removeItem('cart');
    },

    // --- GESTÃO DE INGRESSOS (HISTÓRICO) ---
    savePurchase: (ticket) => {
        const db = JSON.parse(localStorage.getItem('purchases_db')) || [];
        db.push(ticket);
        localStorage.setItem('purchases_db', JSON.stringify(db));
        
        // Após salvar a compra, limpa o carrinho automaticamente
        Storage.clearCart();
    },

    getMyTickets: (email) => {
        const all = JSON.parse(localStorage.getItem('purchases_db')) || [];
        return all.filter(t => t.userEmail === email);
    },

    // --- UTILITÁRIOS ---
    checkAuth: () => {
        if (!Storage.getSession()) {
            window.location.href = "login.html";
        }
    }
};

// Congela o objeto para evitar modificações acidentais em runtime
Object.freeze(Storage);