const { genres } = require("./navBarInitialData");

export function getGenreById (id){
  let genreData = genres.value.find(genre=>genre.value == id)
  if(genreData!=undefined){
    return({id:genreData.value, name:genreData.label})
  }
  else{
    return (undefined);
  }

}