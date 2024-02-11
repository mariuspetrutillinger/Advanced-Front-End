import React, { useEffect } from "react";
import { Article } from "./Article.tsx";
import { useState } from "react";
import { GetAllArticles } from "../backend/FirebaseDatabase.ts";
import { GetUserArticles } from "../backend/FirebaseDatabase.ts";
import { GetMostLikedArticle } from "../backend/FirebaseDatabase.ts";
import { useDispatch, useSelector } from "react-redux";
import { setMostLiked } from "../redux/mostLikedReducer.ts";

interface Props {
    main: boolean | null;
    profile: string | null;
}

const ArticleSection: React.FC<Props> = ({main, profile}) => {
    const dispatch = useDispatch();
    const mostLiked = useSelector((state: any) => state.mostLiked.value);
    const [articles, setArticles] = useState(Array);

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchArticles = async () => {
                if (main) {
                    try {
                        const response = await GetAllArticles();
                        if (response) {
                            setArticles(response);
                        }
                    } catch (error) {
                        alert("There are no articles to display");
                    }
                } else if (profile) {
                    try {
                        const response = await GetUserArticles(profile);
                        if (response) {
                            setArticles(response);
                        }
                    } catch (error) {
                        alert("There are no articles to display");
                    }
                }
            }

            const handleGoldenArticle = async () => {
                try {
                    const response = await GetMostLikedArticle();
                    if (response) {
                        dispatch(setMostLiked(response));
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            fetchArticles();
            handleGoldenArticle();
        }, 250);

        return () => clearInterval(interval);
    },[main, profile, articles, mostLiked, dispatch]);
    
    return (
        <ul className="flex flex-col items-center w-full h-auto gap-8 mb-8">
            {articles.map((article:any) => (
                <li className="flex justify-center w-full h-auto" key={article.id}>
                    <Article id={article.id} mostLiked={mostLiked} title={article.title} content={article.content} />
                </li>
            ))}
        </ul>
    );
};

export default ArticleSection;