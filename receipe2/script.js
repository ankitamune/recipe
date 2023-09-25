document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("results-container");

    // Function to fetch recipes from the API
    function fetchRecipes(query) {
        const apiUrl = `https://forkify-api.herokuapp.com/api/search?q=${query}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data.recipes);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }

    // Function to display search results
    function displayResults(recipes) {
        resultsContainer.innerHTML = "";

        recipes.forEach((recipe) => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            const image = document.createElement("img");
            image.src = recipe.image_url;
            card.appendChild(image);

            const title = document.createElement("h5");
            // title.classList.add("card-headding")
            title.textContent = recipe.title;
            card.appendChild(title);

            const publisherName = document.createElement("p");
            publisherName.textContent = recipe.publisher;
            card.appendChild(publisherName);


            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Details";
            detailsButton.classList.add("details")
            detailsButton.addEventListener("click", () => {
                // Redirect to the details page with the recipe ID
                window.location.href = `recipe.html?id=${recipe.recipe_id}`;
            });
            card.appendChild(detailsButton);
            
            const urlRecipe=document.createElement("button")
            urlRecipe.textContent="recipe url"
            urlRecipe.classList.add("url-recipe")
            urlRecipe.addEventListener("click",()=>{
                window.location= recipe.source_url
            })
            card.appendChild(urlRecipe)
            resultsContainer.appendChild(card);

            
        // recipeContainer.appendChild(recipeCard);
        });

    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value;
        if (query) {
            fetchRecipes(query);
        }
    });
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          const searchTerm = searchInput.value.trim();
          if (searchTerm !== "") {
            fetchRecipes(searchTerm);
          }
        }
      });
});
