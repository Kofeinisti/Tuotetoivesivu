// // Toivomuslomake
// document.getElementById("productForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const product = document.getElementById("product").value;
//     const quantity = document.getElementById("quantity").value;
//     const color = document.getElementById("color").value;

//     const productRequest = {
//         product,
//         quantity,
//         color,
//         status: "Odottaa vastausta", // Aloitusstatus
//         messages: [] // Viestit
//     };

//     let requests = JSON.parse(localStorage.getItem("requests")) || [];
//     requests.push(productRequest);
//     localStorage.setItem("requests", JSON.stringify(requests));

//     displayRequests();
//     document.getElementById("productForm").reset();
// });

// // Näytetään toiveet ja varaston vastaukset
// function displayRequests() {
//     const requests = JSON.parse(localStorage.getItem("requests")) || [];
//     const requestsBody = document.getElementById("requestsBody");
//     requestsBody.innerHTML = ""; // Tyhjennetään taulukko

//     requests.forEach((request, index) => {
//         const row = document.createElement("tr");

//         // Viestit ja tilat näkyvät käyttäjälle
//         row.innerHTML = `
//             <td>${request.product}</td>
//             <td>${request.quantity}</td>
//             <td>${request.color}</td>
//             <td>${request.status}</td>
//             <td>${request.messages.join('<br>')}</td>
//             <td><button onclick="respondToRequest(${index})">Vastaa</button></td>
//         `;
        
//         requestsBody.appendChild(row);
//     });
// }

// // Varaston vastaus toiveeseen
// function respondToRequest(index) {
//     let requests = JSON.parse(localStorage.getItem("requests")) || [];
//     const request = requests[index];

//     // Varasto päivittää status
//     const status = prompt("Päivitä status (Tilattu / Saapunut / Peruttu):");
//     const message = prompt("Lisää viesti varastolle:");

//     // Lisätään uusi viesti ja päivitetään status
//     request.status = status || request.status;
//     request.messages.push(`Varaston viesti: ${message}`);

//     requests[index] = request;
//     localStorage.setItem("requests", JSON.stringify(requests));

//     displayRequests(); // Päivitetään taulukko
// }

// window.onload = function() {
//     displayRequests(); // Näytetään kaikki toiveet ja varaston vastaukset
// };
