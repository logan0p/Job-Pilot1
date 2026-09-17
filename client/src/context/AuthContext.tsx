import { createContext, useState } from "react";
import type { ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (token: string, user?: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (
    newToken: string,
    userData?: User
  ) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);
    }
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};