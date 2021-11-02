let title = getElementbyId('artTitle')
let image = getElementbyId('artImage')
let artistName = getElementbyId('artistName')
let date = getElementbyId('date')
let medium = getElementbyId('medium')
let link = getElementbyId('link')
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

function displayArt(data){
    title.text(data.title)
    image.attr('src', data.primaryImage)
    artistName.text(data.artistDisplayName)
    date.text(data.objectDate)
    medium.text(data.medium)
    link.attr('href', data.objectURL)

}
