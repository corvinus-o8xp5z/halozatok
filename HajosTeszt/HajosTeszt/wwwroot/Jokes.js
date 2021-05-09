﻿< !DOCTYPE html >
    <html>
        <head>
            <meta charset="utf-8" />
            <title></title>
        </head>
        <body>
            <form>
                <div id="jokeList"></div>
                <div>
                    <input id="jokeText" type="text" placeholder="Csak PC vicc" />
                </div>
                <button id="addButton">Új vicc felvétele</button>
                <div id="show"></div>
            </form>
            <script>
                document.addEventListener("DOMContentLoaded", x => {

                    fetch("api/jokes").then(x => x.json()).then(x => { showJokes(x) })

                })




        document.getElementById("addButton").addEventListener("click", () => {

                    //Ezt az objektumot fogjuk átküldeni
                    let data = {
                    jokeText: document.getElementById("jokeText").value
            }



            fetch("api/jokes",
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)

                }
            ).then(x => {
                if (x.ok) {
                    alert("Siker");

                }
                else {
                    alert("Kudarc");
                };

            })
        });

            function showJokes(j) {
                    console.log(j)
                for (var i = 0; i < j.length; {
                    console.log(j[i].jokeText)
                    let vicc = document.createElement("div");
                    vicc.innerHTML = j[i].jokeText;
                    document.getElementById("show").appendChild(vicc);
                }
            }


    </script>
        </body>
    </html>