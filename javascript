// Lisää tuotetoiveen käsittely
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

// Lisää varastovastauksen käsittely
document.getElementById("responseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const availability = document.getElementById("availability").value;
    const price = document.getElementById("price").value;
    const deliveryTime = document.getElementById("deliveryTime").value;

    const response = {
        availability,
        price,
        deliveryTime,
        status: "", // Lisää tilan tieto (Tilattu/Saapunut)
        product: document.getElementById("product").value,
        quantity: document.getElementById("quantity").value,
        color: document.getElementById("color").value
    };

    let responses = JSON.parse(localStorage.getItem("responses")) || [];
    responses.push(response);
    localStorage.setItem("responses", JSON.stringify(responses));

    displayResponses();
    document.getElementById("responseForm").reset();
});

// Näytä tuotetoiveet
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

// Näytä varastovastaukset
function displayResponses() {
    const responses = JSON.parse(localStorage.getItem("responses")) || [];
    const responsesBody = document.getElementById("responsesBody");
    responsesBody.innerHTML = ""; // Tyhjennetään taulukko

    responses.forEach((response, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${response.product}</td>
            <td>${response.quantity}</td>
            <td>${response.color}</td>
            <td>${response.availability}</td>
            <td>${response.price}</td>
            <td>${response.deliveryTime}</td>
            <td>
                <label>
                    <input type="radio" name="status${index}" value="Tilattu" ${response.status === "Tilattu" ? "checked" : ""} onclick="setOrderStatus(${index}, 'Tilattu')"> Tilattu
                </label>
                <label>
                    <input type="radio" name="status${index}" value="Saapunut" ${response.status === "Saapunut" ? "checked" : ""} onclick="setOrderStatus(${index}, 'Saapunut')"> Saapunut
                </label>
            </td>
            <td><button onclick="deleteResponse(${index})">Poista</button></td>
        `;
        
        responsesBody.appendChild(row);
    });
}

// Päivitä varastovastauksen tila (Tilattu/Saapunut)
function setOrderStatus(index, status) {
    let responses = JSON.parse(localStorage.getItem("responses")) || [];
    responses[index].status = status;
    localStorage.setItem("responses", JSON.stringify(responses));
    displayResponses(); // Päivitä varastovastaukset
}

// Poista varastovastaus
function deleteResponse(index) {
    let responses = JSON.parse(localStorage.getItem("responses")) || [];
    responses.splice(index, 1);
    localStorage.setItem("responses", JSON.stringify(responses));
    displayResponses(); // Päivitä taulukko
}

window.onload = function() {
    displayRequests();
    displayResponses();
};
