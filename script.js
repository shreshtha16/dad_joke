const jokeContainer = document.getElementById("joke-container");
const jokeButton = document.getElementById("joke-button");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const fontSizeSlider = document.getElementById("font-size-slider");
const shareButton = document.getElementById("share-button");

// API setup with your provided API key
const apiUrl = "https://api.api-ninjas.com/v1/dadjokes";
const apiKey = "StIMcWhaG7i8KWUlQcszyg==QIvoCQBoLcWVfpoT";

async function fetchJoke() {
    try {
      jokeContainer.textContent = "Loading...";
      const response = await fetch(apiUrl, {
        headers: { 'X-Api-Key': apiKey }
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);  
      jokeContainer.textContent = data[0].joke;
      jokeContainer.classList.add("fade-in");
    } catch (error) {
      console.error("Fetch Error:", error);  
      jokeContainer.textContent = "Oops! Couldn't fetch a joke.";
    }
  }
  


jokeButton.addEventListener("click", fetchJoke);

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  jokeContainer.classList.toggle("dark-mode");
});

fontSizeSlider.addEventListener("input", () => {
  jokeContainer.style.fontSize = `${fontSizeSlider.value}px`;
});

shareButton.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "Dad Joke",
      text: jokeContainer.textContent,
    });
  } else {
    alert("Sharing is not supported on this browser.");
  }
});
