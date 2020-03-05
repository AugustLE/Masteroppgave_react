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

export function boolSort(a, b) {
    let comparison = 0;
    if (a && !b) {
        comparison = 1;
    } else if (!a && b) {
        comparison = -1;
    }
    return comparison;
}

export function formatDateTime(dateTime) {
    if (!dateTime) {
      return '';
    }
    const parts = dateTime.split('T');
    const date_parts = parts[0].split('-');
    const date = date_parts[2] + '/' + date_parts[1] + ' - ' + date_parts[0];
    const time_parts = parts[1].split('.')[0].split(':');
    const time = time_parts[0] + ':' + time_parts[1];
    const date_time = date + ', ' + time;
    return date_time;
  }