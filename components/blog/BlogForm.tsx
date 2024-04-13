"use client";

import { useState } from "react";
import MarkDownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

import Resizer from 'react-image-file-resizer'
import toast from 'react-hot-toast'

import axios from 'axios'

const MarkdownEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");

  const md = new MarkDownIt({
    highlight : (str, lang) => {
        const language = lang && hljs.getLanguage(lang) ? lang : 'js';

        try {
            const highlightedCode = hljs.highlight(language, str, true).value
            return `<pre class="hljs"><code>${highlightedCode}</code></pre>`
        } catch (error) {
            return ""
        }
    }
  });

  const handleImageUpload = (file : any) => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file, 1280, 720, 'JPEG', 100, 0, async (uri) => {
                try {
                    const response = await axios.post(`/api/crud/uploads`, {
                        image : uri
                    })

                    console.log(response)

                    if(response.status != 200) {
                        reject(new Error("Image upload failed"))
                        toast.error("Image upload failed")
                    } else {
                        
                        resolve(response.data.url)
                    }
                } catch (err) {
                    reject(err)
                }
            }, "base64"
        )
    })
  }

  return (
    <div className="mx-2">
      <input
        type="text"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        className="w-full h-24 rounded-lg my-2 p-2"
        placeholder="Blog title"
      />

      <MdEditor
        value={markdown}
        style={{ height: "50vh" }}
        onChange={({ text }) => setMarkdown(text)}
        renderHTML={(text) => md.render(text)}
        onImageUpload={(file : any) => handleImageUpload(file)}
      />
    </div>
  );
};

export default MarkdownEditor;
