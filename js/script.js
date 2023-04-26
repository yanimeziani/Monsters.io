// Définir les variables
let form = document.querySelector("#monsterForm");

// Définir les événements
form.addEventListener("submit", validation);

// Définir les fonctions
function validation(event) {
  // Vérifier si le formulaire est valide
  // Annuler l'envoi du formulaire
  event.preventDefault();

  // Si le formulaire est valide, appeler la fonction create() et reset le formulaire
  form.reset();
}

function create() {
  // Créer un élément dans la liste de cartes
}
