export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "b45b68c4c7a0421589605adf1e1a7626";
const redirectUri = "http://localhost:3000";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-library-read"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

