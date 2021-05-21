export type AuthToken = string | null;
type authState = boolean;

export type Auth = {
  token: AuthToken;
  isLoggedIn: authState;
};
