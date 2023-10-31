$("#go").on("click", () => {
  var query2 = `
  query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          hasNextPage
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
            
          studios(isMain: true) {
            nodes {
              name
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
          siteUrl
        }
      }
    }
  `
  // console.log(variables1)
  let ListApi2 = fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query2,
      variables: variables2,
      Media: {
        Type: 'Anime'
      }
    })
  })
  ListApi2.then((DataReq) => DataReq.json())
  .then((VV) => {
    console.log(VV)
    let DD = VV.data.Page.media
    // let banner = VV.data.Page.media[1].bannerImage
    // console.log(banner)
    DD.map((items) => {
      let Poster_Anime = items.coverImage.extraLarge
      let Name_Anime = items.title.romaji
      // let EP = items.episodes
      let Year = items.startDate.year
      let status = items.status
      let season = items.season
      let avg = items.averageScore
      let gen = items.genres
      let Pic_Container = ` 
      <div class="Holder card">
      <div class="card__content">
      <p class="card__title">${Name_Anime}</p>
      <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eos minus sapiente esse, illum tenetur beatae doloremque commodi accusantium impedit rem consequatur quisquam ullam ipsa ea iure reiciendis, reprehenderit rerum.</p>
      <p class="card__Status extra1 ALL"><b>Status:</b> ${status} , ${season} ${Year}</p>
      <p class="card__Gen extra2 ALL"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
      <p class="card__Popularity extra3 ALL"><b>Popularity:</b> ${avg} &#128516 </p>

    </div>
    <div class="IMGholder" style="background-image: url(${Poster_Anime});">
    </div>

       <h2 class="Anime-Headline">${Name_Anime}</h2>
       <span class="Anime-GEN">${gen[0]}</span>
       <span class="Anime-GEN">${gen[1]}</span>
       <span class="Anime-GEN">${gen[2]}</span>

    </div>
    
       `


      document.getElementById("Container-4").innerHTML += Pic_Container





    })



  })


})
