// get local storage favorite list
function getStorage() {
    let data = JSON.parse(localStorage.getItem("Favorite")) || [];
    return data;
  }
  
  // add favorite list in localstorage
  function setStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("Favorite", dataString);
  }
  
  // this function is call when user click on favorite button on homepage character card
  function updateFavorite(e) {
    let data = JSON.parse(e.getAttribute("data-character"));
    let favoriteList = getStorage();
  
    // if character is alrady in favorite list then unfavorite it
    for (let character = 0; character < favoriteList.length; character++) {
      if (favoriteList[character].id == data.id) {
        favoriteList.splice(character, 1);
        e.setAttribute("value", "Favorite");
        setStorage(favoriteList);
        return;
      }
    }
  
    // if character is not present in favorite list then add it to favorite
    favoriteList.push(data);
    setStorage(favoriteList);
    e.setAttribute("value", "Unfavorite");
  }
  
  // display favorite list on favorite page
  function renderFavorite(favoriteContainer) {
    // get favorite list of characters from local storage
    let myFavoriteList = getStorage();
    
    if(myFavoriteList.length > 0) {
      favoriteContainer.innerHTML = "";
    }
    // iterate over all the favorite list chracters fetched from local storage
    for (let character = 0; character < myFavoriteList.length; character++) {
      const { id, name, path } = myFavoriteList[character];
  
      // create a seperate div container for each character and append it to the parent node
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
  
      // path to redirect to the character details page when user click on character titles
      let detailsPath = `../pages/characterdetails.html#${id}`;
      div.innerHTML = `
          <img class="poster" src=${path}.jpg alt="">
          <div class="card-body">
          <a href=${detailsPath}>${name}</a>
          <input type="button" value="Unfavourite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavorite(this)"/>
          </div>
      `;
      favoriteContainer.appendChild(div);
    }
  }
  
  // render favorite page only if user visits on favorite page
  let favoriteContainer = document.getElementById('favorite-characters');
  if(favoriteContainer != null) {
    renderFavorite(favoriteContainer);
  }
  