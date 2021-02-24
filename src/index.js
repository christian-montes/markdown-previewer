import React, {useState} from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
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
  const [markdown, setMarkdown] = useState(parsedText)

  return (
    <>
      <div 
        id='preview'
        className='d-flex'>
        <p>Enter Github flavored markdown:</p>
        <br />
        <textarea
          // placeholder variable in defaultValue
          id='preview'
          onChange={(e) => {setMarkdown(marked(e.target.value, {renderer: renderer}))}}
          defaultValue={text}>
        </textarea>
      </div>
      <br /> <br />

      <div>
        Parsed markdown (HTML):
        <br />
        <div
          id='parsed'
          dangerouslySetInnerHTML={{__html: markdown}}>
        </div>
      </div>
    </>
  )
}

const text = `## Hello React
### Hello React
#### Hello React`;
const parsedText = marked(text, {renderer: renderer})


const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<MDPreviewer />, document.getElementById("root"));