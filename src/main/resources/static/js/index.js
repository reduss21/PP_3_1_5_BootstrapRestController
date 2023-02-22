//-------------------------------------------------------------------------------------------
//------------------------------------ Global section  --------------------------------------
//-------------------------------------------------------------------------------------------
let roles = []
const basicUrl = 'http://localhost:8080/api/users/'

// add function (?) for handling toggle logic and fill it with some logic from addNewUser and another functions

// void
async function fetchAllUsers(url) {
    const response = await fetch(url)
    const data = await response.json()
    if (data.length > 0) {
        let template = ``
        data.forEach(u => {
            let roles = ''
            u.roles.forEach(r => {
                roles += r.authority.substring(5) + ' '
            })

            template += `
                <tr id="tr${u.id}">
                    <td class="text-wrap">${u.id}</td>
                    <td class="text-wrap">${u.firstName}</td>
                    <td class="text-wrap">${u.lastName}</td>
                    <td class="text-wrap">${u.email}</td>
                    <td class="text-wrap">${roles}</td>
                    <td class="text-wrap">
                        <button type="button" class="btn btn-sm btn-info" onclick="openEditModal(${u.id})">
                        Edit</button></td>
                    <td class="text-wrap">
                        <button type="button" class="btn btn-sm btn-danger" onclick="openDeleteModal(${u.id})">
                        Delete</button></td>
                </tr>`
        })
        document.getElementById('tbody').innerHTML = template
        console.log(data)
        console.log('Table fetched!')
    }
}

// void
function fillTheRolesList(rolesArray, htmlElementId) {
    let rolesAsOptionsList = ''
    rolesArray.forEach((elem) => {
        rolesAsOptionsList += `<option id="${elem.id}">${elem.authority.substring(5)}</option>`
    })
    document.getElementById(htmlElementId).innerHTML = rolesAsOptionsList
}

async function fetchRoles(url) {
    const response = await fetch(url)
    const data = await response.json()
    let allRoles = []

    if (data.length > 0) {
        data.forEach(r => {
            allRoles.push(r)
        })
    }

    roles = allRoles
    fillTheRolesList(roles, 'onNewRoles')
}

function openEditModal(idToEdit) {
    fetch('/api/users/' + idToEdit)
        .then(result => result.json())
        .then(user => {
            document.getElementById("onEditId").value = idToEdit
            document.getElementById("onEditFirstName").value = user.firstName
            document.getElementById("onEditLastName").value = user.lastName
            document.getElementById("onEditEmail").value = user.email
            document.getElementById("onEditPassword").value = ''
            // document.getElementById("submitEditBtn").setAttribute('onclick', `submitEdit(${idToEdit})`)

            fillTheRolesList(roles, 'onEditRoles')
            document.getElementById('onEditRoles').value = user.roles
        })
        .then($('#modalEdit').modal('show'))
}

// void
function openDeleteModal(idToDelete) {
    fetch('/api/users/' + idToDelete)
        .then(result => result.json())
        .then(user => {
            document.getElementById("onDeleteId").value = idToDelete
            document.getElementById("onDeleteFirstName").value = user.firstName
            document.getElementById("onDeleteLastName").value = user.lastName
            document.getElementById("onDeleteEmail").value = user.email
            document.getElementById("onEditPassword").value = ''
            fillTheRolesList(user.roles, 'onDeleteRoles')
            document.getElementById("submitDeleteBtn").setAttribute('onclick', `submitDelete(${idToDelete})`)
        })
        .then($('#modalDelete').modal('show'))
}

// void (basicUrl!)
function submitDelete(id) {
    fetch(basicUrl + id, {method: 'DELETE'})
        .then(() => $('#tr' + id).remove())
        .then($('#modalDelete').modal('hide'))
}

// void (basicUrl!)
function submitEdit() {
    let rolesSelectedInList = []
    for (let option of document.getElementById('onEditRoles').options) {
        if (option.selected) {
            rolesSelectedInList.push({
                id: option.id,
                authority: option.value
            })
        }
    }

    const id = document.getElementById("onEditId").value
    const user = {
        id: id,
        firstName: document.getElementById("onEditFirstName").value,
        lastName: document.getElementById("onEditLastName").value,
        email: document.getElementById("onEditEmail").value,
        password: document.getElementById("onEditPassword").value,
        roles: rolesSelectedInList
    }

    fetch(basicUrl + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(() => refreshMainInfo(basicUrl))
        // .then($('#modalEdit').modal('hide'))
        .then(() => {
            resetEditModal()
        })
}

// void (basicUrl!)
function addNewUser() {
    let rolesSelectedInList = []
    for (let option of document.getElementById('onNewRoles').options) {
        if (option.selected) {
            rolesSelectedInList.push({
                id: option.id,
                authority: option.value
            })
        }
    }

    const newUser = {
        firstName: document.getElementById("onNewFirstName").value,
        lastName: document.getElementById("onNewLastName").value,
        email: document.getElementById("onNewEmail").value,
        password: document.getElementById("onNewPassword").value,
        roles: rolesSelectedInList
    }

    fetch(basicUrl, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newUser)
    })
        .then(() => {
            document.newUserForm.classList.remove('was-validated')
            document.newUserForm.classList.add('needs-validation')
            document.newUserForm.reset()
        })
        .then(() => {
            refreshMainInfo(basicUrl)
            $("#users-table").trigger("click");
        })
}

// void
async function refreshMainInfo(baseUrl) {
    await fetchAllUsers(baseUrl)
}

function resetEditModal() {
    $('#modalEdit').modal('hide')
    if (document.editUserForm.classList.contains('was-validated')) {
        document.editUserForm.classList.remove('was-validated')
        document.editUserForm.classList.add('needs-validation')
    }
    document.editUserForm.reset()
}

//-------------------------------------------------------------------------------------------
//-------------------------------------- Main section  --------------------------------------
//-------------------------------------------------------------------------------------------

$(document).ready(function () {
    fetchRoles('http://localhost:8080/api/roles')
        .then(() => fetchPrincipal('http://localhost:8080/api/user'))
        .then(() => refreshMainInfo(basicUrl))
})


// forms validation handler
{
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (form.checkValidity() === false) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    switch (form.name) {
                        case 'editUserForm':
                            submitEdit();
                            break;
                        case 'newUserForm':
                            addNewUser();
                            break;
                    }

                }

            }, false);
        });
    }, false);
}





