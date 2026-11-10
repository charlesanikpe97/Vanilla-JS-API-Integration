// Grabbing important elements.

const mainSearchBarEl = document.querySelector('#searchbar');
const searchResultEl = document.querySelector('h2');
const noSearchResultsEl = document.querySelector('.recipe-empty-state');
const favoritesEl = document.querySelector('#favorites');
const noFavoritesEl = document.querySelector('#no-favorites');


// Consolidating DummyJson Recipes by my own categories 


const recipeCategories = {
  "Savoury Dishes": [
    "Pizza",
    "Stir-fry",
    "Pasta",
    "Salsa",
    "Salad",
    "Bruschetta",
    "Caprese",
    "Biryani",
    "Karahi",
    "Keema",
    "Kebabs",
    "Saag",
    "Roti",
    "Ramen",
    "Soup",
    "Tagine",
    "Bibimbap",
    "Moussaka",
    "Butter chicken",
    "Curry",
    "Elote",
    "Borscht",
    "Dosa",
    "Falafel",
    "Wrap",
    "Patatas bravas",
    "Spring rolls",
    "Quinoa salad",
    "Enchiladas",
    "Shrimp curry",
    "Spanakopita",
    "Couscous salad",
    "Teriyaki chicken",
    "Mango salsa",
    "Shrimp stir-fry",
    "Margherita pizza",
    "Pesto pasta",
    "Chicken skewers",
    "Sushi rolls",
    "Chickpea salad"
  ],

  "Dessert & Drinks": [
    "Cookies",
    "Dessert",
    "Lassi",
    "Tiramisu",
    "Smoothie",
    "Caipirinha",
    "Cocktail",
    "Matcha ice cream",
    "Brigadeiros",
    "Mojito"
  ],

  "Ingredients & Recipe Tags": [
    "Vegetarian",
    "Baking",
    "Chicken",
    "Quinoa",
    "Beef",
    "Shrimp",
    "Main course",
    "Potatoes",
    "Chickpea",
    "Rice",
    "Mango",
    "Grilling",
    "Blueberry",
    "Banana",
    "Street food",
    "Quick",
    "Pineapple",
    "Coconut"
  ],

  "Cuisine": [
    "Italian",
    "Asian",
    "Indian",
    "Pakistani",
    "Japanese",
    "Moroccan",
    "Korean",
    "Greek",
    "Thai",
    "Turkish",
    "Mexican",
    "Russian",
    "Lebanese",
    "Brazilian",
    "Spanish",
    "Vietnamese",
    "Mediterranean",
    "Cuban",
    "Hawaiian"
  ]
};


// Fetching all Recipes from DummyJSON API

const getAllRecipes = async () => {
    try{
        const response = await fetch('https://dummyjson.com/recipes?limit=0');
        if (!response.ok){
            throw new Error(`Something went wrong: ${response.status}`);
        } 
         const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.log('Error');
        console.error(error);
    }; 
   
   
} 

// Filtering Savoury Dishes from all Recipes Object

const savouryDishesRecipes = async () => {
    const recipes = await getAllRecipes();

    const savouryDishes = recipeCategories["Savoury Dishes"];

    const filteredRecipes = recipes.filter(recipe =>
        savouryDishes.some(dish =>
            recipe.name.toLowerCase().includes(dish.toLowerCase())
        )
    );

    return filteredRecipes;
}; 



// Dynamically Creating Recipe Cards

