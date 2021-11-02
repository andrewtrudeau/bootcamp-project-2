// let selectedId
let ids
let selectedId

function getId(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=hasImages`)
    .then(function (res){
        if(res.ok){
            res.json().then(function(data){
                ids = data.objectIDs
                selectedId = ids[Math.floor(Math.random() * ids.length)];
                console.log(ids)
                console.log(selectedId)
                fetchArt()
            })
        }
    })
}
getId()

function fetchArt(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${selectedId}`)
    .then(function (res){
        if(res.ok){
            res.json().then(function(data){
                displayArt(data)
                console.log(data)
            })
        }
    })
}

function displayArt(){
    //...
}
