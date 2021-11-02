let artId


function getId(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=hasImages`)
    .then(function (res){
        if(res.ok){
            res.json().then(function(data){
                selectArt(data)
            })
        }
    })
}
getId()

function selectArt(){
    let result = ARRAY[Math.floor(Math.random() * ARRAY.length)];
    artId = result
    displayArt()
    console.log(artId)
        return result;
}

function fetchArt(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}]`)
    .then(function (res){
        if(res.ok){
            res.json().then(function(data){
                displayArt(data)
            })
        }
    })
}

function displayArt(){
    //...
}
