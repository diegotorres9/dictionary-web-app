const form = document.querySelector('form');
const definitionContainer = document.getElementById('definition-container');

form.addEventListener("submit", function(e) {
    e.preventDefault();

let word = document.getElementById('searchbar').value;
let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;


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
        
        searchword.map((search) => {
            let {word, phonetic, sourceUrls, meanings, phonetics} = search;

            let audios = Object.values(phonetics).filter(audios => audios.audio != "");



        definitionContainer.innerHTML = 
        `
        <div>
            <h1>${word}</h1>
            <span>${phonetic}</span>
            ${
                audios.map((sound) => {
                let {audio} = sound;
                // console.log(audio);
                // audioSound = new Audio(audio);
                return `
                <svg id="play-btn" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                    <audio src="${audio}"></audio>                
                    <g fill="#A445ED" fill-rule="evenodd">
                        <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                        <path d="M29 27v21l21-10.5z"/>
                    </g>
                </svg>
                `
            })
            }
        </div>

        <div>
            <div>
                ${
                    meanings.map((meaning) => {
                        let { partOfSpeech } = meaning;
                        return `
                            <p>${partOfSpeech}</p>
                            <span>Meaning</span>
                            <ul>
                                ${
                                    meaning.definitions.map((define) => {
                                        return `<li>${define.definition}</li>`
                                    }).join('')
                                }
                            </ul>
                            <div>
                                ${meaning.synonyms.length === 0 ? '' : `<p>Synonyms</p>`}
                                <ul>
                                    ${
                                        meaning.synonyms.map((synonym) => {
                                            return synonym.length === 0 ? '' : `<li>${synonym}</li>`
                                        }).join('')
                                    }
                                </ul>
                            <div>
                        `;
                    }).join('') 
                }
            </div>
        </div>

        <div>
            <p>Source</p>
            <a href="${sourceUrls[0]}">${sourceUrls[0]}</a>
        </div>
        `
        })
    });
});


// console.log(searchWord);https://stackoverflow.com/questions/50417982/js-fetch-api-access-return-value