"use strict";

// Initialiser les cartes vides
initCards();

// Définir les variables
let form = document.querySelector("#monsterForm");
let monsterName = document.querySelector("#monsterName");
let monsterDescription = document.querySelector("#monsterDescription");
let monsterAttack = document.querySelector("#attackPoints");
let monsterDefense = document.querySelector("#defensePoints");
let monsterHealth = document.querySelector("#healthPoints");
let monsterTotalPoints = document.querySelector("#totalPoints");
//let generatorButton = document.querySelector("#generator");
let bossAttack = document.querySelector("#bossAttackPoints");
let bossDefense = document.querySelector("#bossDefensePoints");
let bossHealth = document.querySelector("#bossHP");
let errorMessage = document.querySelector("#error");
let nbrOfMonsters = 0;
let monster1 = document.querySelector("#monster1");
let monster2 = document.querySelector("#monster2");
let monster3 = document.querySelector("#monster3");
let monster4 = document.querySelector("#monster4");
let monster5 = document.querySelector("#monster5");
let monsterNames = [];

// Définir les événements
form.addEventListener("submit", validation);
monsterAttack.addEventListener("input", updateFields);
monsterAttack.addEventListener("change", updateFields);
monsterDefense.addEventListener("input", updateFields);
monsterAttack.addEventListener("change", updateFields);
monsterHealth.addEventListener("input", updateFields);
monsterAttack.addEventListener("change", updateFields);
//generatorButton.addEventListener("click", generate);
monster1.addEventListener("click", attack);
monster2.addEventListener("click", attack);
monster3.addEventListener("click", attack);
monster4.addEventListener("click", attack);
monster5.addEventListener("click", attack);
/*
async function generate(event) {
  await generateMonster();
  monsterName.value = monsterNameGenerated;
  monsterDescription.value = monsterDescriptionGenerated;
}
*/

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
  if (monsterNames.includes(monsterName.value)) {
    errorMessages.push("Le nom du monstre doit être unique");
  }
  if (monsterDescription.value.length > 128) {
    errorMessages.push(
      "La description du monstre ne doit pas dépasser 128 caractères"
    );
  }
  if (
    parseInt(monsterAttack.value) +
      parseInt(monsterDefense.value) +
      parseInt(monsterHealth.value) >
    10
  ) {
    errorMessages.push(
      "Le total des points d'attaque, de défense et de vie ne doit pas dépasser 10"
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
  nbrOfMonsters++;
  if (nbrOfMonsters > 5) {
    showErrorMessages(["Il y a un maximum de 5 monstres!"]);
    return;
  }
  // Créer un élément dans la liste de cartes
  let monsterBackground = document.querySelector(
    "input[name='monsterBackground']:checked"
  );
  let card = document.querySelector("#monster" + nbrOfMonsters);
  let monsterType = document.querySelector("input[name='monsterType']:checked");

  card.classList.remove("greyBackground");
  if (monsterAttack.value == "") {
    monsterAttack.value = 0;
  }
  if (monsterDefense.value == "") {
    monsterDefense.value = 0;
  }
  if (monsterHealth.value == "") {
    monsterHealth.value = 0;
  }
  card.classList.add(monsterBackground.value + "Background");
  card.innerHTML += "<h3>" + monsterName.value + "</h3>";
  monsterNames.push(monsterName.value);
  card.innerHTML +=
    '<img src="img/realMonsters/' + monsterType.value + '.png"/>';
  card.innerHTML += "<p>" + monsterDescription.value + "</p>";
  card.innerHTML +=
    '<div class="stats"> <div class="stat"> <img src="img/blade.svg" alt="" /> <p id="monster' +
    nbrOfMonsters +
    'Attack">' +
    monsterAttack.value +
    '</p> </div> <div class="stat"> <img src="img/shield.svg" alt="" /> <p id="monster' +
    nbrOfMonsters +
    'Defense">' +
    monsterDefense.value +
    '</p> </div> <div class="stat"> <img src="img/heart.svg" alt="" /> <p id="monster' +
    nbrOfMonsters +
    'Health">' +
    monsterHealth.value +
    "</p> </div> </div>";
}

function initCards() {
  for (let i = 1; i <= 5; i++) {
    let cardsSection = document.querySelector("#monsterCards");
    cardsSection.innerHTML +=
      "<div class='monsterCard greyBackground' id='monster" + i + "'></div>";
  }
}

function updateFields(event) {
  if (!isNaturalNumber(event.target.value) && event.target.value != 0) {
    event.target.value = 0;
  }
  let points =
    parseInt(monsterAttack.value) +
    parseInt(monsterDefense.value) +
    parseInt(monsterHealth.value);
  if (points > 10) {
    monsterTotalPoints.classList.add("error");
  } else {
    monsterTotalPoints.classList.remove("error");
  }
  if (isNaN(points)) {
    monsterTotalPoints.value = "0/10";
  } else {
    monsterTotalPoints.value = points + "/10";
  }
}

function attack(event) {
  let currentCard = event.currentTarget;

  if (!currentCard.classList.contains("greyBackground")) {
    let cardIdCurrent = event.currentTarget.id;
    let monsterHealth = document.querySelector("#" + currentCard.id + "Health");
    let monsterAttack = document.querySelector("#" + currentCard.id + "Attack");
    let monsterDefense = document.querySelector(
      "#" + currentCard.id + "Defense"
    );
    let bossHealth = document.querySelector("#bossHP");
    let bossAttack = document.querySelector("#bossAttackPoints");
    let bossDefense = document.querySelector("#bossDefensePoints");

    let totalMonsterAttackToBoss =
      parseInt(monsterAttack.textContent) - parseInt(bossDefense.textContent);

    let totalBossAttackToMonster =
      parseInt(bossAttack.textContent) - parseInt(monsterDefense.textContent);

    if (totalMonsterAttackToBoss < 0) {
      totalMonsterAttackToBoss = 0;
    }
    if (totalBossAttackToMonster < 0) {
      totalBossAttackToMonster = 0;
    }

    bossHealth.textContent =
      parseInt(bossHealth.textContent) - parseInt(totalMonsterAttackToBoss);

    monsterHealth.textContent =
      parseInt(monsterHealth.textContent) - parseInt(totalBossAttackToMonster);

    if (bossHealth.textContent <= 0) {
      bossHealth.textContent = 0;
      document.querySelector("#boss").classList.add("dead");
    }

    if (monsterHealth.textContent <= 0) {
      monsterHealth.textContent = 0;
      event.currentTarget.classList.add("dead");
      event.currentTarget.removeEventListener("click", attack);
    }
  }
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
