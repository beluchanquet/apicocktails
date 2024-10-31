document.getElementById("search-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    const cocktailList = document.getElementById("cocktail-list");
    cocktailList.innerHTML = "";

    try {
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        let data = await response.json();

        if (data.drinks) {
            localStorage.setItem('cocktailResults', JSON.stringify(data.drinks));
            renderCocktailCards(data.drinks);
        } else {
            response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
            data = await response.json();

            if (data.drinks) {
                localStorage.setItem('cocktailResults', JSON.stringify(data.drinks));
                renderCocktailCards(data.drinks);
            } else {
                cocktailList.innerHTML = "<p>No se encontraron cocktails.</p>";
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        cocktailList.innerHTML = "<p>Error al buscar cocktails.</p>";
    }
});

function renderCocktailCards(drinks) {
    const cocktailList = document.getElementById("cocktail-list");
    drinks.forEach(drink => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        card.addEventListener("click", () => showIngredients(drink.idDrink));
        cocktailList.appendChild(card);
    });
}

window.onload = function() {
    const storedResults = localStorage.getItem('cocktailResults');
    if (storedResults) {
        const drinks = JSON.parse(storedResults);
        renderCocktailCards(drinks);
    }
};

function showIngredients(id) {
    window.location.href = `cocktail-info.html?id=${id}`;
}