"use client";

import { createContext, useState } from "react";

// สร้าง Context
const BlogContext = createContext<any>(null);

const BlogProvider: React.FC<any> = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [featuredImage, setFeaturedImage] = useState("");



  return (
    <BlogContext.Provider
      value={{
        title,
        setTitle,
        markdown,
        setMarkdown,
        selectedTags,
        setSelectedTags,
        featuredImage,
        setFeaturedImage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
