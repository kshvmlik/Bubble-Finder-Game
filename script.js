var timer;
var score = 0;
var rn;
var maxScore = localStorage.getItem('maxScore') ? parseInt(localStorage.getItem('maxScore')) : 0;
var difficulty;

document.querySelector("#maxscoreval").textContent = maxScore;

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
    updateMaxScore();
}

function decreaseScore() {
    score -= 2;
    document.querySelector("#scoreval").textContent = score;
}

function updateMaxScore() {
    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem('maxScore', maxScore);
        document.querySelector("#maxscoreval").textContent = maxScore;
    }
}

function getNewHit() {
    rn = Math.floor(Math.random() * difficulty) + 1;
    document.querySelector("#hitval").textContent = rn;
}

function makeBubble() {
    var clutter = "";
    var k = document.querySelector("#hitval").textContent;

    for (var i = 0; i < 80; i++) {
        var num = Math.floor(Math.random() * difficulty) + 1;
        clutter += `<div class="bubble">${num}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer() {
    var timerFun = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timeint").textContent = timer;
        } else {
            clearInterval(timerFun);
            document.querySelector("#pbtm").innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); animation: fadeIn 1s ease-in-out;">
                <h1 style="font-size: 2em; color: rgb(0, 102, 204);">Game Over</h1>
                <h2 style="font-size: 1.5em; color: rgb(0, 51, 102);">FINAL SCORE: ${score}</h2>
            </div>
        `;
                }
    }, 1000);
}

document.querySelector("#pbtm").addEventListener("click", function (dets) {
    var clickedNum = Number(dets.target.textContent);
    if (rn === clickedNum) {
        increaseScore();
        getNewHit();
    } else {
        decreaseScore();
        getNewHit();
    }
});

document.querySelector("#start-button").addEventListener("click", function () {
    var timeInput = document.querySelector("#time-input").value;
    difficulty = parseInt(document.querySelector("#difficulty").value);
    if (timeInput && !isNaN(timeInput) && timeInput > 0) {
        timer = parseInt(timeInput);
        document.querySelector("#timeint").textContent = timer;
        score = 0;
        document.querySelector("#scoreval").textContent = score;
        getNewHit();
        makeBubble();
        runTimer();
    } else {
        alert("Please enter a valid time in seconds.");
    }
});

// Background bubbles
for (var i = 0; i < 20; i++) {
    var bubble = document.createElement('div');
    bubble.classList.add('background-bubble');
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;
    document.getElementById('main').appendChild(bubble);
}
