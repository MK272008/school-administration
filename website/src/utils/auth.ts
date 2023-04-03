export function logOut() {

    if (typeof window == undefined) return;

    localStorage.removeItem('token');
    window.location.href = "/";
}

export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}