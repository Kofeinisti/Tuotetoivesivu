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

// Näytä toiveet ja vastaukset taulukossa
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
            <td><button onclick="saveResponse(${index})">Tallenna vastaus</button></td>
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

// Tallenna varastovastaus
function saveResponse(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests[index];

    if (request.availability && request.price && request.deliveryTime) {
        alert("Vastaus tallennettu onnistuneesti!");
    } else {
        alert("Täytä kaikki kentät ennen tallentamista.");
    }

    localStorage.setItem("requests", JSON.stringify(requests));
    displayRequests(); // Päivitä taulukko
}

window.onload = function() {
    displayRequests();
};
