document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("color").value;

    const productRequest = {
        product,
        quantity,
        color
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(productRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests();
    document.getElementById("productForm").reset();
});

document.getElementById("responseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const availability = document.getElementById("availability").value;
    const price = document.getElementById("price").value;
    const deliveryTime = document.getElementById("deliveryTime").value;

    const response = {
        availability,
        price,
        deliveryTime
    };

    let responses = JSON.parse(localStorage.getItem("responses")) || [];
    responses.push(response);
    localStorage.setItem("responses", JSON.stringify(responses));

    displayResponses();
    document.getElementById("responseForm").reset();
});

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
            <hr>
        `;
        requestsDiv.appendChild(requestDiv);
    });
}

function displayResponses() {
    const responses = JSON.parse(localStorage.getItem("responses")) || [];
    const responsesDiv = document.getElementById("requests");
    responsesDiv.innerHTML = "";
    responses.forEach(response => {
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
    displayResponses();
};
