
export function markSuccessfullLogin() {
    localStorage.setItem('markSuccessfullLogin', Date.now().toString())
}

export function hadSuccessfullLoginEver(): boolean {
    return localStorage.getItem('markSuccessfullLogin') !== null;
}