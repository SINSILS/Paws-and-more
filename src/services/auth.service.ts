const login = (username: string, password: string) => {
  return { token: 'test123', username, password };
};

export const authService = { login };
