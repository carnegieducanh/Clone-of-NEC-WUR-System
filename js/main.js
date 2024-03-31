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

// Modal function
const btnSub = document.querySelector(".btn-sub");
const btnFail = document.querySelector(".btn-fail");

const template = `<div class="modal">
<div class="modal-overlay"></div>
<div class="modal-content">
    <h2 class="modal-title">インフォメーション</h2>
    <p class="modal-main">
        提出しますか？<br />
        次のステーションを選択してください！
    </p>
    <div class="choice-plz">
        <span>Next Station</span>
        <span>Final Test</span>
    </div>
    <div class="btn-choice">
        <button class="btn btn-fail btn-close">
            <ion-icon name="close-circle"></ion-icon>
            <span >キャンセル</span>
        </button>
        <button class="btn btn-sub btn-ok" onclick="submitOk()">
            <ion-icon name="checkmark-circle"></ion-icon>
            <span >提出する</span>
        </button>
    </div>
</div>
</div>`;

btnSub.addEventListener("click", handleButton);
function handleButton() {
    document.body.insertAdjacentHTML("beforeend", template);
    document.body.addEventListener("click", function (event) {
        const modal = event.target.closest(".modal");
        if (modal) {
            if (event.target.matches(".btn-close")) {
                modal.remove();
            }
        }
    });
}

// Submit for FT
const templateSubmitFT = `<div class="modal">
<div class="modal-overlay"></div>
<div class="modal-content modal-submit">
    <h2 class="modal-title">インフォメーション</h2>
    <p class="modal-main">
        提出成功しました。<br />
        次のステーションはFinal Test です！
    </p>
</div>
</div>`;

function handleBtnSubFT() {
    // Hiển thị templateSubmit
    document.body.insertAdjacentHTML("beforeend", templateSubmitFT);
    // Tự động xóa templateSubmit sau 2 giây
    removeTemplateSubmit();

    setTimeout(function () {
        removeTemplateSubmit();
    }, 2000);
}

// Submit for FA
const templateOther = `  <div class="modal">
<div class="modal-overlay"></div>
<div class="modal-content">
    <h2 class="modal-title">インフォメーション</h2>
    <p class="modal-main">
        提出しますか？<br />
        次のステーションを選択してください！
    </p>
    <div class="choice-plz">
        <span>Next Station</span>
        <span>FA</span>
    </div>
    <div class="btn-choice">
        <button class="btn btn-fail btn-close">
            <ion-icon name="close-circle"></ion-icon>
            <span>キャンセル</span>
        </button>
        <button class="btn btn-sub btn-ok" onclick="submitFAOk()">
            <ion-icon name="checkmark-circle"></ion-icon>
            <span>提出する</span>
        </button>
    </div>
</div>
</div>`;

btnFail.addEventListener("click", handleButtonOther);
function handleButtonOther() {
    document.body.insertAdjacentHTML("beforeend", templateOther);
    document.body.addEventListener("click", function (event) {
        // console.log(event.target); // In ra giá trị của event.target để kiểm tra
        const modal = event.target.closest(".modal");
        if (modal) {
            if (event.target.matches(".btn-close")) {
                modal.remove();
            }
        }
    });
}

const templateSubmitFA = `<div class="modal">
<div class="modal-overlay"></div>
<div class="modal-content modal-submit">
    <h2 class="modal-title">インフォメーション</h2>
    <p class="modal-main">
        提出成功しました。<br />
        次のステーションは FA です！
    </p>
</div>
</div>`;

function handleBtnSubFA() {
    // Hiển thị templateSubmit
    document.body.insertAdjacentHTML("beforeend", templateSubmitFA);
    // Tự động xóa templateSubmit sau 2 giây
    removeTemplateSubmit();
    setTimeout(function () {
        removeTemplateSubmit();
    }, 2000);
}

function submitFAOk() {
    handleBtnSubFA();
}

function removeTemplateSubmit() {
    // Lưu trữ tham chiếu đến modalElement để sau này có thể xóa nó
    let modalElement = document.querySelector(".modal");
    // Kiểm tra xem modalElement có tồn tại không trước khi thực hiện xóa
    if (modalElement) {
        modalElement.parentNode.removeChild(modalElement);
        modalElement = null; // Đặt lại giá trị thành null để tránh sử dụng sai lầm
    }
}

// ====== GET DATA ASSEMBLY =====
let listData = localStorage.getItem("list-data")
    ? JSON.parse(localStorage.getItem("list-data"))
    : [];

// Search Item
function renderData(array) {
    let dataBase = ` <tr>

                            <th>WO#</th>
                            <th>番重</th>
                            <th>メーカー</th>
                            <th>Model</th>

                        </tr>`;

    array.map((value, index) => {
        dataBase += ` <tr>
                            
                            <td>${value.wo}</td>
                            <td>${value.番重}</td>
                            <td>${value.メーカー}</td>
                            <td>${value.model}</td>

                        </tr>`;
    });

    document.getElementById("tableContent").innerHTML = dataBase;
}

// Check Search Item
function searchItem() {
    let valueSearchInput = document.getElementById("search").value;
    let errorElement = document
        .getElementById("search")
        .parentElement.querySelector(".error-message");

    if (valueSearchInput === "") {
        errorElement.innerText = "Please enter a search value.";
    } else {
        let dataSearch = listData.filter((value) => {
            return value.wo.includes(valueSearchInput);
        });

        if (dataSearch.length === 0) {
            errorElement.innerText = "No results found.";
        } else {
            renderData(dataSearch);
            errorElement.innerText = ""; // Đặt lại thông báo lỗi nếu có
        }
    }
}

