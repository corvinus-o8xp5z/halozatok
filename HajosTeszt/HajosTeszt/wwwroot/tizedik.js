window.onload = function () {
    fetch("questions/count").then(x => x.text()).then(x => { sz = parseInt(x) })
    document.getElementById("back").onclick = function Vissza() {
        displayedQuestion--;
        if (displayedQuestion < 0) displayedQuestion = (questionsInHotList - 1);
        kérdésMegjelenítés();
    }
    document.getElementById("next").onclick = function Előre() {
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés();
    }
    init();
    init()
}


@@ -23, 6 + 13, 20 @@ var questionsInHotList = 7; 
var displayedQuestion;    
var numberOfQuestions;      
var nextQuestion = 1;
var TimerHandler;

function Előre() {
    clearTimeout(TimerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}
function Vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = (questionsInHotList - 1);
    kérdésMegjelenítés();
}

function letöltésBefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    @@ -48, 24 + 52, 9 @@function kérdésMegjelenítés() {
        válasz1.classList.remove("jó", "rossz");
        válasz2.classList.remove("jó", "rossz");
        válasz3.classList.remove("jó", "rossz");
        document.getElementById("válaszok").style.pointerEvents = "auto";
    }

   

    function init() {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
@@ -74, 12 + 63, 32 @@function init() {
            }
            hotList[i] = q;
        }
        
        document.getElementById("next").addEventListener("click", Előre);
        document.getElementById("back").addEventListener("click", Vissza);

        
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
            if (localStorage.getItem("hotList")) {
                hotList = JSON.parse(localStorage.getItem("hotList"));
            }

            if (localStorage.getItem("displayedQuestion")) {
                displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
            }

            if (localStorage.getItem("nextQuestion")) {
                nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
            }

            if (hotList.length > 0) {
                for (var i = 0; i < questionsInHotList; i++) {
                    kérdésBetöltés(nextQuestion, i);
                    nextQuestion++;
                }
            }
            else {
                kérdésMegjelenítés();
            }

        }
        function kérdésBetöltés(questionNumber, destination) {
            fetch(`/questions/${questionNumber}`)
            @@ -110, 8 + 119, 21 @@function kérdésBetöltés(questionNumber, destination) {
                válasz = function (n) {
                    if (jóVálasz == n) {
                        document.getElementById("válasz" + n).classList.add("jó");
                        hotList[displayedQuestion].goodAnswers++;
                        if (hotList[displayedQuestion].goodAnswers == 3) {
                            kérdésBetöltés(nextQuestion, displayedQuestion);
                            nextQuestion++;
                        }
                    }
                    else {
                        document.getElementById("válasz" + n).classList.add("rossz");
                        hotList[displayedQuestion].goodAnswers = 0;

                    }
                    document.getElementById("válaszok").style.pointerEvents = "none";
                    TimerHandler = setTimeout(Előre, 3000);

                    localStorage.setItem("hotList", JSON.stringify(hotList));
                    localStorage.setItem("displayedQuestion", displayedQuestion);
                    localStorage.setItem("nextQuestion", nextQuestion);
                } 