const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const comment_text = document.querySelector('#comment').value.trim();
    const newComment = document.querySelector('#newComment').value.trim();
    const artID = document.querySelector('#artID').value.trim();
    const commentID = document.querySelector('#commentID').value.trim();
    const user_id = document.querySelector('#userID').value.trim();

    if (comment_text && newComment && user_id) {
        let response;

        if (newComment === "true") {
            // New Comment Post //
            response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ comment_text, user_id }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            await fetch(`/api/comments/${data}/add-to-artwork/${artID}`, {
                method: 'PUT',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' },
            });


        } else {
            // Old Comment Put //
            response = await fetch('/api/comments/' + commentID, {
                method: 'PUT',
                body: JSON.stringify({ comment_text }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (response.ok) {
            document.location.replace('/artwork/' + artID);
        } else {
            alert('Failed to post, try again later');
        }
    }
};

document
    .querySelector('.form')
    .addEventListener('submit', loginFormHandler);
