const AUTH_KEY = "auth_users";
const CURRENT_USER_KEY = "current_user";

export const authService = {
    getUsers: () => {
        const users = localStorage.getItem(AUTH_KEY);
        return users ? JSON.parse(users) : [];
    },

    saveUser: (user) => {
        const users = authService.getUsers();
        users.push(user);
        localStorage.setItem(AUTH_KEY, JSON.stringify(users));
        authService.setCurrentUser(user);
    },

    setCurrentUser: (user) => {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    login: (email, password) => {
        const users = authService.getUsers();
        return users.find((user) => user.email === email && user.password === password);
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },
};
