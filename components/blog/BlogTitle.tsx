"use client";

import { useState } from "react";

const BlogTitle = () => {
  const [title, setTitle] = useState<string>("");




  return (
    <div className="mx-2">
      <input
        type="text"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        className="w-full h-24 rounded-lg my-2 p-2"
        placeholder="Blog title"
      />

    </div>
  );
};

export default BlogTitle;
