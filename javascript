// Tuotetoiveiden ja varastovastausten hallinta
document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("color").value;

    const productRequest = {
        product,
        quantity,
        color,
        responses: [] // Aluksi ei ole vastauksia
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(productRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests();
    document.getElementById("productForm").reset();
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
        productRequest.responses.push(response); // Lisää vastaus oikeaan toiveeseen
        localStorage.setItem("requests", JSON.stringify(requests)); // Tallenna muutokset
        displayRequests();
        displayResponses(productRequest); // Näytä päivitykset
    }

    document.getElementById("responseForm").reset();
});

// Näytä kaikki toiveet ja niiden vastaukset
function displayRequests() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const requestsDiv = document.getElementById("requests");
    requestsDiv.innerHTML = "";
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

        // Täytä valinta varastokäyttäjälle
        const productSelect = document.getElementById("productSelect");
        const option = document.createElement("option");
        option.value = request.product;
        option.textContent = request.product;
        productSelect.appendChild(option);
    });
}

function displayResponses(productRequest) {
    const responsesDiv = document.getElementById(`responses${productRequest.product}`);
    responsesDiv.innerHTML = "";
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

// Lataa tiedot, kun sivu latautuu
window.onload = function() {
    displayRequests();
};
