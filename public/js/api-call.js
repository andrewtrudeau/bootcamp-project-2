let title = $('#artTitle')
let image = $('#artImage')
let artistName = $('#artistName')
let date = $('#date')
let medium = $('#medium')
let link = $('#link')
let ids
let selectedId

function getId(){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=hasImages`)
    .then(function (res){
        if(res.ok){
            res.json().then(function(data){
                ids = data.objectIDs
                selectedId = ids[Math.floor(Math.random() * ids.length)];
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
            })
        }
    })
}

function displayArt(data){
    title.text(data.title)
    image.attr('src', data.primaryImage)
    artistName.text('Artist: '+ data.artistDisplayName)
    date.text('Date: '+ data.objectDate)
    medium.text('Medium: '+ data.medium)
    link.attr('href', data.objectURL)

}
