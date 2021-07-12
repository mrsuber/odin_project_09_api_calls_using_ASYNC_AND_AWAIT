// IDBDatabase
let database={
  page_title:"Find Meal For Your Ingredients. ",
  page_heading:"Find Meals For Your Ingredients. version2",
  block_quote:"Real food doesn't have ingredients, real food is ingredients.",
  cite_text:"- Jamie Oliver",
  meal_result_title:"Your Search Results:"

}

// creating Element for the DOM
function preloader(){
  // query querySelector
  const body = document.querySelector('body')
  // create elements
  const preloaderDiv = document.createElement('div')
  const spinerDiv= document.createElement('div')
  const span = document.createElement('span')



  preloaderDiv.classList.add('preloader')
  spinerDiv.classList.add('spinner')
  span.classList.add('spinner-rotate')

  body.appendChild(preloaderDiv)
  preloaderDiv.appendChild(spinerDiv)
  spinerDiv.appendChild(span)

}

function pageRender(){
if(document.querySelector('.preloader')!==null){
  document.querySelector('.preloader').remove()
}

const pageTitle = document.createElement('title')
const pageContainer = document.createElement('div')
const mealWrapper = document.createElement('div')
const mealSearch = document.createElement('div')
const pageHeading = document.createElement('h2')
const blockQuote = document.createElement('blockquote')
const lineBreak = document.createElement('br')
const cite = document.createElement('cite')
const mealSearchBox = document.createElement('div')
const searchInput = document.createElement('input')
const searchInputBtn = document.createElement('button')
const searchInputBtnIcon = document.createElement('i')

const mealResults = document.createElement('div')
const mealResultTitle = document.createElement('h2')
const meal = document.createElement('div')


const mealDetails = document.createElement('div')
const mealDetailsBtn = document.createElement('button')
const mealDetailsBtnIcon = document.createElement('i')
const mealDetailsContents = document.createElement('div')

//assing stoff to documment created
pageTitle.innerText=database.page_title;
pageContainer.classList.add('container');
mealWrapper.classList.add('meal-wrapper')
mealSearch.classList.add('meal-search')
pageHeading.classList.add('title')
pageHeading.innerText = database.page_heading
blockQuote.innerText= database.block_quote
cite.innerText = database.cite_text
mealSearchBox.classList.add('meal-search-box')
searchInput.classList.add('search-control')
searchInput.id="search-input"
searchInput.type = "text"
searchInput.placeholder="Enter an ingredient"
searchInputBtn.classList.add('search-btn')
searchInputBtn.id="search-btn"
searchInputBtn.classList.add('btn')
searchInputBtnIcon.classList.add('fa')
searchInputBtnIcon.classList.add('fa-search')
mealResults.classList.add('meal-result')
mealResultTitle.classList.add('title')
mealResultTitle.innerText=database.meal_result_title
meal.id = "meal"
mealDetails.classList.add('meal-details')
mealDetailsBtn.type = "button"
mealDetailsBtn.classList.add('btn')
mealDetailsBtn.classList.add('recipe-close-btn')
mealDetailsBtn.id = "recipe-close-btn"
mealDetailsBtnIcon.classList.add('fa')
mealDetailsBtnIcon.classList.add('fa-times')
mealDetailsContents.classList.add('meal-details-content')


// append it the html
const pageHead = document.querySelector('head')
const body = document.querySelector('body')
pageHead.appendChild(pageTitle)
// // preloader
// const section1 = document.createElement('div')
// section1.innerHTML='<section class="preloader" > <div class="spinner"> <span class="spinner-rotate"></span></div></section>'
// body.appendChild(section1)
body.appendChild(pageContainer)
pageContainer.appendChild(mealWrapper)
mealWrapper.appendChild(mealSearch)


mealSearch.appendChild(pageHeading)
mealSearch.appendChild(blockQuote)
blockQuote.appendChild(lineBreak)
blockQuote.appendChild(cite)
mealSearch.appendChild(mealSearchBox)
mealSearchBox.appendChild(searchInput)
mealSearchBox.appendChild(searchInputBtn)
searchInputBtn.appendChild(searchInputBtnIcon)

mealWrapper.appendChild(mealResults)
mealResults.appendChild(mealResultTitle)
mealResults.appendChild(meal)


mealWrapper.appendChild(mealDetails)
mealDetails.appendChild(mealDetailsBtn)
mealDetailsBtn.appendChild(mealDetailsBtnIcon)
mealDetails.appendChild(mealDetailsContents)

}
function doSomthing(data) {
    let html = "";
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else{
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
};
// get meal list that matches with the ingredients
async function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    const responseData = await response.json()
    doSomthing(responseData)
}


function run(){
  preloader()
const start = Date.now();
setTimeout(() => {
  const millis = Date.now() - start;

  pageRender()
  console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  // expected output: seconds elapsed = 2
}, 5000);


}
run()
// querying selectors

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});





// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
