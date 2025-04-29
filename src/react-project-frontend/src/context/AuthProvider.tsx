import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";

interface AuthContextType {
  isAuthenticated: boolean;
  principalId: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authClient: AuthClient | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const II_CANISTER_URL = "https://identity.ic0.app";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [principalId, setPrincipalId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const identity: Identity = client.getIdentity();
        setPrincipalId(identity.getPrincipal().toText());
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!authClient) return;
    await authClient.login({
      identityProvider: II_CANISTER_URL,
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setPrincipalId(identity.getPrincipal().toText());
        setIsAuthenticated(true);
      },
      onError: (error: unknown) => {
        console.error("Error during login", error);
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipalId(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    principalId,
    login,
    logout,
    authClient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
