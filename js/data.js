const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
        bodyPadding = document.getElementById(bodyId);

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("show");
            toggle.classList.toggle("rotate");
            bodyPadding.classList.toggle("expander");
            // console.log(mainPadding);
        });
    }
};
showMenu("nav_toggle", "navbar", "body");

// CRUD - Js

// Reset input
function resetInput() {
    wo: document.getElementById("WO#").value = "";
    番重: document.getElementById("番重").value = "";
}

// CRUD
function validateInput() {
    let formElement = document.querySelector(".form");
    let inputElement = document.querySelectorAll(".form-input");
    let optElement = document.querySelectorAll("option");
    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(
                ".error-message"
            ).innerText = `Please enter ${inputElement[i].id}`;
        } else {
            inputElement[i].parentElement.querySelector(
                ".error-message"
            ).innerText = "";
        }
    }
}

// Add New
function addNew() {
    validateInput();
    let formElement = document.querySelector(".form");
    let errorElement = formElement.querySelectorAll(".error-message");

    let arrErrorElement = [];
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText);
    }
    let checkErrorElement = arrErrorElement.every((value) => value === "");
    if (checkErrorElement) {
        //Save Data
        let wo = document.getElementById("WO#").value;
        let 番重 = document.getElementById("番重").value;
        let メーカー = document.getElementById("メーカー").value;
        let model = document.getElementById("model").value;
        let listData = localStorage.getItem("list-data")
            ? JSON.parse(localStorage.getItem("list-data"))
            : [];
        listData.push({
            wo: wo,
            番重: 番重,
            メーカー: メーカー,
            model: model,
        });
        localStorage.setItem("list-data", JSON.stringify(listData));
        renderData();
        resetInput();
        location.reload();
    }
}

function renderData() {
    let listData = localStorage.getItem("list-data")
        ? JSON.parse(localStorage.getItem("list-data"))
        : [];
    renderPageNumber();
    let dataBase = ` <tr>
                            <th>ID</th>
                            <th>WO#</th>
                            <th>番重</th>
                            <th>メーカー</th>
                            <th>Model</th>
                            <th>Action</th>
                        </tr>`;

    perListData.map((value, index) => {
        dataBase += ` <tr>
                            <td>${index + 1}</td>
                            <td>${value.wo}</td>
                            <td>${value.番重}</td>
                            <td>${value.メーカー}</td>
                            <td>${value.model}</td>
                            <td>
                                <button onclick="editData(${index})">Edit</button>
                                <button onclick="deleteData(${index})">Delete</button>
                            </td>
                        </tr>`;
    });

    document.getElementById("tableContent").innerHTML = dataBase;
}

// Edit Data
function editData(index) {
    let listData = localStorage.getItem("list-data")
        ? JSON.parse(localStorage.getItem("list-data"))
        : [];
    document.getElementById("WO#").value = listData[index].wo;
    document.getElementById("番重").value = listData[index].番重;
    document.getElementById("index").value = index;

    document.getElementById("save").style.display = "none";
    document.getElementById("update").style.display = "inline-block";
}

// Change Data

function changeData() {
    let listData = localStorage.getItem("list-data")
        ? JSON.parse(localStorage.getItem("list-data"))
        : [];

    let index = document.getElementById("index").value;
    listData[index] = {
        wo: document.getElementById("WO#").value,
        番重: document.getElementById("番重").value,
        メーカー: document.getElementById("メーカー").value,
        model: document.getElementById("model").value,
    };
    localStorage.setItem("list-data", JSON.stringify(listData));

    document.getElementById("save").style.display = "inline-block";
    document.getElementById("update").style.display = "none";

    renderData();
    resetInput();
    location.reload();
}

// Delete Data
function deleteData(index) {
    let listData = localStorage.getItem("list-data")
        ? JSON.parse(localStorage.getItem("list-data"))
        : [];
    if (confirm("Are you sure this data?")) {
        listData.splice(index, 1);
    }
    localStorage.setItem("list-data", JSON.stringify(listData));
    renderData();
    location.reload();
}

//  Pagination
let listData = localStorage.getItem("list-data")
    ? JSON.parse(localStorage.getItem("list-data"))
    : [];

let currentPage = 1;
let perPage = 10;
let perListData = [];

function pageNumber() {
    perListData = listData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
}
function handlePageNumber(num) {
    currentPage = num;
    pageNumber();
    renderData();
    // pageItem.classList.add("active");
}
function renderPageNumber() {
    totalPage = Math.ceil(listData.length / perPage);
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = ""; // Clear existing pagination
    for (let i = 1; i <= totalPage; i++) {
        const pageItem = document.createElement("li");
        pageItem.textContent = i;
        pageItem.addEventListener("click", () => handlePageNumber(i));
        paginationElement.appendChild(pageItem);
    }
}

renderPageNumber();
handlePageNumber(totalPage);
