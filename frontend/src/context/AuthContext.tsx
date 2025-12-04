import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { signUp as apiSignUp, logIn as apiLogIn } from "../services/authApi"; // import your functions

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    login: (email: string, password: string) => Promise<void>;
    userId: number | null;
    setUserId: (userId: number | null) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) setToken(JSON.parse(storedToken));
        setLoading(false);
    }, []);

    useEffect(() => {
        if (token) localStorage.setItem("accessToken", JSON.stringify(token));
        else localStorage.removeItem("accessToken");
    }, [token]);

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) setUserId(JSON.parse(storedId));
    }, []);

    useEffect(() => {
        if (userId !== null) localStorage.setItem("userId", JSON.stringify(userId)); 
        else localStorage.removeItem("userId");
    }, [userId]);


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogIn(email, password);
            setToken(data.accessToken);
            setUserId(data.userId);
        } catch (err: any) {
            setError(err.message);
            setToken(null);
            setUserId(null);
        } finally {
            setLoading(false);
        }
    };



    const value = { token, setToken, userId, setUserId, loading, setLoading, error, setError, login };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
