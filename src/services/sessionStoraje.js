export  function getSessionStorage(key){
        return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {}
}
export  function setSessionStorage(key, data){
    sessionStorage.setItem(key, JSON.stringify(data));
}
export function deleteSessionStorage(key){
    sessionStorage.removeItem(key);
}