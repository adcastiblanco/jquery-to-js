let promesa = new Promise(function(todobien, todomal) {
    setTimeout(() => {
        todobien("Creo que me salió bien")
    }, 2000);
})

Promise.all([
promesa,
]).then((message) => console.log(message))
.catch((message) => console.log(message))

fetch('https://sellercenter-api.linio.com.co/')
.then((data) => data.json())
.then((user) => console.log(user))
.catch(() => console.log('No papi no funcionó'));

(async function load() {
    async function getData(url) {
      const response = await fetch(url);
      const data = await response.json()
      return data;
    }
    
    const prueba = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    console.log(prueba)
})()