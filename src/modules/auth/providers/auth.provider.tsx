import { createContext, PropsWithChildren } from 'react';

import { HttpClient } from '@/base/lib';

interface AuthContextValue {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const AuthContext = createContext(null);

export function AuthProvider({
  children,
  tokens,
}: PropsWithChildren<{ tokens: AuthContextValue }>) {
  HttpClient.accessToken = tokens.accessToken;
  HttpClient.refreshToken = tokens.refreshToken;

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
