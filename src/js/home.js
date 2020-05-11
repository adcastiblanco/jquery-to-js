console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo');
  }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo 3');
  }, 3000)
})

// getUser
//   .then(function() {
//     console.log('todo está bien en la vida')
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

Promise.race([
  getUser,
  getUserAll,
])
.then(function(message) {
  console.log(message);
})
.catch(function(message) {
  console.log(message)
})



$.ajax('https://randomuser.me/api/sdfdsfdsfs', {
  method: 'GET',
  success: function(data) {
    console.log(data)
  },
  error: function(error) {
    console.log(error)
  }
})

fetch('https://randomuser.me/api/dsfdsfsd')
  .then(function (response) {
    // console.log(response)
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function() {
    console.log('algo falló')
  });
  
  
  (async function load() {
    // await
    // action
    // terror
    // animation
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    async function getData(url) {
      const response = await fetch(proxyurl + url);
      const data = await response.json();
      if (data.data.movie_count > 0) {
        return data;
      }
      throw new Error('No se ha encontrado la pelicula')
    }
    
    const $home = document.getElementById('home');
    const $form = document.getElementById('form');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');
    
    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');
    const $featuringContainer = document.getElementById('featuring');
    
    function setAttributes($element, attributes) {
      for (const attribute in attributes) {
        $element.setAttribute(attribute, attributes[attribute])
      }
    }

    const BASE_API = 'https://yts.am/api/v2/'
    function featuringTemplate(peli) {
     return `<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>`
    }

    $form.addEventListener('submit', async () => {
      event.preventDefault()
      $home.classList.add('search-active')
      const $loader = document.createElement('img');
      setAttributes($loader, {
        src: 'src/images/loader.gif',
        width:50,
        height:50,
      })
      $featuringContainer.append($loader);
      const data = new FormData($form)
      data.get('name')
      try {
        const {
          data: {
            movies
          }
        } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        const HTMLString = featuringTemplate(movies[0])
        $featuringContainer.innerHTML = HTMLString
      } catch (error) {
        $loader.remove()
        $home.classList.remove("search-active")
        alert(error.message)
      }
      // const HTMLString = printMovies(peli)
      // $featuringContainer.innerHTML = HTMLString
    })
    
    function printMovies(movie, category) {
      return (`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
      <div class="primaryPlaylistItem-image">
      <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
      ${movie.title}
      </h4>
      </div>`)
    }
    
    function createTemplate(HTMLString) {
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      return html.body.children[0]
    }
    
    function addEventClick($element) {
      $element.addEventListener('click', () => {
        showModal($element)
      })
    }
    $hideModal.addEventListener('click', hideModal)
    
    async function renderMovieList(list, $container, category){
      $container.children[0].remove()
      list.forEach((item) => {
        const moviesHTML = printMovies(item, category)
        const HTMLString = createTemplate(moviesHTML)
        const movieElement = HTMLString
        const image = movieElement.querySelector('img')
        image.addEventListener('load', (event) => 
          event.srcElement.classList.add('fadeIn')
        )
        $container.append(movieElement);
        addEventClick(movieElement)
      })
    }
    
    function findById(list, id) {
      return list.find((movie) => movie.id === parseInt(id, 10))
    }
    
    function findMovie(id, category) {
      switch (category) {
        case 'action': 
        return findById(actionList, id)
        break;
        case 'drama':
          return findById(dramaList, id)
          break
          default:
            findById(animationList, id)
            break;
          }
    }
    
    function showModal($element) {
      $overlay.classList.add('active')
      $modal.style.animation = 'modalIn .8s forwards';
      const {id, category}= $element.dataset;
      const data = findMovie(id, category)
      $modalTitle.textContent = data.title
      $modalDescription.textContent = data.description_full
      $modalImage.setAttribute('src', data.medium_cover_image)
    }
    function hideModal() {
      $overlay.classList.remove('active')
      $modal.style.animation = 'modalOut .8s forwards'
    }
    const {data: {movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`)
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList, $actionContainer, 'action')
  
    const {data: {movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`)
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer, 'drama')
  
    const {data: {movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`)
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList, $animationContainer, 'animation')
  })()

  