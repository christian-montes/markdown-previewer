import React, {useState} from "react";
import ReactDOM from "react-dom";
const marked = require('marked');

// setting options for marked
// marked takes a string of markdown to parse
const renderer = new marked.Renderer();
marked.setOptions({
  gfm: true,
  breaks: true
})

// creating a function component
function MDPreviewer() {
  // eslint-disable-next-line no-unused-vars
  const [markdown, setMarkdown] = useState(parsedText)

  return (
    <>
      Enter Github flavored markdown:
      <br />
      <textarea
      // placeholder variable added after
        id='preview'
        onChange={(e) => {setMarkdown(marked(e.target.value, {renderer: renderer}))}}
        defaultValue={text}>
      </textarea>
      <br /> <br />

      Parsed markdown (HTML):
      <br />
      <div
        id='parsed'
        dangerouslySetInnerHTML={{__html: markdown}}>
      </div>
    </>
  )
}

const text = `<h2>This is a level 2 header markdown format</h2>`;
const parsedText = marked(text, {renderer: renderer})


const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<MDPreviewer />, document.getElementById("root"));