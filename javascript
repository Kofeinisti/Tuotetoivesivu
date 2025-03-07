document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("color").value;

    const productRequest = {
        product,
        quantity,
        color,
        responses: [] // Ei vastauksia aluksi
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(productRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests(); // Näytä toiveet
    updateProductSelect(); // Päivitä pudotusvalikko varastokäyttäjälle
    document.getElementById("productForm").reset(); // Nollaa lomake
});

document.getElementById("responseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const productSelect = document.getElementById("productSelect").value;
    const availability = document.getElementById("availability").value;
    const price = document.getElementById("price").value;
    const deliveryTime = document.getElementById("deliveryTime").value;

    const response = {
        availability,
        price,
        deliveryTime
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    let productRequest = requests.find(request => request.product === productSelect);

    if (productRequest) {
        productRequest.responses.push(response); // Lisää varastovastaus
        localStorage.setItem("requests", JSON.stringify(requests)); // Tallenna muutokset
        displayRequests(); // Näytä toiveet uudelleen
        displayResponses(productRequest); // Näytä vastaukset oikeassa kohdassa
    }

    document.getElementById("responseForm").reset(); // Nollaa lomake
});

// Näytä toiveet ja niiden vastaukset
function displayRequests() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const requestsDiv = document.getElementById("requests");
    requestsDiv.innerHTML = ""; // Tyhjennetään aiemmat toiveet

    requests.forEach(request => {
        const requestDiv = document.createElement("div");
        requestDiv.innerHTML = `
            <p>Tuote: ${request.product}</p>
            <p>Määrä: ${request.quantity}</p>
            <p>Väri: ${request.color}</p>
            <h3>Varastovastaukset:</h3>
            <div id="responses${request.product}">
                ${request.responses.map(response => `
                    <p>Saatavilla: ${response.availability}</p>
                    <p>Hinta: €${response.price}</p>
                    <p>Toimitusaika: ${response.deliveryTime}</p>
                `).join('')}
            </div>
            <hr>
        `;
        requestsDiv.appendChild(requestDiv);
    });
}

// Päivitä pudotusvalikko
function updateProductSelect() {
    const productSelect = document.getElementById("productSelect");
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    // Tyhjennetään valikko
    productSelect.innerHTML = "";

    requests.forEach(request => {
        const option = document.createElement("option");
        option.value = request.product;
        option.textContent = request.product;
        productSelect.appendChild(option);
    });
}

// Näytä varastokäyttäjän vastaukset
function displayResponses(productRequest) {
    const responsesDiv = document.getElementById(`responses${productRequest.product}`);
    responsesDiv.innerHTML = ""; // Tyhjennetään aiemmat vastaukset
    productRequest.responses.forEach(response => {
        const responseDiv = document.createElement("div");
        responseDiv.innerHTML = `
            <p>Saatavilla: ${response.availability}</p>
            <p>Hinta: €${response.price}</p>
            <p>Toimitusaika: ${response.deliveryTime}</p>
            <hr>
        `;
        responsesDiv.appendChild(responseDiv);
    });
}

window.onload = function() {
    displayRequests();
    updateProductSelect(); // Varmistetaan, että pudotusvalikko on oikein ladattu
};
