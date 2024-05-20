import { getCurrentUser } from "@/lib/appwrite";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

// Định nghĩa kiểu cho UserContext
interface UserContextType {
    isLoading: boolean;
    isLogin: boolean;
    user: any; // Bạn có thể thay đổi `any` thành kiểu cụ thể của người dùng nếu có
    setUser: React.Dispatch<React.SetStateAction<any>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

// Tạo UserContext với giá trị mặc định
const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null); // Thay đổi `any` thành kiểu cụ thể nếu cần

    useEffect(() => {
        getCurrentUser()
            .then((result: any) => {
                if (result) {
                    setUser(result);
                    setIsLogin(true);
                } else {
                    setUser(null);
                }
            })
            .catch((err: any) => {
                console.error("Failed to get current user", err);
                setUser(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <UserContext.Provider
            value={{ isLoading, isLogin, user, setUser, setIsLogin }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
