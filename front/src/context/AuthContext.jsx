import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    localStorage.setItem("token", JSON.stringify(userData.token));
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Vous avez été déconnecté.");
  };

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token")?.replace(/"/g, "");
    const userFromLS = JSON.parse(localStorage.getItem("user"));

    if (!tokenFromLS || !userFromLS) {
      setUser(null);
      return;
    }

    setUser(userFromLS); // affichage immédiat

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/check", {
          headers: { Authorization: `Bearer ${tokenFromLS}` },
        });
        const updatedUser = { ...res.data, token: tokenFromLS };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (e) {
        console.error("Erreur AuthContext:", e);
        logout();
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour consommer le contexte
export const useAuth = () => useContext(AuthContext);

export default AuthContext;