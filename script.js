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
            definitionContainer.innerHTML = `
                <div class="error-msg-container">
                    <span>☹️</span>
                    <span>No Definitions Found</span>
                    <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
                <div>
            `
            throw new Error ('Network response not ok')

        }
        return response.json();
    })
    .then (searchword => {
        console.log(JSON.stringify(searchword, null, 2));
        // definitionContainer.innerHTML = JSON.stringify(searchword, null, 2);
        
        searchword.map((search) => {
            let {word, phonetic, sourceUrls, meanings} = search;

            // console.log(search.meanings);

        definitionContainer.innerHTML = 
        `
        <div>
            <h1>${word}</h1>
            <span>${phonetic}</span>
        </div>

        <div>
        ${
            meanings.map((meaning) => {
                let{ partOfSpeech, definitions } = meaning;
                console.log(partOfSpeech);
                console.log(definitions);
            })
        }
            
        </div>

        <div>
            <p>Source</p>
            <a href="${sourceUrls[0]}">${sourceUrls[0]}</a>
        </div>
        `
        })


        // searchword.map((search) => {
        //     let {word, phonetic, sourceUrls} = search;

        //     definitionContainer.innerHTML = `
        //     <div>
        //         <h1>${word}</h1>
        //         <span>${phonetic}</span>
        //         <span>Source <a href="${sourceUrls}">${sourceUrls}</a></span>
        //     </div>
        //     `
        // })
    });
});


// console.log(searchWord);https://stackoverflow.com/questions/50417982/js-fetch-api-access-return-value