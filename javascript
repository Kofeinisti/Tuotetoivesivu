document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("color").value;

    const productRequest = {
        product,
        quantity,
        color,
        availability: "",  // Varastovastaus
        price: "",         // Varastovastaus
        deliveryTime: "",  // Varastovastaus
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(productRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests();
    document.getElementById("productForm").reset(); // Nollaa lomake
});

// Näytä tuotetoiveet taulukossa
function displayRequests() {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const requestsBody = document.getElementById("requestsBody");
    requestsBody.innerHTML = ""; // Tyhjennetään taulukko

    requests.forEach((request, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${request.product}</td>
            <td>${request.quantity}</td>
            <td>${request.color}</td>
            <td>
                <select onchange="updateResponse(${index}, 'availability', this.value)">
                    <option value="Saatavilla" ${request.availability === "Saatavilla" ? "selected" : ""}>Saatavilla</option>
                    <option value="Ei saatavilla" ${request.availability === "Ei saatavilla" ? "selected" : ""}>Ei saatavilla</option>
                </select>
            </td>
            <td><input type="number" value="${request.price}" onchange="updateResponse(${index}, 'price', this.value)"></td>
            <td><input type="text" value="${request.deliveryTime}" onchange="updateResponse(${index}, 'deliveryTime', this.value)"></td>
            <td><button onclick="moveToResponses(${index})">Lähetä Varastolle</button></td>
            <td><button onclick="deleteRequest(${index})">Poista</button></td>
        `;
        
        requestsBody.appendChild(row);
    });
}

// Päivitä varastovastaukset
function updateResponse(index, field, value) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests[index][field] = value;
    localStorage.setItem("requests", JSON.stringify(requests));
}

// Poista tuotetoive
function deleteRequest(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.splice(index, 1);
    localStorage.setItem("requests", JSON.stringify(requests));
    displayRequests(); // Päivitä taulukko
}

// Siirrä vastaukset varastovastaus-taulukkoon
function moveToResponses(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests[index];
    if (request.availability && request.price && request.deliveryTime) {
        const responses = JSON.parse(localStorage.getItem("responses")) || [];
        responses.push(request);
        localStorage.setItem("responses", JSON.stringify(responses));

        requests.splice(index, 1);
        localStorage.setItem("requests", JSON.stringify(requests));

        displayRequests(); // Päivitä tuotetoiveet
        displayResponses(); // Päivitä varastovastaukset
    } else {
        alert("Täytä kaikki kentät ennen siirtämistä.");
    }
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
            <td><button onclick="setOrderStatus(${index}, 'tilattu')">Tilattu</button></td>
            <td><button onclick="setOrderStatus(${index}, 'saapunut')">Saapunut</button></td>
            <td><button onclick="deleteResponse(${index})">Poista</button></td>
        `;
        
        responsesBody.appendChild(row);
    });
}

// Päivitä tilatut ja saapuneet
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
