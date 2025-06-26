declare module '@/service/authenticationService' {
  export function login(email: string, password: string): Promise<{ token: string }>;
  const _default: { login: typeof login };
  export default _default;
}

