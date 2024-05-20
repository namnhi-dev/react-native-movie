import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
} from "react-native-appwrite";
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "ntechs.aora",
    projectId: "6649f93f00113aac4016",
    databaseId: "6649fb8500389b0bb568",
    userCollectionsId: "6649fbc1002c09c876ed",
    videoCollectionsId: "6649fc1000307feed16a",
    storageId: "6649fe39002824cd78d4",
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (data: any) => {
    const { email, password, username } = data;
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw new Error("Create Account Feild");

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionsId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export default async function signIn(email: string, password: string) {
    try {
        // Kiểm tra tất cả các phiên hiện tại
        const sessions = await account.listSessions();

        // Nếu có ít nhất một phiên đang hoạt động, xóa tất cả các phiên
        if (sessions.total > 0) {
            for (let session of sessions.sessions) {
                await account.deleteSession(session.$id);
            }
        }

        // Tạo phiên mới
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const curentAccount = await account.get();
        if (!curentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionsId,
            [Query.equal("accountId", curentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {}
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionsId
        );
        return posts.documents;
    } catch (error) {}
};
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionsId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
        return posts.documents;
    } catch (error) {}
};
