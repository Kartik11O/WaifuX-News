var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search, sort: POPULARITY_DESC) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        type
        endDate {
          year
          month
          day
        }
        startDate {
          year
          month
          day
        }
        studios(isMain: true) {
          nodes {
            name
          }
        }
        isAdult
        source
        genres
        volumes
        episodes
        chapters
        siteUrl
        status
        averageScore
        meanScore
        popularity
        description
        favourites
        coverImage {
          extraLarge
          medium
          large
          color
        }
      }
    }
}`;


var variables = {
    search: query.query,
    id: 15125,
    page: 1,
    perPage: 100
};

function show ({target}) {

let SS = fetch(`https://graphql.anilist.co${target.value}`, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
     
    })

})
SS.then((req) => req.json())
    .then((dataa) =>{
        console.log(dataa)
       
        let details = dataa.data.Page.media
console.log(details)
    details.map((items4) =>{
    let image = items4.coverImage.extraLarge
    let name = items4.title.romaji
    let container =  `
    <img src="${image}" alt="">
      <p>${name}</p>
    
    `
   document.getElementById("app").innerHTML += container
    })
    })
    // console.log(inputSearchField)
  }
let targett = document.getElementById("SSS").value
let target = document.getElementById('go').addEventListener('click',show);