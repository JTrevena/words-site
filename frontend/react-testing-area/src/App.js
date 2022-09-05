import './App.css';
import {useState, useEffect} from "react";
const fetchDefinitions = require("./networking/fetchDefinitions");
const BACKEND_PATH = "http://localhost:8000";
const INITIAL_WORD = "Research";
const NO_RESULTS_MESSAGE = "Sorry, our dictionary doesn't have any results for that word";
const WELCOME_MESSAGE = "Simple Web Dictionary"


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
        <div className="definition-wrapper" id={`definition-wrapper-${i}`} key={i}>
          <div className={i === 0 || showAllDefs ? "definition-parent-show" : "definition-parent-hide"} id={`definition-${i}`}>
            <p className="def-child-classification">{result.classification}</p>
            <p className="def-child-definition">{result.definition}</p>
          </div>
        </div>
      )
    })
  }
  
  return (
    <div className="App">
      <h1 className="header-message">{WELCOME_MESSAGE}</h1>
      <div className="dictionary">
        <div className="search-form-wrapper">
          <h1>Look up a word!</h1>
          <form id="word-form"  onSubmit={handleSubmitWord}>
            <input id="word-input" type="text"/>
            <button id="word-submit" type="submit">Submit!</button>
          </form>
        </div>
        <div className="results-section">
          <h2 style={{textDecoration:"underline",margin:"0"}}>{currentWord}</h2>
          {results.definitions.length === 0 && <h3>{NO_RESULTS_MESSAGE}</h3>}
          {results.definitions.length > 0 && <div className="results-wrapper">{displayResults()}</div>}
          {results.definitions.length > 1 && <button onClick={toggleShowAllDefs}>{showAllDefs ? "Show Less" : "Show More"}</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
