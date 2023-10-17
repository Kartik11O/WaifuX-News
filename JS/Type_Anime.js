var query = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME , sort: TRENDING_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage  {
            extraLarge
        }
       characters {
          edges {
            id
            node {
              image {
                large
              }
            }
          }
        }
          
       
         
        startDate {
            year
            month
            day
        }
        endDate{
            year
            month
            day 
        }
        format
        trending
        isAdult
        type
        genres
        episodes
        duration
        status
        popularity
        averageScore
        season
        
      }
    }
  }
`
var variables = {
  id: 15125,
  page: 1,
  perPage: 10
};




let ListApi = fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables,
    Media: {
      Type: 'Anime'
    }
  })

})
ListApi.then((DataReq) => DataReq.json())
  .then((VV) => {
    console.log(VV)
    let DD = VV.data.Page.media
    let banner = VV.data.Page.media[1].bannerImage
    console.log(banner)
    DD.map((items) => {
      let Poster_Anime = items.coverImage.extraLarge
      let Name_Anime = items.title.romaji
      // let EP = items.episodes
      let Year = items.startDate.year
      let status = items.status
      let season = items.season
      let avg = items.averageScore
      let gen = items.genres
      console.log(status)
      console.log(Year)
      console.log(season)
      console.log(avg)
      let Pic_Container = ` 
      <div class="Holder card">
      <div class="card__content">
      <p class="card__title">${Name_Anime}</p>
      <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eos minus sapiente esse, illum tenetur beatae doloremque commodi accusantium impedit rem consequatur quisquam ullam ipsa ea iure reiciendis, reprehenderit rerum.</p>
      <p class="card__Status extra"><b>Status:</b> ${status} , ${season} ${Year}</p>
      <p class="card__Gen extra"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
      <p class="card__Popularity extra"><b>Popularity:</b> ${avg} &#128516 </p>

    </div>
    <div class="IMGholder" style="background-image: url(${Poster_Anime});">
    </div>

       <h2 class="Anime-Headline">${Name_Anime}</h2>
       <span class="Anime-GEN">${gen[0]}</span>
       <span class="Anime-GEN">${gen[1]}</span>
       <span class="Anime-GEN">${gen[2]}</span>

    </div>
    
       `


      document.getElementById("Row-1").innerHTML += Pic_Container





    })



  })



