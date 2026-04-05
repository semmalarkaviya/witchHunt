import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  role: "student" | "teacher";
  fullName: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (role: "student" | "teacher", credentials: any) => boolean;
  register: (role: "student" | "teacher", data: any) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("edusync_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: "student" | "teacher", credentials: any): boolean => {
    const users = JSON.parse(localStorage.getItem(`edusync_${role}s`) || "[]");
    const found = users.find((u: any) => {
      if (role === "student") {
        return (u.rollNumber === credentials.identifier || u.mobile === credentials.identifier) && u.password === credentials.password;
      }
      return (u.email === credentials.identifier || u.mobile === credentials.identifier) && u.password === credentials.password;
    });
    if (found) {
      const userData = { ...found, role };
      setUser(userData);
      localStorage.setItem("edusync_user", JSON.stringify(userData));
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (role: "student" | "teacher", data: any): boolean => {
    const key = `edusync_${role}s`;
    const users = JSON.parse(localStorage.getItem(key) || "[]");
    users.push(data);
    localStorage.setItem(key, JSON.stringify(users));
    if (role === "student") {
      localStorage.setItem("currentUser", JSON.stringify({ ...data, role }));
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edusync_user");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
