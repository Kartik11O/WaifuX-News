
// $("#myBtn").on('click' , async function show1({target}) {

// console.log(show1)
// let inputSearchField = document.querySelector('inputSearchField').value
// inputSearchField.addEventListener('keypress', show1(value))
  async  function show1 ({target}) {
  var query = `
  query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
        currentPage
        lastPage
        hasNextPage
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
          description
        }
      }
    }
  `
  

var variables = {
  search: target.value,
  // id: 15125,
  page: 1,
  perPage: 50
};


  // /search/anime?search=naruto
  let SS = fetch (`https://graphql.anilist.co/search/anime?q=${target.value}`, {
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
  console.log(target.value)
  SS.then((reqq) => reqq.json())
    .then((gett) => {
      console.log(gett)
      let details = gett.data.Page.media
      console.log(details)
      details.map((items4) => {
        let imagee = items4.coverImage.extraLarge
        let namee = items4.title.romaji
        let des = items4.description
        let avg = items4.averageScore
        let status = items4.status
        let ep = items4.episodes
        let day = items4.startDate.day
        let month = items4.startDate.month
        let year = items4.startDate.year
        let eday = items4.endDate.day
        let emonth = items4.endDate.month
        let eyear = items4.endDate.year
        $('.Show_About').each(function() {
          $(this).html($(this).html().split('<br>')[0]);
        });
        let container = 
          `
          <div id="Show_Container">
        <div id="Show_Img" style=" background-image: url(${imagee});"></div>
        <div id="Show_details">
          <h2 class="Show_Names">${namee}</h2>
          <p class="Show_About">${des}</p>
          <p class="Show_info"><b>Average Score:</b> ${avg} &#128516</p>
          <p class="Show_info"><b>Status:</b> ${status}</p>
          <p class="Show_info"><b>Episodes:</b> ${ep}</p>
          <p class="Show_info"><b>Start Date:</b> ${day}-${month}-${year}</p>
          <p class="Show_info"><b>End Date:</b> ${eday}-${emonth}-${eyear}</p>
        </div>
      </div>
    
    `
        document.getElementById("Show1_Container").innerHTML += container
      })
    })
    

// })
}



document.getElementById("Search_bar").addEventListener("keypress" , show1)



// var input = document.getElementById("Search_bar")
// input.addEventListener("keypress",function(event) {
//   if (event.key === "Enter" ) {
//     input.value,show1
//     event.preventDefault();
//     document.getElementById("myBtn")
//     console.log("pressed")
//   }
// })









// document.getElementById("Search_bar").addEventListener("keypress" , function(e){
//   var key = e.which;
//   if(key == 13)
//   {
//     $('input[name = butAssignProd]').click();
//     console.log("dd")
//     return false;  
//   }
// } )





