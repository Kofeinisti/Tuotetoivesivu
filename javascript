document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("color").value;

    const productRequest = {
        product,
        quantity,
        color,
        status: "Odottaa vastausta", // Status alkutilassa
        message: "" // Varaston vastaukset lisätään tähän
    };

    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(productRequest);
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests();
    document.getElementById("productForm").reset();
});

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
            <td>${request.status}</td>
            <td>${request.message || "Ei viestejä"}</td>
            <td><button onclick="respondToRequest(${index})">Vastaa</button></td>
        `;
        
        requestsBody.appendChild(row);
    });
}

function respondToRequest(index) {
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests[index];

    // Lisätään viesti ja päivitetään status
    const message = prompt("Lisää viesti varastolle:");
    const status = prompt("Päivitä status (Tilattu / Saapunut / Peruttu):");

    request.message = message || request.message;
    request.status = status || request.status;

    requests[index] = request;
    localStorage.setItem("requests", JSON.stringify(requests));

    displayRequests(); // Päivitetään taulukko
}

window.onload = function() {
    displayRequests();
};
