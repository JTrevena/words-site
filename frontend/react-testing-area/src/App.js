import './App.css';
const fetchDefinitions = require("./networking/fetchDefinitions")

const BACKEND_PATH = "http://localhost:8000"

async function handleSubmitWord(e) {
  e.preventDefault();
  const word = e.target[0].value;
  const response = await fetchDefinitions(BACKEND_PATH, word);
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <h1>Look up a word!</h1>
      <form id="word-form"  onSubmit={handleSubmitWord}>
        <input id="word-input" type="text"/>
        <button id="word-submit" type="submit">Submit!</button>
      </form>
    </div>
  );
}

export default App;
