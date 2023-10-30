// Récupération de l'élément <ul>
const selectDropdown = document.querySelector(".select__dropdown");

// Création de la variable countries qui va stocker les données de l'API dans un tableau
let countries = [];

// Déclaration de la fonction asynchrone fetchCountries afin d'obtenir les données de l'API
const fetchCountries = async () => {
  await fetch(" https://restcountries.com/v3.1/all")
    .then((blob) => blob.json())
    .then((data) => countries.push(...data))
    .catch((error) => console.error(error));
  console.log(countries);
  countries = orderList(); // Appel de la fonction orderedList

  // Appel de la fonction displayCustomSelect(countries)
  displayCustomSelect(countries);
};
// Appel de la fonction fetchCountries
fetchCountries();

// Fonction orderList afin de trier les noms de pays par ordre alphabétique
const orderList = () => {
  const orderedData = countries.sort((a, b) => {
    // a est inférieur à b
    if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
      return -1;

      // a est supérieur à b
    } else if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
      return 1;

      // a égal à b
    } else {
      return 0;
    }
  });
  return orderedData;
};

// Déclaration de la fonction displayCustomSelect
const displayCustomSelect = (countriesList) => {
  countriesList.forEach((country) => {
    // Création d'un élément <li> et insertion dans le DOM
    let option = document.createElement("li");
    option.className = "option";
    option.setAttribute("value", country.name.common);
    option.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common}" /> <span>${country.name.common}</span>`;
    selectDropdown.appendChild(option);
  });

  // Récupération des différents éléments
  const select = document.querySelector(".select");
  const selectValue = document.querySelector(".select span");
  const options = document.querySelectorAll(".option");

  // Ecoute de l'événement "click" sur la <div> réprésentant le select
  select.addEventListener("click", () => {
    select.classList.toggle("selected");
    selectDropdown.classList.toggle("active");
  });

  // Boucle for...of qui va parcourir les différentes options
  for (let option of options) {
    // Ecoute de l'événement "click" sur l'option
    option.addEventListener("click", (e) => {
      let selected = e.target.getAttribute("value");
      select.classList.remove("selected");
      selectDropdown.classList.remove("active");
      select.setAttribute("value", selected);
      selectValue.textContent = e.target.textContent;
    });
  }
};
