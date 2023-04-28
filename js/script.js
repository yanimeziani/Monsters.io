"use strict";
// Définir les variables
let form = document.querySelector("#monsterForm");
let monsterName = document.querySelector("#monsterName");
let monsterDescription = document.querySelector("#monsterDescription");
let monsterAttack = document.querySelector("#attackPoints");
let monsterDefense = document.querySelector("#defensePoints");
let monsterHeatlh = document.querySelector("#healthPoints");
let monsterTotalPoints = document.querySelector("#totalPoints");

let bossAttack = document.querySelector("#bossAttackPoints");
let bossDefense = document.querySelector("#bossDefensePoints");
let bossHeatlh = document.querySelector("#bossHP");
let errorMessage = document.querySelector("#error");
let nbrOfMonsters = 1;
//console.log(monsterType[0].checked + monsterBackground[0].checked)

// Définir les événements
form.addEventListener("submit", validation);
monsterAttack.addEventListener("input", updateFields);
monsterDefense.addEventListener("input", updateFields);
monsterHeatlh.addEventListener("input", updateFields);
// Définir les fonctions
function validation(event) {
  // Vérifier si le formulaire est valide
  // Annuler l'envoi du formulaire
  let errorMessages = [];
  event.preventDefault();
  if (monsterName.value.length > 16) {
    errorMessages.push("Le nom du monstre ne doit pas dépasser 16 caractères");
  }
  if (monsterName.value.length < 3) {
    errorMessages.push("Le nom du monstre doit contenir au moins 3 caractères");
  }

  if (monsterDescription.value.length > 128) {
    errorMessages.push(
      "La description du monstre ne doit pas dépasser 128 caractères"
    );
  }

  if (errorMessages.length > 0) {
    showErrorMessages(errorMessages);
  } else {
    errorMessage.classList.add("hidden");
    create();
    form.reset();
  }
}

function create() {
  if (nbrOfMonsters > 5) {
    showErrorMessages(["Il y a un maximum de 5 monstres!"]);
    return;
  }
  // Créer un élément dans la liste de cartes
  let monsterBackground = document.querySelector(
    "input[name='monsterBackground']:checked"
  );
  let card = document.querySelector("#monsterCard" + nbrOfMonsters);
  let monsterType = document.querySelector("input[name='monsterType']:checked");

  nbrOfMonsters++;

  card.classList.remove("greyBackground");
  card.classList.add(monsterBackground.value + "Background");
  card.innerHTML += "<h3>" + monsterName.value + "</h3>";
  card.innerHTML +=
    '<img src="img/realMonsters/' + monsterType.value + '.png"/>';
  card.innerHTML += "<p>" + monsterDescription.value + "</p>";
}

function updateFields(event) {
  if (!isNaturalNumber(event.target.value)) {
    event.target.value = 0;
  }
  let points =
    parseInt(monsterAttack.value) +
    parseInt(monsterDefense.value) +
    parseInt(monsterHeatlh.value);
  if (points > 10) {
    monsterTotalPoints.classList.add("error");
  }
  monsterTotalPoints.value = points + "/10";
}

//cette fonction a été prise sur stackoverflow
function isNaturalNumber(n) {
  n = n.toString(); // force the value incase it is not
  let n1 = Math.abs(n),
    n2 = parseInt(n, 10);
  return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

function showErrorMessages(message) {
  errorMessage.innerHTML = "";
  for (let i = 0; i < message.length; i++) {
    errorMessage.innerHTML += "<p>" + message[i] + "</p>";
  }
  errorMessage.classList.remove("hidden");
}
