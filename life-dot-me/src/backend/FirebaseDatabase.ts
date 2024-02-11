import { getDatabase, ref, push, set, child, update, query, limitToLast, get, DataSnapshot, orderByChild } from "firebase/database";
import { app } from "./FirebaseConfig.ts";

interface Article {
    id: string;
    userId: string;
    title: string;
    content: string;
    likes: number;
    date: string;
}

interface User {
    authId: string;
    email: string;
    password: string;
    userName: string;
    articles: Article[];
}

async function AddNewUser(userId: string, email: string, password: string) {
    const db = getDatabase(app);
    const userName = email.split('@')[0];
    const newUserData = {
        authId: userId,
        email: email,
        password: password,
        userName: userName,
        articles: {}
    };

    const usersDataRef = ref(db, 'usersData');
    const newUserRef = child(usersDataRef, userId);
    set(newUserRef, newUserData);
}

async function GetProfileData(userId: string) {
    const db = getDatabase(app);
    const usersDataRef = ref(db, 'usersData/' + userId);

    const snapshot = await get(usersDataRef);
    if (snapshot.exists()) {
        const data : User = snapshot.val();
        return data;
    } else {
        console.log("No data available");
    }
}

async function AddUserArticle(userId: string, articleTitle: string, articleContent: string, date: string) {
    const db = getDatabase(app);

    const newArticleKey = push(child(ref(db), 'articles')).key;
    const newArticleData = {
        id: newArticleKey,
        userId: userId,
        title: articleTitle,
        content: articleContent,
        likes: 0,
        date: date
    };
    const updates = {};
    updates['/articles/' + newArticleKey] = newArticleData;
    updates['/usersData/' + userId + '/articles/' + newArticleKey] = newArticleData;

    return update(ref(db), updates);
}

async function GetUserArticles(userId: string) {
    const db = getDatabase(app);
    const userArticlesRef = ref(db, 'usersData/' + userId + '/articles');
    const userArticlesQuery = query(userArticlesRef, limitToLast(50));

    const snapshot = await get(userArticlesQuery);
    if (snapshot.exists()) {
        let data : DataSnapshot[] = [];
        snapshot.forEach((child : any) => {
            if (child.exists())
                data.push(child.val());
        });
        return data;
    } else {
        console.log("No data available");
    }
}

async function GetAllArticles() {
    const db = getDatabase(app);
    const articlesRef = ref(db, 'articles');
    const articleQuery = query(articlesRef, limitToLast(50));

    const snapshot = await get(articleQuery);
    if (snapshot.exists()) {
        let data : DataSnapshot[] = [];
        snapshot.forEach((child : DataSnapshot) => {
            if (child.exists())
                data.push(child.val());
        });
        return data;
    } else {
        console.log("No data available");
    }
}

async function GetMostLikedArticle() {
    const db = getDatabase(app);
    const articlesRef = ref(db, 'articles');
    const articleQuery = query(articlesRef, orderByChild('likes'), limitToLast(1));

    const snapshot = await get(articleQuery);
    if (snapshot.exists()) {
        const data : Article = snapshot.val();
        const dataObject = data[Object.keys(data)[0]];
        const id = dataObject.id;
        return id;
    } else {
        console.log("No data available");
    }
}

async function LikeArticle(articleId: string) {
    const db = getDatabase(app);
    const articleRef = ref(db, 'articles/' + articleId + '/likes');
    const likesRef = await get(articleRef);
    const articleUserRef = ref(db, 'articles/' + articleId + '/userId');
    const userRef = await get(articleUserRef);
    const likes = likesRef.val() + 1;
    const user = userRef.val();
    console.log(likes);
    const updates = {};
    updates['/articles/' + articleId + '/likes'] = likes;
    updates['/usersData/' + user + '/articles/' + articleId + '/likes'] = likes;
    return update(ref(db), updates);
}

export { AddNewUser, GetProfileData };
export { AddUserArticle, GetUserArticles, GetAllArticles, GetMostLikedArticle, LikeArticle };