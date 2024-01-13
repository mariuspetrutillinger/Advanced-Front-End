import React from "react";
import { Article } from "./Article.tsx";

export function ArticleSection() {
    const articles: any[] = [];
    for (let i = 0; i < 10; i++) {
        articles.push(<Article />);
    }

    return (
        <div className="flex w-2/5 h-full absolute flex-col flex-grow gap-32 justify-center items-center left-1/2 -translate-x-1/2">
            {articles}
        </div>
    );
};

export default ArticleSection;