export const setAccessTokenPersistent = (token) => {
    localStorage.setItem('access_token', token);
}

export async function getAccessToken() {
    return localStorage.getItem('access_token');
}