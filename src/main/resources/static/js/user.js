async function fetchPrincipal(url) {
    const response = await fetch(url)
    const data = await response.json()
    let email,
        roles = ''

    if (data != null) {
        data.roles.forEach(r => {
            roles += r.authority.substring(5) + ' '
        })
        email = data.email

        let template = ``
        template += `
            <tr id="tr${data.id}">
                <td class="text-wrap">${data.id}</td>
                <td class="text-wrap">${data.firstName}</td>
                <td class="text-wrap">${data.lastName}</td>
                <td class="text-wrap">${email}</td>
                <td class="text-wrap">${roles}</td>
            </tr>`
        document.getElementById('principalBody').innerHTML = template
        document.getElementById('titlePrincipal').innerHTML = `<b> ${email} </b>  with roles:  ${roles}`
    }
}


window.addEventListener('load', function () {
    fetchPrincipal('http://localhost:8080/api/user')
}, false);
