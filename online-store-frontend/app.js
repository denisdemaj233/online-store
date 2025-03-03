const API_URL = "http://localhost:8080/api/products";

function showMessage(message, type = "success") {
    const messageDiv = document.getElementById("message");
    messageDiv.className = `alert alert-${type} text-center`;
    messageDiv.textContent = message;
    messageDiv.classList.remove("d-none");
    setTimeout(() => messageDiv.classList.add("d-none"), 3000);
}

function fetchProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(products => {
            let productListHTML = "";
            products.forEach(product => {
                productListHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price} €</td>
                        <td>${product.description}</td>
                        <td>
                            <img src="images/${product.imagePath}" width="50" ">
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="showUpdateModal(${product.id}, '${product.name}', ${product.price}, '${product.description}', '${product.imagePath}')">Përditëso</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Fshi</button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById("productList").innerHTML = productListHTML;
        })
        .catch(error => console.error("Gabim gjatë marrjes së produkteve:", error));
}

function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !description || !imageFile) {
        showMessage("Ju lutem plotësoni të gjitha fushat!", "danger");
        return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);

    fetch("http://localhost:8080/api/products/upload", { 
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(imagePath => {
     
        const product = {
            name,
            price,
            description,
            imagePath: "/images" + imagePath 
        };

        return fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    })
    .then(response => response.json())
    .then(() => {
        showMessage("Produkti u shtua me sukses!", "success");
        fetchProducts();
    })
    .catch(error => console.error("Gabim:", error));
}




function showUpdateModal(id, name, price, description, imagePath) {
    document.getElementById("updateProductId").value = id;
    document.getElementById("updateProductName").value = name;
    document.getElementById("updateProductPrice").value = price;
    document.getElementById("updateProductDescription").value = description;
    document.getElementById("updateProductImage").value = imagePath;
    new bootstrap.Modal(document.getElementById("updateModal")).show();
}

function updateProduct() {
    const id = document.getElementById("updateProductId").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("updateProductName").value,
            price: document.getElementById("updateProductPrice").value,
            description: document.getElementById("updateProductDescription").value,
            imagePath: document.getElementById("updateProductImage").value
        })
    }).then(() => {
        showMessage("Produkti u përditësua!", "info");
        fetchProducts();
        new bootstrap.Modal(document.getElementById("updateModal")).hide();
    });
}


function updatePrice(id, newPrice) {
    fetch(`${API_URL}/${id}/price`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice })
    }).then(() => {
        showMessage("Çmimi u përditësua!", "info");
        fetchProducts();
    });
}

fetchProducts();
