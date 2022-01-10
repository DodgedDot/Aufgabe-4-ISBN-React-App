import logo from './logo.svg';
import './App.css';
const {isbn10Checksum, isbn13Checksum} = require('isbn-check/src/isbn-check')

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input id="inputFieldISBN" type="text"></input>
        <button id="checkButton" onClick={checkISBN}>Check</button>
        <text id="userFeedback">Feedback</text>
        
      </header>
    </div>
  );
  
}

function checkISBN(){
  var checkFeedback
  const inputFieldISBN = document.getElementById('inputFieldISBN')
  const userFeedback = document.getElementById('userFeedback') 
  const inputLength = inputFieldISBN.value.split('')
  if(inputLength.length < 12){
    checkFeedback = isbn10Checksum(inputFieldISBN.value)
  } else{
    checkFeedback = isbn13Checksum(inputFieldISBN.value)
  }
  //Uncaught Error: isbn13 does not contain 12 digits to calculate?
  //Input X as checknumber retruns NaN?
console.log(checkFeedback)
  if(checkFeedback === '0'){
    userFeedback.textContent = "ISBN is valid"
    userFeedback.style.color = "green"
  } else{
    userFeedback.textContent = "ISBN is invalid"
    userFeedback.style.color = "red"
  }
}
//export {checkISBN};
//import checkISBN from './App.js';
export default App;