// Reset Search
function resetSearch() {
    document.getElementById("search").value = "";
    let resetDataAssembly = ` <tr>
    <th>WO#</th>
    <th>番重</th>
    <th>メーカー</th>
    <th>Model</th>
    <th>Action</th>
</tr>`;
    document.getElementById("tableContent").innerHTML = resetDataAssembly;
}

// Total quantity of Assembly
function renderAssemblyTotal(
    totalQuantity,
    countD300,
    count300E,
    countLenovo,
    countOthers
) {
    let totalQuantityAssembly = ` <tr>
                            <th>Total</th>
                            <th>D330</th>
                            <th>300E</th>
                            <th>Lenovo</th>
                            <th>Others</th>
                        </tr>`;

    totalQuantityAssembly += ` <tr>
                        <td>${totalQuantity}</td>
                        <td>${countD300}</td>
                        <td>${count300E}</td>
                        <td>${countLenovo}</td>
                        <td>${countOthers}</td>
                </tr>`;

    document.getElementById("quantity").innerHTML = totalQuantityAssembly;
}

// Total of each model
function updateAssemblyTotal() {
    let dataAssembly = localStorage.getItem("list-assembly")
        ? JSON.parse(localStorage.getItem("list-assembly"))
        : [];

    let totalQuantity = dataAssembly.length;

    let countD300 = dataAssembly.reduce(function (count, item) {
        // Kiểm tra xem model của mỗi phần tử có phải là "D300" không
        if (item.model === "D330") {
            count++;
        }
        return count;
    }, 0);
    let count300E = dataAssembly.reduce(function (count, item) {
        // Kiểm tra xem model của mỗi phần tử có phải là "300E" không
        if (item.model === "300E") {
            count++;
        }
        return count;
    }, 0);
    let countLenovo = dataAssembly.reduce(function (count, item) {
        // Kiểm tra xem model của mỗi phần tử có phải là "Lenovo" không
        if (item.model === "Lenovo") {
            count++;
        }
        return count;
    }, 0);
    let countOthers = dataAssembly.reduce(function (count, item) {
        // Kiểm tra xem model của mỗi phần tử có phải là "Others" không
        if (item.model === "Others") {
            count++;
        }
        return count;
    }, 0);

    renderAssemblyTotal(
        totalQuantity,
        countD300,
        count300E,
        countLenovo,
        countOthers
    );
}
updateAssemblyTotal();

// Chart
function renderAssembly() {
    let dataAssembly = localStorage.getItem("list-assembly")
        ? JSON.parse(localStorage.getItem("list-assembly"))
        : [];

    let dataListAssembly = ` <tr>
                                <th>ID</th>
                                <th>WO#</th>
                                <th>番重</th>
                                <th>メーカー</th>
                                <th>Model</th>
                                <th>Action</th>
    </tr>`;

    dataAssembly.map((value, index) => {
        dataListAssembly += ` <tr>
                                <td>${index + 1}</td>
                                <td>${value.wo}</td>
                                <td>${value.番重}</td>
                                <td>${value.メーカー}</td>
                                <td>${value.model}</td>
                                <td>
            <button onclick="deleteDataAssembly(${index})">Delete</button>
        </td>

    </tr>`;
    });

    document.getElementById("tableAssembly").innerHTML = dataListAssembly;
    countModels(dataAssembly);
}

function submitOk() {
    let listData = localStorage.getItem("list-data")
        ? JSON.parse(localStorage.getItem("list-data"))
        : [];

    let valueSearchInput = document.getElementById("search").value;
    // Kiểm tra nếu không có giá trị trong ô tìm kiếm
    if (!valueSearchInput) {
        searchItem();
        removeTemplateSubmit();
        return;
    }
    let dataSearch = listData.filter((value) => {
        return value.wo.includes(valueSearchInput);
    });

    let dataAssembly = localStorage.getItem("list-assembly")
        ? JSON.parse(localStorage.getItem("list-assembly"))
        : [];

    // Thêm các phần tử của dataSearch vào dataAssembly, không phải thêm dataSearch vào dataAssembly
    dataAssembly.push(...dataSearch);

    localStorage.setItem("list-assembly", JSON.stringify(dataAssembly));
    resetSearch();
    renderAssembly();
    handleBtnSubFT();
    renderAssemblyTotal(dataAssembly);
    updateAssemblyTotal();
    location.reload();
}

// Total models
function countModels(array) {
    return array.reduce((acc, item) => {
        const model = item.model;
        acc[model] = (acc[model] || 0) + 1;
        return acc;
    }, {});
}
// Mảng dữ liệu đưa vào Chart
let dataAssembly = localStorage.getItem("list-assembly")
    ? JSON.parse(localStorage.getItem("list-assembly"))
    : [];

const modelCounts = countModels(dataAssembly);

const modelQuantities = Object.values(modelCounts);

console.log("Số lượng của từng model:", modelQuantities);

// Delete Data Assembly
function deleteDataAssembly(index) {
    let dataAssembly = localStorage.getItem("list-assembly")
        ? JSON.parse(localStorage.getItem("list-assembly"))
        : [];
    if (confirm("Are you sure this data?")) {
        dataAssembly.splice(index, 1);
    }
    localStorage.setItem("list-assembly", JSON.stringify(dataAssembly));
    renderAssembly();
    location.reload();
}
