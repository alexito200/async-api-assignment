const publicKey = 'a44c379606a95921e3f0abef512638a9'; 
const privateKey = 'b2fa05ce833481c232e9ccfba9edbd4a4f35dcb7'; 

function getCharacters() {
const ts = Date.now(); 
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); 

const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=Sp&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

console.log(ts);

return fetch(url)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    return data.data.results; 
    });
}

function displayCharacters(characters) {
const characterList = document.getElementById('characterList'); 
characterList.innerHTML = ''; 

characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character-card'); 

    const characterName = document.createElement('h3');
    characterName.textContent = character.name;

    const characterImage = document.createElement('img');
    characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    characterImage.alt = character.name;

    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterImage);

    characterList.appendChild(characterDiv);
});
}

getCharacters()
.then(characters => {
    displayCharacters(characters); 
})
.catch(error => {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = `<p>Error fetching characters: ${error.message}</p>`;
});

