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
const dices = [1, 2, 3, 4, 5, 6];
let dices1 = document.querySelector(".dices1");
let dices2 = document.querySelector(".dices2");
const pkt1 = document.querySelector("p.pkt1 span");
const pkt2 = document.querySelector("p.pkt2 span");
const star = document.querySelector(".star");
const btnnew = document.querySelector(".new");
let players = 0;
let player1score = 0;
let player2score = 0;

ok.addEventListener('click', function () {
    player1.textContent = gracz1.value;
    player2.textContent = gracz2.value;
    if (gracz1.value == "" || gracz2.value == "") {
        alert("Nie podano imienia gracza!");
    } else if (gracz1.value === gracz2.value) {
        alert("Nazwy graczy są takie same!");
    } else {
        welcome.classList.add("hidden");
        gray.classList.add("hidden");
    }
})

const rzut1 = function (player) {

    console.log(player);
    players++;
    const losowanie = [1, 1, 1, 1, 1];
    const rzut = losowanie.map((x) => {
        return (x * (Math.floor(Math.random() * 6 + 1)))
    });

    console.log(rzut)

    if (player == 1) {

        for (i = 1; i < 6; i++) {
            const kostka = document.createElement("div");
            dices1.appendChild(kostka);
            kostka.innerHTML = `<div class='dice${player}_${i}'><img src='dice${rzut[i-1]}.png'></div>`;
            let dice = document.querySelector(`.dice${player}_` + i);
            dice.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
        }

        player1score = rzut.reduce(function (prev, next) {
            return prev + next;
        });

        pkt1.textContent = player1score;
        btn1.removeEventListener("click", rzut1);

    } else if (player == 2) {
        for (i = 1; i < 6; i++) {
            const kostka = document.createElement("div");
            dices2.appendChild(kostka);
            kostka.innerHTML = `<div class='dice${player}_${i}'><img src='dice${rzut[i-1]}.png'></div>`;
            let dice = document.querySelector(`.dice${player}_` + i);
            dice.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
        }
        player2score = rzut.reduce(function (prev, next) {
            return prev + next;
        });

        pkt2.textContent = player2score;
        btn2.removeEventListener("click", rzut1);
    }
    if (players == 2) {
        star.classList.remove("hidden");
        btnnew.classList.remove("hidden");

        if (player1score > player2score) {
            document.querySelector(".wynik p").innerHTML = `Wygrał gracz: ${player1.textContent} ${player1score} vs ${player2score}`
        } else if (player2score > player1score) {
            document.querySelector(".wynik p").innerHTML = `Wygrał gracz: ${player2.textContent} ${player2score} vs ${player1score}`
        } else if (player2score == player1score) {
            document.querySelector(".wynik p").innerHTML = `REMIS ${player2score} vs ${player1score}`
        }
    }
}

const element = "";
btn1.addEventListener("click", rzut1.bind(element, 1));
btn2.addEventListener("click", rzut1.bind(element, 2));

star.addEventListener("click", function () {
    btn1.addEventListener("click", rzut1);
    btn2.addEventListener("click", rzut1);
    players = 0;
    player1score = 0;
    player2score = 0;
    dices1.innerHTML = "";
    dices2.innerHTML = "";
    pkt1.textContent = "";
    pkt2.textContent = "";
    document.querySelector(".wynik p").innerHTML = "";
})

btnnew.addEventListener('click', function () {
    location.reload()
})