import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
interface Document {
    // Define the structure of a Document here
}

const useAppwrite = (fn: any) => {
    const [data, setData] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response || []);
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const refetch = () => fetchData();
    return { data, isLoading, refetch };
};

export default useAppwrite;
