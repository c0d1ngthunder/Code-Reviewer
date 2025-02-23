import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  async function getReview() {
    const response = await axios.post("https://code-reviewer-dahx.onrender.com/ai/get-review", {
      code,
    });
    setReview(response.data);
  }

  useEffect(()=>{
    Prism.highlightAll()
  })

  return (
    
    <>
      <main>
        <h1>Review your code</h1>
        <div className="container">
          <div className="left">
            <Editor
              value={code}
              placeholder="Write your code here..."
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                highlight(code, languages.javascript, "javascript")
              }
              padding={15}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                overflow: "auto",
                backgroundColor: "#2d2d2d",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            />
            <input onClick={getReview} type="button" value="Review" />
          </div>
          <div className="right">
            <Markdown >{review}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
