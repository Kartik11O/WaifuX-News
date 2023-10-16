




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
      }
    }
  }
`
var variables = {
  id: 15125,
  page: 1,
  perPage: 10
};

let headers = new Headers();
let ListApi = fetch('https://graphql.anilist.co', {
  method: 'POST',
  // mode: 'no-cors',
  header: headers,
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

//       function New(){

//      console.log(';asd')
//         let Test = `
//         <div id="Cover-Img">
//           <img src="${banner}"  style="height: 100%; width: 100%;" alt="">
//           </div>
        
//   `
//   document.getElementById("Container-4").innerHTML = Test
// }
    
    
    
    
    DD.map((items) => {
      let Poster_Anime = items.coverImage.extraLarge
      let Name_Anime = items.title.romaji
      // let EP = items.episodes
      let gen = items.genres
      console.log(gen)
      // console.log(items)
      let Pic_Container = ` 
      <div class="Holder card">
      <div class="card__content">
      <p class="card__title">${Name_Anime}</p>
      <p class="card__description"></p>
    </div>
    <div class="IMGholder" style="background-image: url(${Poster_Anime});"></div>

      // <h2 class="Anime-Headline">${Name_Anime}</h2>
      // <span class="Anime-GEN">${gen[0]}</span>
      // <span class="Anime-GEN">${gen[1]}</span>
      // <span class="Anime-GEN">${gen[2]}</span>

    </div>
    
       `
      





      document.getElementById("Row-1").innerHTML += Pic_Container 
  
   
    
    

    })

  
  
  })



