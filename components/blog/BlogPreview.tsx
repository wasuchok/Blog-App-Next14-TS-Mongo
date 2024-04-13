import MarkdownIt from "markdown-it"
import hljs from 'highlight.js'

import "highlight.js/styles/monokai.css"
import { useState } from "react";

const BlogPreview = () => {
    const [markdown, setMarkdown] = useState<string>("");

    const md = new MarkdownIt({
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
  return (
    <>
        <div className="container">
            <div className="row">
                <h1>title</h1>
                <div className="markdown-preview">
                    <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
                </div>
            </div>
        </div>
    </>
  )
}

export default BlogPreview