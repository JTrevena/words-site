import './App.css';
import {useState, useEffect} from "react";
const fetchDefinitions = require("./networking/fetchDefinitions");
const BACKEND_PATH = "http://localhost:8000";
const INITIAL_WORD = "Research";


function App() {
  const [currentWord, setCurrentWord] = useState(INITIAL_WORD);
  const [results, setResults] = useState({definitions: []});
  const [showAllDefs, setShowAllDefs] = useState(false);

  useEffect(()=>{
    async function updateResults() {
      const results = await fetchDefinitions(BACKEND_PATH, currentWord);
      setResults(results);
    }
    updateResults();
  }, [currentWord])
  
  async function handleSubmitWord(e) {
    e.preventDefault();
    const word = e.target[0].value;
    setCurrentWord(word);
  }

  async function toggleShowAllDefs() {
    setShowAllDefs(!showAllDefs);
  }

  function displayResults() {
    return results.definitions.map((result, i) => {
      return (
        <div key={i}>
          <div className={showAllDefs ? "definition-parent-show" : "definition-parent-hide"} id={`definition-${i}`}>
            <p className="def-child-classification">{result.classification}</p>
            <p className="def-child-definition">{result.definition}</p>
          </div>
        </div>
      )
    })
  }
  
  return (
    <div className="App">
      <h1>Look up a word!</h1>
      <form id="word-form"  onSubmit={handleSubmitWord}>
        <input id="word-input" type="text"/>
        <button id="word-submit" type="submit">Submit!</button>
      </form>
      <h1>{currentWord}</h1>
      <div>{displayResults()}</div>
  { results.definitions.length > 1 && <button onClick={toggleShowAllDefs}>{showAllDefs ? "Show Less" : "Show More"}</button> }
    </div>
  );
}

export default App;
