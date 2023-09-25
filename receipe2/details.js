document.addEventListener("DOMContentLoaded", () => {
    const recipeDetailsContainer = document.querySelector(".recipe-details");
    const recipeImageContainer = document.querySelector(".recipe-image");
    const backButton = document.getElementById("back-button");

    // Extract the recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    // Function to fetch and display recipe details
    function fetchRecipeDetails(recipeId) {
        const apiUrl = `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayRecipeDetails(data.recipe);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });
    }

    // Function to display recipe details
    function displayRecipeDetails(recipe) {
        // Display the image in the image container
        const image = document.createElement("img");
        image.src = recipe.image_url;
        recipeImageContainer.appendChild(image);

         // Create and display the title
    const title = document.createElement("h2");
    title.textContent = recipe.title;
    recipeDetailsContainer.appendChild(title);

    // Create and display the publisher's name
    const publisherName = document.createElement("p");
    publisherName.textContent = recipe.publisher;
    recipeDetailsContainer.appendChild(publisherName);

    // Create and display a button to visit the publisher's webpage
    const publisherWebButton = document.createElement("button");
    publisherWebButton.textContent = "Visit Publisher's Website";
    publisherWebButton.addEventListener("click", () => {
        window.open(recipe.publisher_url, "_blank");
    });
    recipeDetailsContainer.appendChild(publisherWebButton);

    // Create and display a button to view the full recipe
    const fullRecipeButton = document.createElement("button");
    fullRecipeButton.textContent = "View Full Recipe";
    fullRecipeButton.addEventListener("click", () => {
        window.open(recipe.source_url, "_blank");
    });
    recipeDetailsContainer.appendChild(fullRecipeButton);

    // Display the ingredients in the details container as a list
    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });
    recipeDetailsContainer.appendChild(ingredientsList);
    }

    backButton.addEventListener("click", () => {
        // Redirect back to the home page
        window.location.href = "index.html";
    });

    // Fetch and display recipe details when the page loads
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    }
});