const createARecipeCard = (recipe) => {
    // Creating main div 

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');
    
    
    // Creating the recipe's Picture div and img tag 
    const recipePictureDiv = document.createElement('div');
    recipePictureDiv.classList.add('pictureDiv');
    const recipePicture = document.createElement('img');
    recipePicture.setAttribute('src', `${recipe.image}`);
    recipePicture.setAttribute('alt',` A picture of ${recipe.name}`);
    recipePicture.style.objectFit = 'fill';
    recipePicture.style.height = '80%';
    recipePicture.style.width = '100%';
    recipePictureDiv.appendChild(recipePicture);

    mainDiv.appendChild(recipePictureDiv);

    // Create lower portion of the Recipe Card 

    const titleDurationDiv = document.createElement('div');
    titleDurationDiv.classList.add('titleDurationClass');
    mainDiv.appendChild(titleDurationDiv);

    const recipeTitleDiv = document.createElement('div');
    recipeTitleDiv.classList.add('recipeTitleDivClass');
    titleDurationDiv.appendChild(recipeTitleDiv);
    const recipeTitle = document.createElement('h3');
    // recipeTitle.style.fontSize = `0.8rem`;
    // recipeTitle.style.width = '70%'
    // recipeTitle.style.paddingTop = `0`;
    // recipeTitle.style,marginTop = `0.3rem`
    recipeTitle.textContent = recipe.name;
    recipeTitleDiv.appendChild(recipeTitle);
    
    
    


    const recipeDurationDiv = document.createElement('div');
    recipeDurationDiv.classList.add('recipeTitleDivClass');
    titleDurationDiv.appendChild(recipeDurationDiv);
    const recipeDuration = document.createElement('span');
    recipeDuration.textContent = `${recipe.prepTimeMinutes} mins`;
    recipeDurationDiv.appendChild(recipeDuration);

    
    

    const cuisineDifficultyDiv = document.createElement('div');
    cuisineDifficultyDiv.classList.add('titleDurationClass');
    mainDiv.appendChild(cuisineDifficultyDiv);

    const recipeCuisineDiv = document.createElement('div');
    recipeCuisineDiv.classList.add('recipeTitleDivClass');
    cuisineDifficultyDiv.appendChild(recipeCuisineDiv);
    const recipeCuisine = document.createElement('span');
    recipeCuisine.textContent = recipe.cuisine;
    recipeCuisine.style.fontStyle = 'italic';
    recipeCuisineDiv.appendChild(recipeCuisine);
    


   const recipeDifficultyDiv = document.createElement('div');
    recipeDifficultyDiv.classList.add('recipeTitleDivClass');
    cuisineDifficultyDiv.appendChild(recipeDifficultyDiv);
    const recipeDifficulty = document.createElement('span');
    recipeDifficulty.textContent = recipe.difficulty;
    recipeDifficultyDiv.appendChild(recipeDifficulty);


    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btnDivClass');
    mainDiv.appendChild(btnDiv);

    const recipeBtn = document.createElement('button');
    recipeBtn.setAttribute('class','recipeBtn');
    recipeBtn.textContent = 'Click for more details';
    btnDiv.appendChild(recipeBtn);


    noSearchResultsEl.appendChild(mainDiv);

}


// Displaying the Savoury Dishes Recipe Cards 

const displaySavouryDishes = async () => {
    try {
        const recipes = await savouryDishesRecipes();


        noSearchResultsEl.innerHTML = '';
        for (let i=0; i<recipes.length; i++){
         const recipeCard =  createARecipeCard(recipes[i]);

        }

        
        noSearchResultsEl.classList.remove('recipe-empty-state');
        noSearchResultsEl.classList.add('recipe-non-empty-state');
        return noSearchResultsEl.replaceChildren(recipeCard);
       
        

        


    } catch (error) {
        console.log(`Error`);
        console.error(error);
    }
}



// Savoury Dishes Event Handler Function 

const filterButtonsDiv = document.querySelector('#filters');
const allFilterButtons = document.querySelectorAll('.filter');
const filterButtonsTitles = [];
for (let i =0; i<allFilterButtons.length; i++){
    filterButtonsTitles.push(allFilterButtons[i].textContent);
}
filterButtonsDiv.addEventListener('click', async (event)=> {
   if (event.target.textContent === "Savoury Dishes"){
        
        const findSavouryDishesRecipes = await savouryDishesRecipes();

        console.log(findSavouryDishesRecipes);

        searchResultEl.textContent = `Search Results (${findSavouryDishesRecipes.length})`;


        const renderSavouryRecipesCards = await displaySavouryDishes();
        
        
        // noSearchResultsEl.replaceChildren(renderSavouryRecipesCards);

         
   }
})