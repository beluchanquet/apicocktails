const urlParams = new URLSearchParams(window.location.search);
const cocktailId = urlParams.get('id');

async function fetchCocktailInfo(id) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.drinks) {
            const drink = data.drinks[0];
            document.getElementById("cocktail-name").innerText = drink.strDrink;
            document.getElementById("cocktail-image").src = drink.strDrinkThumb;
            
            let ingredients = '';
            for (let i = 1; i <= 15; i++) {
                if (drink[`strIngredient${i}`]) {
                    const ingredientName = drink[`strIngredient${i}`].toLowerCase();
                    const ingredientImage = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
                    ingredients += `
                        <li>
                            <img src="${ingredientImage}" alt="${ingredientName}" width="30" height="30"> 
                            ${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}
                        </li>`;
                }
            }
            document.getElementById("ingredients-list").innerHTML = ingredients;
        } else {
            document.getElementById("cocktail-name").innerText = "No se encontró información del cocktail.";
        }
    } catch (error) {
        console.error("Error fetching cocktail info:", error);
    }
}

fetchCocktailInfo(cocktailId);

document.getElementById("back-button").addEventListener("click", () => {
    window.history.back();
});