// function thu vien
// get danh sach nguoi dung
function getUserList() {
    let userList = JSON.parse(localStorage.getItem("listUser"));
    if (!userList) {
        return []
    }
    return userList
}
// hien thi active
function getTextIsActive(isActive) {
    if (isActive) {
        return "Hoat dong"
    }
    return "Bi khoa"
}

// hien thi active
function getClassIsActive(isActive) {
    if (isActive) {
        return "active"
    }
    return "block"
}

// hien thi chuc vu
function getTextIsAdmin(isAdmin) {
    if (isAdmin) {
        return "Quan tri vien"
    }
    return "Thanh vien"
}


// lay thong tin nguoi dung theo id
function getInforUser(userId) {
    let userList = JSON.parse(localStorage.getItem("listUser"));
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            return userList[i];
        }
    }
    return false
}

// kiem tra nguoi dung da dang nhap hay chua vac¥. co phai la admn¥in hay khong
function checkLogion() {
    if (!localStorage.getItem("checkLogin")) {
        window.location.href = "login.html"
        return
    }
    let userInfor = getInforUser(localStorage.getItem("checkLogin"));
    if (userInfor) {
        if (!userInfor.isAdmin) {
            window.location.href = "login.html"
        }
    } else {
        window.location.href = "login.html"
    }
}

// goi
checkLogion()


// hien thi nguoi dung
function showUserListToUi() {
    const table = document.getElementById("tableUser");
    let tableContent = `
        <tr>
            <th class="tabe--title">STT</th>
            <th class="tabe--title">User Id</th>
            <th class="tabe--title">User Email</th>
            <th class="tabe--title">Trang Thai</th>
            <th class="tabe--title">Chuc vu</th>
            <th class="tabe--title">Tools</th>
        </tr>
    `;
    let i = 1;
    for (user of getUserList()) {
        tableContent += `
                <td class="tabe--content">${i}</td>
                <td class="tabe--content">${user.idUser}</td>
                <td class="tabe--content">${user.email}</td>
                <td class="tabe--content status ${getClassIsActive(user.isActive)}">${getTextIsActive(user.isActive)}</td>
                <td class="tabe--content">${getTextIsAdmin(user.isAdmin)}</td>
                <td class="tabe--content">
                    <span onclick="deleteUser(${user.idUser})" class="btn material-symbols-outlined">delete</span>
                    <span onclick="controlStatusBlockUser(${user.idUser})"class="btn ${getClassIsActive(user.isActive)} material-symbols-outlined">block</span>
                </td>
            </tr>
        `
    }
    table.innerHTML = tableContent;
}
showUserListToUi()

// delete user

function deleteUser(userId) {
    let userList = getUserList();
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            userList.splice(i, 1);
            localStorage.setItem("listUser", JSON.stringify(userList)) // save to local
            showUserListToUi();
            return true
        }
    }
    return false
}

function controlStatusBlockUser(userId) {
    let userList = getUserList();
    for (let i in userList) {
        if (userList[i].idUser == userId) {
            userList[i].isActive = !userList[i].isActive;
            localStorage.setItem("listUser", JSON.stringify(userList)) // save to local
            showUserListToUi();
            return true
        }
    }
    return false
}
function getBookList() {
    let bookList = JSON.parse(localStorage.getItem("listBooks"));
    if (!bookList) {
        return []
    }
    return bookList
}
function addBookToList(book) {
    let bookList = getBookList();
    bookList.push(book);
    localStorage.setItem("listBooks", JSON.stringify(bookList));
}
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function showBookListToUi() {
    let table1 = document.getElementById("tableBook");
    let tableContent = "";
    let bookList = getBookList();
        tableBook += `
        <tr>
        <th class="tabe-book">ten san pham:</th>
        <th class="tabe-book">gia</th>
        <th class="tabe-book"anh</th>
        <th class="tabe-book">the loai</th>
        <th class="tabe-book">Tools</th>
        </tr>
        `;
        for (book of getBookList()) {
            tableBook += `
        <tr>
        <td class="tabe-book">${book.name}</td>
        <td class="tabe-book">${VND.format(book.price)}</td>
        <td class="tabe-book">${book.src}</td>
        <td class="tabe-book">${book.type}</td>
        <td class="tabe-book">
        <button class="btn-edit-book" onclick="editBook(${book.id})">Edit</button>
        <button class="btn-delete-book" onclick="deleteBook(${book.id})">Delete</button>  
        </td>
        </tr>
        `
        }
        table1.innerHTML = tableBook;
}
showBookListToUi();

function editBook(id) {
    let book = getBookById(id);
    let form= document.getElementById("form-edit-book");
    form.id.value = book.id;
    form.name.value = book.name;
    form.price.value = book.price;
    form.type.value=book.type;

}

        




      


           