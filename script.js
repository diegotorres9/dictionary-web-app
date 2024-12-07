const form = document.querySelector('form');
const definitionContainer = document.getElementById('definition-container');

form.addEventListener("submit", function(e) {
    e.preventDefault();

let word = document.getElementById('searchbar').value;
let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
// console.log(word);
fetch(dictionaryUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error ('Networl rresponse not ok');
        }
        return response.json();
    })
    .then (searchword => {
        console.log(JSON.stringify(searchword, null, 2));

        searchword.map((search) => {
            let {word, phonetic} = search;

            definitionContainer.innerHTML = `
            <div>
                <h1>${word}</h1>
                <span>${phonetic}</span>
            </div>
            `
        })
    });
});


// console.log(searchWord);https://stackoverflow.com/questions/50417982/js-fetch-api-access-return-value