import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
const marked = require('marked');

// setting options for marked
// marked takes a string of markdown to parse
const renderer = new marked.Renderer();
marked.setOptions({
  gfm: true,
  breaks: true
})
// overriding default link behavior; open links in new tab
renderer.link = (href, title, text) => {
  return `<a target='blank' href=${href} title=${title}>${text}</a>`
}

const autoAdjustTextArea = (o) => {
  o.style.height = '1px';
  o.style.height = o.scrollHeight + 'px';
}

const browserHeight = $(window).height();
console.log(browserHeight)

// using jQuery to set the height of the textarea
$(function() {
  $('textarea').each(function() {
    $(this).height($(this).prop('scrollHeight'))
  })
});

// creating a function component
function MDPreviewer() {
  const [markdown, setMarkdown] = useState(parsedText);

  return (
    <div className='container-sm justify-content-center'>
      <div className='d-flex flex-column mt-4'>
        <div>
          <h2>Welcome!</h2>
        </div>
        <div>
          <h5>Please read the text in the first panel to learn how the markdown previewer works.</h5>
        </div>
      </div>
      <Row className='flex'>
        <div 
          id='markdown'
          className='col-sm mr-sm-2 pb-2'
          // style={{border:'1px solid black'}}
          >
          <h3>Enter Github <FontAwesomeIcon icon={faGithub} /> markdown below:</h3>
          {/* <Row className='mb-2' style={{border:'1px solid black'}}> */}
            <textarea
              id='editor'
              className='col-sm-12 card card-body bg-light'
              // style={{height:browserHeight}} replaced with jQuery solution
              onChange={(e) => {setMarkdown(marked(e.target.value, {renderer: renderer}))}}
              onKeyUp={(e) => {autoAdjustTextArea(e.target)}}
              // placeholder variable in defaultValue
              defaultValue={text}>
            </textarea>
          {/* </Row> */}
        </div>
        <br /> <br />

        <div
          id='preview-container'
          className='col-sm pb-2'
          // style={{border:'1px solid red'}}
          >
          <h3>Parsed markdown (HTML):</h3>
          <div
            id='preview'
            className='card card-body bg-light'
            // style={{minHeight:browserHeight/2}}
            dangerouslySetInnerHTML={{__html: markdown}}>
          </div>
        </div>
      </Row>
    </div>
  )
}



const text = `# You can enter Github-flavored markdown in this panel!
## It will be rendered instantly for you on the next panel.
### You can enter headings of different sizes like this one using hash symbols (#).
#### There are five different levels of headings. Each uses a distinct number of hashes (#).

***

You can include thematic break by including three or more dashes, asterisks, or underscores!

---

You can also include links to external pages where:
- link is the text in blue that appears to the user
- uri is the destination
- and the title appears when hovering over the link
[link](/uri 'title')

For example, the following link takes you to Google:
[Google](//www.google.com 'Google search')

Adding an image follows almost exactly the same convention.
_However, an image requires a preceding exclamation point!_
![Bread](/https://www.seriouseats.com/2011/06/20200419-no-knead-bread-vicky-wasik2.jpg title="Bread")

___

You can also include inline-code in markdown by surrounding the code with one or two backticks.
For example, this in-line CSS:
\`{border: 1px solid blue}\` adds style to an element's border.

***

Similarly, markdown can handle code blocks. These are fenced by at least three backticks or tildes (~).
For example: this is a code block defining a React function component:
~~~
function MyComponent {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>The current count is {count}.</p>
    </>
  )
}
~~~

___

> Adding a greater than sign, creates a block quote!
_As you can see, markdown is **extremely** useful_!

Markdown can handle:
- headers of different sizes
- links
- code
- lists like this one
  - lists inside lists
- images
  - local and external
- **bolded text**
- _italic text_
- block quotes
- and many other amazing things!`;
const parsedText = marked(text, {renderer: renderer})


const containerElem = document.createElement('div');
containerElem.setAttribute('id', 'root');
document.body.appendChild(containerElem);

ReactDOM.render(<MDPreviewer />, document.getElementById("root"));