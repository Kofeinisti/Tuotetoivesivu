document.getElementById('toiveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tuoteNimi = document.getElementById('tuoteNimi').value;
    const kuvaus = document.getElementById('kuvaus').value;
    
    const toive = {
        tuoteNimi: tuoteNimi,
        kuvaus: kuvaus,
        tila: "Avoin"
    };

    // Tallenna toive JSON-tiedostoon (GitHub Actions voisi olla ratkaisu päivitykseen)
    fetch('toiveet.json')
        .then(response => response.json())
        .then(data => {
            data.push(toive);
            return fetch('toiveet.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            alert("Tuotetoiveesi on lisätty.");
            document.getElementById('toiveForm').reset();
        })
        .catch(error => {
            console.error('Virhe:', error);
        });
});
