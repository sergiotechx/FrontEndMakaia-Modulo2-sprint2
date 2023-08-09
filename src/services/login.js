import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';
export async function login(email, clave){
   let completeUrl = Url +`admins?email=${email}&password=${clave}`
   let response = await axios.get(completeUrl)
   console.log("aca es", response.data.length)
   if(response.data.length > 0){
       return response.data
   }
   else{
    return ({})
   }

}