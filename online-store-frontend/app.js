const API_URL = "http://localhost:8080/api/products";


function fetchProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("productList");
            productList.innerHTML = "";

            products.forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td><input type="text" value="${product.name}" id="name-${product.id}" class="form-control"></td>
                        <td><input type="number" value="${product.price}" id="price-${product.id}" class="form-control"></td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="updateProduct(${product.id})">Update</button>
                            <button class="btn btn-warning btn-sm" onclick="updatePrice(${product.id})">Përditëso Çmimin</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Fshi</button>
                        </td>
                    </tr>
                `;
                productList.innerHTML += row;
            });
        });
}


function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    }).then(() => {
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        showMessage("Produkti u shtua me sukses!", "success");
        fetchProducts();
    }).catch(() => showMessage("Gabim në shtimin e produktit!", "danger"));
}

function updateProduct(id) {
    const name = document.getElementById(`name-${id}`).value;
    const price = document.getElementById(`price-${id}`).value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    }).then(() => {
        showMessage("Produkti u përditësua me sukses!", "info");
        fetchProducts();
    }).catch(() => showMessage("Gabim në përditësimin e produktit!", "danger"));
}


function updatePrice(id) {
    const price = document.getElementById(`price-${id}`).value;

    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price })
    }).then(() => {
        showMessage("Çmimi i produktit u përditësua!", "warning");
        fetchProducts();
    }).catch(() => showMessage("Gabim në përditësimin e çmimit!", "danger"));
}


function deleteProduct(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
        showMessage("Produkti u fshi me sukses!", "danger");
        fetchProducts();
    }).catch(() => showMessage("Gabim në fshirjen e produktit!", "danger"));
}



function showMessage(message, type = "success") {
    const messageDiv = document.getElementById("message");
    messageDiv.className = `alert alert-${type} text-center`;
    messageDiv.textContent = message;
    messageDiv.classList.remove("d-none");

    
    setTimeout(() => {
        messageDiv.classList.add("d-none");
    }, 3000);
}

fetchProducts();
