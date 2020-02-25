export const setAccessTokenPersistent = (token) => {
    localStorage.setItem('access_token', token);
}

export async function getAccessToken() {
    return localStorage.getItem('access_token');
}

export function baseSort(a, b) {
    let comparison = 0;
    if (a < b) {
        comparison = 1;
    } else if (a > b) {
        comparison = -1;
    }
    return comparison;
}