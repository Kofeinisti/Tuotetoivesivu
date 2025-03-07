document.getElementById('toiveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tuoteNimi = document.getElementById('tuoteNimi').value;
    const kuvaus = document.getElementById('kuvaus').value;
    
    const toive = {
        tuoteNimi: tuoteNimi,
        kuvaus: kuvaus,
        tila: "Avoin"
    };

    // Tallenna tuotetoive localStorageen
    const toiveet = JSON.parse(localStorage.getItem('toiveet')) || [];
    toiveet.push(toive);
    localStorage.setItem('toiveet', JSON.stringify(toiveet));

    naytaToiveet();
    document.getElementById('toiveForm').reset();
});

// Välilehtien käsittely
function avaaVälilehti(nimi) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(nimi).style.display = 'block';
}

// Näytä tuotetoiveet
function naytaToiveet() {
    const list = document.getElementById('toiveList');
    list.innerHTML = '';

    const toiveet = JSON.parse(localStorage.getItem('toiveet')) || [];
    toiveet.forEach((toive, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${toive.tuoteNimi} - ${toive.kuvaus} 
            <button onclick="tilaaTuote(${index})">Tilaa</button>`;
        list.appendChild(listItem);
    });
}

// Siirrä tuote "Tilatut tuotteet" -listaan
function tilaaTuote(index) {
    const toiveet = JSON.parse(localStorage.getItem('toiveet')) || [];
    const tilatut = JSON.parse(localStorage.getItem('tilatut')) || [];

    const tuote = toiveet.splice(index, 1)[0]; // Poistetaan toiveista
    tilatut.push(tuote); // Lisätään tilattuihin
    localStorage.setItem('toiveet', JSON.stringify(toiveet));
    localStorage.setItem('tilatut', JSON.stringify(tilatut));

    naytaToiveet();
    naytaTilatut();
}

// Näytä tilatut tuotteet
function naytaTilatut() {
    const list = document.getElementById('tilatutList');
    list.innerHTML = '';

    const tilatut = JSON.parse(localStorage.getItem('tilatut')) || [];
    tilatut.forEach((tuote, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${tuote.tuoteNimi} - ${tuote.kuvaus} 
            <button onclick="merkitseSaapuneeksi(${index})">Merkitse saapuneeksi</button>`;
        list.appendChild(listItem);
    });
}

// Siirrä tuote "Saapuneet tuotteet" -listaan
function merkitseSaapuneeksi(index) {
    const tilatut = JSON.parse(localStorage.getItem('tilatut')) || [];
    const saapuneet = JSON.parse(localStorage.getItem('saapuneet')) || [];

    const tuote = tilatut.splice(index, 1)[0]; // Poistetaan tilatuista
    saapuneet.push(tuote); // Lisätään saapuneisiin
    localStorage.setItem('tilatut', JSON.stringify(tilatut));
    localStorage.setItem('saapuneet', JSON.stringify(saapuneet));

    naytaTilatut();
    naytaSaapuneet();
}

// Näytä saapuneet tuotteet
function naytaSaapuneet() {
    const list = document.getElementById('saapuneetList');
    list.innerHTML = '';

    const saapuneet = JSON.parse(localStorage.getItem('saapuneet')) || [];
    saapuneet.forEach(tuote => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${tuote.tuoteNimi} - ${tuote.kuvaus} (Saapunut)`;
        list.appendChild(listItem);
    });
}

// Lataa tallennetut tiedot sivun avautuessa
naytaToiveet();
naytaTilatut();
naytaSaapuneet();
