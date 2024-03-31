// Toggle navbar
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
    renderData2();
    // Lắng nghe sự kiện click cho từng phần tử li trong #pagination
    const clickNumbers = document.querySelectorAll("#pagination li");
    clickNumbers.forEach((clickNumber) => {
        clickNumber.addEventListener("click", handleClickNumber);
    });
    function handleClickNumber(event) {
        event.target.classList.add("active");
        console.log(event.target);
    }
}

function renderPageNumber() {
    totalPage = Math.ceil(listData.length / perPage);
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = ""; // Clear existing pagination
    for (let i = 1; i <= totalPage; i++) {
        let pageItem = document.createElement("li");
        pageItem.textContent = i;
        pageItem.addEventListener("click", () => handlePageNumber(i));
        paginationElement.appendChild(pageItem);
    }
}

function renderData2() {
    renderPageNumber();
    let dataBase = `<tr>
                        <th>ID</th>
                        <th>WO#</th>
                        <th>番重</th>
                        <th>メーカー</th>
                        <th>Model</th>
                        
                    </tr>`;

    perListData.forEach((value, index) => {
        dataBase += `<tr>
                        <td>${index + 1}</td>
                        <td>${value.wo}</td>
                        <td>${value.番重}</td>
                        <td>${value.メーカー}</td>
                        <td>${value.model}</td>
                        
                    </tr>`;
    });

    document.getElementById("tableContentOther").innerHTML = dataBase;
}

handlePageNumber(currentPage);
