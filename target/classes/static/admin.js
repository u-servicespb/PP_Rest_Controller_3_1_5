const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e.target)
        }
    })
}

const urlAdmin = "http://localhost:8080/api/admin/"
currentUser = fetch(urlAdmin).then((response) => response.json())

const urlAllUser = "http://localhost:8080/api/admin/users"

const allUser = fetch(urlAllUser)
    .then((response) => response.json())

allUser.then(listUsers => {
        let result = ''
        for (const i in listUsers) {
            let roles = ''
            listUsers[i].roles.forEach(name => {
                roles += ' '
                roles += name.role.replace("ROLE_", "")
            })
            result += `<tr>
                    <td>${listUsers[i].id}</td>
                    <td>${listUsers[i].username}</td>
                    <td>${listUsers[i].age}</td>
                    <td>${roles}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm text-white" id="editUserBtn">Edit</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm" id="deleteUserBtn">Delete</button>
                    </td>
                    </tr>`
        }
        document.getElementById("users-table").innerHTML = result
    }
)

const urlRole = "http://localhost:8080/api/admin/roles"
const listRoles = fetch(urlRole).then(response => response.json())
const fillRole = function (elementId) {
    listRoles.then(roles => {
        let result = ''
        for (const i in roles) {
            result += `<option value=${roles[i].id}>${roles[i].role.replace("ROLE_", "")}
                       </option>`
        }
        document.getElementById(elementId).innerHTML = result
    })
}

fillRole("role_select")

const urlPost = "http://localhost:8080/api/admin/add"

const newUserForm = document.getElementById("newUserForm")
document.getElementById("newUserForm")
    .addEventListener("submit", (e) => {
        e.preventDefault()
        let nameRole = document.getElementById("role_select")
        let listRoles = []
        let roleValue = ""
        for (let i = 0; i < nameRole.options.length; i++) {
            if (nameRole.options[i].selected) {
                listRoles.push({
                    id: nameRole.options[i].value,
                    role: "ROLE_" + nameRole.options[i].innerHTML
                })
                roleValue += nameRole.options[i].innerHTML + ''
            }
        }
        fetch(urlPost, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("Username").value,
                age: document.getElementById("age").value,
                password: document.getElementById("password").value,
                roles: listRoles
            })
        }).then(() => {
            newUserForm.reset()
        })
        document.getElementById("all-users-tab").click()
    })

pageUser = fetch(urlAdmin).then(response => response.json())
pageUser.then((user) => {
    let rol = "";
    user.roles.forEach((name) => {
        rol += " ";
        rol += name.role.replace("ROLE_", "");
    });

    let result = "";
    result += `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.age}</td>
                    <td>${rol}</td>
                   </tr>`;
    document.getElementById("user-table").innerHTML = result;
})

const urlPATCH = "http://localhost:8080/api/admin/update"

const editUserModel = new bootstrap.Modal(document.getElementById("editUserModal"))

const editId = document.getElementById("id_edit")
const editUsername = document.getElementById("Username_edit")
const editage = document.getElementById("age_edit")
const editPassword = document.getElementById("password_edit")
const editRole = document.getElementById("role_edit")

const formEdit = document.getElementById("edit_user_form")

on(document, 'click', '#editUserBtn', e => {
    const fila = e.parentNode.parentNode
    let option = ''
    editId.value = fila.children[0].innerHTML
    editUsername.value = fila.children[1].innerHTML
    editage.value = fila.children[2].innerHTML
    editPassword.value = fila.children[3].innerHTML
    listRoles.then(rolList => {
        rolList.forEach(name => {
            let selected = fila.children[4].innerHTML.includes(name.role.replace('ROLE_', '')) ? 'selected' : ''
            option += `
                <option value="${name.id}" ${selected}>${name.role.replace('ROLE_', '')}</option>`

        })
        editRole.innerHTML = option
    })
    editUserModel.show()
})

formEdit.addEventListener('submit', e => {
    e.preventDefault()
    let nameRoleEdit = document.getElementById("role_edit")
    let listRoleEdit = []
    let roleValueEdit = ''

    for (let i = 0; i < nameRoleEdit.options.length; i++) {
        if (nameRoleEdit.options[i].selected) {
            listRoleEdit.push({id: nameRoleEdit.options[i].value, role: 'ROLE_' + nameRoleEdit.options[i].innerHTML})
            roleValueEdit += nameRoleEdit.options[i].innerHTML + ' '
        }
    }

    fetch(urlPATCH, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editId.value,
            username: editUsername.value,
            age: editage.value,
            password: editPassword.value,
            roles: listRoleEdit
        })
    })
    editUserModel.hide()
})

const urlDelete = "http://localhost:8080/api/admin/delete/"

const deleteModalBtn = new bootstrap.Modal(document.getElementById("deleteUserModal"))

let rowDelete = null
on(document, 'click', '#deleteUserBtn', e => {
    rowDelete = e.parentNode.parentNode
    document.getElementById('id_delete').value = rowDelete.children[0].innerHTML
    document.getElementById('Username_delete').value = rowDelete.children[1].innerHTML
    document.getElementById('age_delete').value = rowDelete.children[2].innerHTML

    let option = ''
    listRoles.then(roles => {
        roles.forEach(role => {
            if (rowDelete.children[3].innerHTML.includes(role.role.replace('ROLE_', ''))) {
                option += `<option value="${role.id}">${role.role.replace('ROLE_', '')}</option>`
            }
        })
        document.getElementById('role_delete').innerHTML = option
    })
    deleteModalBtn.show()
})

document.getElementById('delete_user_form').addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(urlDelete + rowDelete.children[0].innerHTML, {
        method: 'DELETE'
    }).then(() => {
        deleteModalBtn.hide()
        rowDelete.parentNode.removeChild(rowDelete)
    })
})