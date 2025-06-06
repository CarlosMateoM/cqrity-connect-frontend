import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'reverb',
    key: 'njy8gii5tqlnr8ofoxz3',
    wsHost: "api.cqrity-connect.site",
    wsPort: 8082,
    forceTLS: true,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'https://api.cqrity-connect.site/api/v1/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer 1|16UtrOLTqbWK1ktxiALpqn7OI1BDrS8ku1iIT8Ree76521df`,
        },
    }, 
});