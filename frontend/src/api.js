import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// For mock token or just passing user id simple demo
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.id) {
            // Custom header just in case backend wants it later
            config.headers['X-User-Id'] = parsedUser.id;
        }
    }
    return config;
});

export default api;
