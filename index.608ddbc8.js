!function(){var e,n="live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34",t=document.querySelector(".breed-select"),c=(document.querySelector(".loader"),document.querySelector(".error"),document.querySelector(".cat-info"));(e="https://api.thecatapi.com/v1/breeds?key_api=".concat(n),fetch(e).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return e.map((function(e){return{id:e.id,name:e.name}}))})).catch((function(e){return e}))).then((function(e){return e.map((function(e){var n=e.id,t=e.name;return'<option value="'.concat(n,'">').concat(t,"</option>")})).join("")})).then((function(e){e='<option value="">-- Select breed of cat --</option>'.concat(e),t.insertAdjacentHTML("beforeend",e)})).catch((function(e){console.log(e)})),t.addEventListener("change",(function(e){var t,o,r=e.target.value;console.log(r),(t=r,o="https://api.thecatapi.com/v1/images/search?api_key=".concat(n,"&breed_ids=").concat(t),fetch(o).then((function(e){if(!e.ok)throw console.log(e.status),new Error(e.status);return e.json()})).then((function(e){return{name:e[0].breeds[0].name,description:e[0].breeds[0].description,temperament:e[0].breeds[0].temperament,imgUrl:e[0].url}})).catch((function(e){return console.log(e),e}))).then((function(e){console.log(e),c.textContent="";var n='<div class="cat-img">\n        <img src="'.concat(e.imgUrl,'" >\n      </div>\n      <div class="cat-text">\n        <h2 class="breed-name">').concat(e.name,'</h2>\n        <p class="breed-description">').concat(e.description,'</p>\n        <p class="breed-temperament"><b>Temperament:</b><br>').concat(e.temperament,"</p>\n      </div>\n      ");c.insertAdjacentHTML("beforeend",n)}))}))}();
//# sourceMappingURL=index.608ddbc8.js.map
