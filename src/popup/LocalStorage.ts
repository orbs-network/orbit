export function store(email: string, password: string) {
  localStorage.setItem('cred_email', email);
  localStorage.setItem('cred_password', password);
}

export function load(): { email: string; password: string } {
  const email = localStorage.getItem('cred_email');
  const password = localStorage.getItem('cred_password');

  if (email && password) {
    return { email, password };
  }
}
