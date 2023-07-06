// obiekty graczy
let p1, p2;
if(localStorage.getItem("player1") != null && localStorage.getItem("player2") != null){
  p1 = JSON.parse(localStorage.getItem("player1"));
  p2 = JSON.parse(localStorage.getItem("player2"));
}else{
  p1 = {
    name: "Player 1",
    type: "X",
    score: 0
  };
  p2 = {
    name: "Player 2",
    type: "O",
    score: 0
  };
}
// console.log(p1.name);

// zmienne globlane
let activePlayer = p1;
let gameEnd = 0;

// funkcje gry
const game = (event) => {
  if(gameEnd){
    return
  }
  if (event.target.textContent == "_") {
    event.target.textContent = activePlayer.type;
    event.target.classList.remove("hidden")
    console.log(activePlayer.name);
    console.log(activePlayer.type);
    checkField();
    changePlayer();
  }
};
const changePlayer = () => {
  const activePlayerTitle = document.querySelector(".active-player");
  if (activePlayer == p1) {
    activePlayer = p2;
    activePlayerTitle.textContent = activePlayer.name
  } else {
    activePlayer = p1;
    activePlayerTitle.textContent = activePlayer.name
  }
};

const checkField = () => { // sprawdzanie pola 
  const gameArray = Array();
  gameField.forEach((element) => {
    gameArray.push(element.textContent);
  });
  let fullField = 0;

  for (let i = 0; i < gameArray.length; i += 3) {
    if (gameArray[i] != "_") {
      if (gameArray[i] === gameArray[i + 1] && gameArray[i + 1] === gameArray[i + 2]) {
        displayWinner();

        // dodanie kresek
        gameField[i].classList.add("checked--1") 
        gameField[i+1].classList.add("checked--1")
        gameField[i+2].classList.add("checked--1")
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    if (gameArray[i] != "_") {
      if (gameArray[i] === gameArray[i + 3] && gameArray[i + 3] === gameArray[i + 6]) {
        displayWinner();
        
        // dodanie kresek
        gameField[i].classList.add("checked--2") 
        gameField[i+3].classList.add("checked--2")
        gameField[i+6].classList.add("checked--2")
      }
    }
  }
  if (gameArray[4] != "_") {
    if(gameArray[0] == gameArray[4] && gameArray[4] == gameArray[8]){
      displayWinner();
      
      // dodanie kresek
      document.querySelector(".board").classList.add("checked--3")
      
    }
    if(gameArray[2] == gameArray[4] && gameArray[4] == gameArray[6]){
      displayWinner();

      // dodanie kresek
      document.querySelector(".board").classList.add("checked--4")
    }
  }
  // sprawdzenie czy jest remis
  if(!gameEnd){
    fullField = 1
    for(let i = 0; i< gameArray.length; i++){
      if(gameArray[i] == "_"){
        fullField = 0;
      }
    }
    if(fullField == 1){
      const result = document.querySelector(".result")
      result.textContent = `Remis!`
      showResult();
      // activePlayer.score += 1;
      // displayPlayerInfo();
      gameEnd = 1;
    }
  }
  
  console.log(gameArray);
};

const displayWinner = () =>{ // kończy grę, aktualizuje liczbę wygranych
  const result = document.querySelector(".result")
  result.textContent = `Wygrywa ${activePlayer.name}`
  showResult();
  activePlayer.score += 1;
  displayPlayerInfo();
  gameEnd = 1;
  localStorage.setItem("player1", JSON.stringify(p1))
  localStorage.setItem("player2", JSON.stringify(p2))
}

const showResult = () =>{ // usuwa niewidzialość z result
  let result = document.querySelector(".result");
  result.style.visibility = 'visible';
}
const playAgain = () =>{ // funkcja do ponownej gry
  let result = document.querySelector(".result");
  result.style.visibility = 'hidden';

  gameEnd = 0;
  activePlayer = p1;
  gameField.forEach((field) => {
    field.textContent = "_";
    field.classList.add("hidden");
    field.classList.remove("checked--1") 
    field.classList.remove("checked--2") 
  })
  
  const board = document.querySelector(".board")
  board.classList.remove("checked--3")
  board.classList.remove("checked--4")
  displayPlayerInfo(); 
}


// funkcja do wyświetlania informacji o graczach
const displayPlayerInfo = () =>{
  const activePlayerTitle = document.querySelector(".active-player");
  activePlayerTitle.textContent = activePlayer.name;
  // wyświetlanie nazw graczy
  const playerTitles = document.querySelectorAll('.player-title');
  playerTitles[0].textContent = `Nazwa: ${p1.name}`;
  playerTitles[1].textContent = `Nazwa: ${p2.name}`;

  // wyświetlanie liczby wygranych
  const playerScores = document.querySelectorAll(".score");
  playerScores[0].textContent = p1.score;
  playerScores[1].textContent = p2.score;

  const palyerTypes = document.querySelectorAll(".type")
  palyerTypes[0].textContent = p1.type;
  palyerTypes[1].textContent = p2.type;

}

const clear =()=>{
  p1 = {
    name: "Player 1",
    type: "X",
    score: 0
  };
  p2 = {
    name: "Player 2",
    type: "O",
    score: 0
  };
  localStorage.setItem("player1", JSON.stringify(p1))
  localStorage.setItem("player2", JSON.stringify(p2))
  playAgain();
  displayPlayerInfo();
}

// dodanie eventu na puste pola
const gameField = document.querySelectorAll(".field");
gameField.forEach((field) => {
  field.addEventListener("click", game);
});

//
const playAgainBtn = document.querySelector(".play-again-btn");
playAgainBtn.addEventListener("click", playAgain);

const clearBtn = document.querySelector(".clear-btn")
clearBtn.addEventListener("click", clear)

// wywołanie funkcji
displayPlayerInfo();

// modal
const editNameBtn = document.querySelectorAll(".btn-name-change");
const changeModal = document.querySelectorAll(".name-change-modal");
const closeEditName = document.querySelectorAll(".close-btn");
const confirmBtn = document.querySelectorAll(".confirm-btn");



editNameBtn.forEach(btn=>{
  btn.addEventListener("click", (event)=>{
    event.currentTarget.nextElementSibling.showModal();
  })
})
closeEditName.forEach(btn=>{
  btn.addEventListener("click",e=>{
    // console.log( e.target.parentElement);
    e.target.parentElement.close();
  })
})

confirmBtn.forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    // console.log(btn.dataset.id);
    const nameFields = document.querySelectorAll('.name-change');
    const errorMessages = document.querySelectorAll('.error-msg');
    const id = Number(btn.dataset.id)
    // console.log(nameFields[id-1].value);
    if(nameFields[id-1].value == ""){
      errorMessages[id-1].textContent = "Nie podałeś nowej nazwy użytkownika"
    }else{
      if(id == 1){
        p1.name = nameFields[id-1].value
        localStorage.setItem("player1", JSON.stringify(p1))
      }else{
        p2.name = nameFields[id-1].value
        localStorage.setItem("player2", JSON.stringify(p2))
      }
      errorMessages[id-1].textContent =""
      displayPlayerInfo();
      e.target.parentElement.close();
    }
  })
})






// css

// animacja wygrania
// dodać confirma do cleara

// dodać jakiś font jeszcze
// wysłać na github'a