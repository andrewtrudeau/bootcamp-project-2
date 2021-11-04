var users = document.getElementsByClassName("comment-user");
const artID = document.querySelector('#artID').value.trim();
const sessId = document.querySelector('#sessId').value.trim();

for (let i = 0; i < users.length; i++) {

    fetch('/api/users/' + users[i].innerHTML)
        .then(response => response.json())
        .then(data => {
            users[i].innerHTML = "<h2>" + data + "</h2>";
        });

}

document.querySelectorAll('.delete').forEach(element => {
    element.addEventListener('click', async (event) => {
        let target = event.target

        if (target.id !== sessId)
            target.classList.add("hidden");

        response = await fetch('/api/comments/' + target.id, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });
        location.reload();

    });
    if (element.id !== sessId)
        element.classList.add("hidden");
})

document.querySelectorAll('.edit').forEach(element => {
    element.addEventListener('click', async (event) => {
        let target = event.target

        document.location.replace(`/artwork/${artID}/edit-comment/${target.id}`);
    });

    if (element.id !== sessId)
        element.classList.add("hidden");
})

console.log(sessId);


