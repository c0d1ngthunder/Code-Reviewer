import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import Markdown from "react-markdown"

function App() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);


  const [code, setCode] = useState("");
  const [review,setReview] = useState("")
  
  async function getReview() {
    const response = await axios.post("http://localhost:3000/ai/get-review",{code});
    setReview(response.data)
  }

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
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor:"#2d2d2d",
                width: "100%",
                height: "100%",
              }}
            />
            <input onClick={getReview} type="button" value="Review" />
          </div>
          <div className="right"><Markdown
          rehypePlugins={[rehypeHighlight]} 
          >{review}</Markdown></div>
        </div>
      </main>
    </>
  );
}

export default App;