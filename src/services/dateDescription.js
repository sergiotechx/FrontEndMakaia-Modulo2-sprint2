export function dateDescription(dateString){
  let date=[];
  
  date = dateString.split('-')
  let year = date[0]
  let tempMonth = Number(date[1]) -1
  let day = date[2]
  
  
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const month = monthNames[tempMonth];
  return `${month} ${day} de ${year}`;
  

  
}