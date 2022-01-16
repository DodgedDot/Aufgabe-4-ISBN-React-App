import logo from './logo.svg';
import './App.css';
const {isbn10Checksum, isbn13Checksum} = require('isbn-check/src/isbn-check')

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <input id="inputFieldISBN" type="text"></input>
        <button id="checkButton" onClick={checkISBN}>Check</button>
        <text id="userFeedback">Feedback</text>
        <p id="searchResult"></p>
        <img id="bookCover"></img>
      </header>
    </div>
  );
  
}

function checkISBN(){
  var isbn = require('node-isbn');
  var checkFeedback
  const inputFieldISBN = document.getElementById('inputFieldISBN')
  const userFeedback = document.getElementById('userFeedback')
  const searchResult = document.getElementById('searchResult')
  const imageResult = document.getElementById('bookCover')
  const inputArray = inputFieldISBN.value.split('')
  const copyInputArray = inputArray.map(x => x)
  copyInputArray.pop()
  const valueToCheck = copyInputArray.reduce((prevElement, currentElement) => { return prevElement + currentElement});
  if(inputArray.length === 10){
    checkFeedback = isbn10Checksum(valueToCheck)
  } else if(inputArray.length === 13){
    checkFeedback = isbn13Checksum(valueToCheck).toString()
  }
  
  if(checkFeedback === inputArray.pop()){
    userFeedback.textContent = "ISBN is valid"
    userFeedback.style.color = "green"
    imageResult.src = null

    isbn.provider(['google']).resolve(inputFieldISBN.value).then(function (book) {
        const {title, description, authors, imageLinks} = book
        searchResult.textContent =
            `Titel des Buches:  ${title}` +
            `Author des Buches: ${authors}  
            Kurze Zusammenfassung: ${description}`
          if(imageLinks.thumbnail != undefined){
            imageResult.src = imageLinks.thumbnail    
          } else {
            imageResult.src = null
          }
    }).catch(function (err) {
        console.log('Book not found', err);
    });
  } else{
    userFeedback.textContent = "ISBN is invalid"
    userFeedback.style.color = "red"
  }
}
export default App;

