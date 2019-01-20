const ok = document.querySelector(".ok");
const gracz1 = document.getElementById('gracz1')
const gracz2 = document.getElementById('gracz2')
const welcome = document.querySelector(".welcome");
const gray = document.querySelector(".gray");


const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const player1 = document.querySelector(".gracz1 h2");
const player2 = document.querySelector(".gracz2 h2");
const player1text = document.querySelector(".gracz1 h2").textContent;
const player2text = document.querySelector(".gracz2 h2").textContent;
let dices1 = document.querySelector(".dices1");
let dices2 = document.querySelector(".dices2");
const pkt1 = document.querySelector("p.pkt1 span");
const pkt2 = document.querySelector("p.pkt2 span");
const star = document.querySelector(".star");
const btnnew = document.querySelector(".new");

ok.addEventListener('click', function () {
    player1.textContent = gracz1.value;
    player2.textContent = gracz2.value;
    if (gracz1.value == "" || gracz2.value == "") {
        alert("Nie podano imienia gracza!");
    } else {
        welcome.classList.add("hidden");
        gray.classList.add("hidden");
    }
})

const getRzut = () => {
    const rundomNumber = () => Math.floor(Math.random() * 6 + 1);
    return [...new Array(5)].map(rundomNumber);
}

const getScore = (rzut) => {
    const score = rzut.reduce((a,b) => a + b, 0);
    return score;
}


const createTableWithDices = (dices, rzut) => {
    for (i = 1; i < 6; i++) {
        const kostka = document.createElement("div");
        dices.appendChild(kostka);
        kostka.innerHTML = `<div class='dice1_${i}'><img src='dice${rzut[i-1]}.png'></div>`;
        const dice = document.querySelector(".dice1_" + i);
        dice.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
    }
}

const trol1 = {
    score: 0
}
const trol2 = {
    score: 0
}

const showResult = () => {
    star.classList.remove("hidden");
    btnnew.classList.remove("hidden");

    if (trol1.score > trol2.score) {
        document.querySelector(".wynik p").innerHTML = `Wygrał gracz: ${player1.textContent} ${trol1.score} vs ${trol2.score}`
    } else if (trol2.score > trol1.score) {
        document.querySelector(".wynik p").innerHTML = `Wygrał gracz: ${player2.textContent} ${trol2.score} vs ${trol1.score}`
    } else if (trol2.score == trol1.score) {
        document.querySelector(".wynik p").innerHTML = `REMIS ${trol2.score} vs ${trol1.score}`
    }
}


const handler = (trol, pkt, dices) => {
    const rzut = getRzut();
    score = getScore(rzut);
    pkt.textContent = score;
    trol.score = score;
    createTableWithDices(dices, rzut);
    showResult();
}

const startListening = () => {
    btn1.addEventListener("click", function test() {
        handler(trol1, pkt1, dices1);
        btn1.removeEventListener("click", test);
    });
    btn2.addEventListener("click", function test() {
        handler(trol2, pkt2, dices2);
        btn2.removeEventListener("click", test);
    });
}
    
startListening();

star.addEventListener("click", function () {
    startListening();
    trol1.score = 0;
    trol2.score = 0;
    dices1.innerHTML = "";
    dices2.innerHTML = "";
    pkt1.textContent = "";
    pkt2.textContent = "";
    document.querySelector(".wynik p").innerHTML = "";
})

btnnew.addEventListener('click', function () {
    location.reload()
})