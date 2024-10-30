// Helper function to display all ramen images in the menu
async function displayRamens() {
  try {
    const response = await fetch("http://localhost:3000/ramens"); // Replace with correct API endpoint if different
    const ramens = await response.json();

    const ramenMenuDiv = document.getElementById("ramen-menu");
    ramenMenuDiv.innerHTML = ""; // Clear previous content if any

    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => handleClick(ramen)); // Attach click event
      ramenMenuDiv.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching ramen data:", error);
  }
}

// Function to display details of clicked ramen
function handleClick(ramen) {
  const detailImage = document.querySelector("#ramen-detail .detail-image");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const detailRating = document.getElementById("rating-display");
  const detailComment = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
}

// Function to add a new ramen from the form input
function addSubmitListener(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
    };

    createRamen(newRamen);

    form.reset(); // Clear the form after submission
  });
}

// Function to add new ramen to the menu and display it in the menu section
function createRamen(ramen) {
  const ramenMenuDiv = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenuDiv.appendChild(img);

  // Optionally, you could POST this new ramen to the server
  // fetch("http://localhost:3000/ramens", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(ramen),
  // });
}

// Initialize the app
function main() {
  displayRamens();
  const ramenForm = document.getElementById("new-ramen");
  addSubmitListener(ramenForm);
}

// Run the app when content is loaded
document.addEventListener("DOMContentLoaded", main);
