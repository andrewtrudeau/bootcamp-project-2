//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});
let fileURL;
const fileData = document.getElementById('fileData');

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            fileURL = fileReader.result; //passing user file source in fileURL variable
            // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
            let imgTag = `<img class="shadow-sharp" src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}

const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const title = document.querySelector('#title').value.trim();
    const artist = document.querySelector('#artist').value.trim();
    const description = document.querySelector('#desc').value.trim();

    if (fileURL && artist && title && description) {

        // Files
        let fd = new FormData();
        let dateID = Date.now();

        const user_id = parseInt(document.querySelector('#user').innerHTML);
        const img_path = "/db/images/" + dateID + "/" + dateID + "." + fileData.files[0].name.split('.').pop();

        fd.append('image', fileData.files[0], dateID + "." + fileData.files[0].name.split('.').pop());

        // Send the e-mail and password to the server
        const response = await fetch('/api/users/upload', {
            method: 'POST',
            body: JSON.stringify({ title, artist, description, img_path, user_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        const responseUpload = await fetch('/api/users/uploadFile', {
            method: 'POST',
            body: fd
        });

        if (response.ok && responseUpload.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to post. Try again later.');
            return;
        }

    } else {
        alert('Something is missing...');
    }

};

document
    .querySelector('.upload-form')
    .addEventListener('submit', loginFormHandler);
