var socket = io();
let scoreboardEl = document.getElementById("scoreboard-container");
let tabEl = document.getElementById("tabs_panel");
let defaultTab = "upyolo";

function addEmojiTab(emoji){
    // Create the container
    let tab = document.createElement("div");
    // Init the tab helper classes
    tab.classList.add("tab")
    tab.id = emoji + "_tab";
    if (emoji != defaultTab)
        tab.classList.add("inactive")
    scoreboardEl.appendChild(tab);

    // Create the tab container button
    let tab_btn = document.createElement("span");
    tab_btn.dataset.tab = emoji;
    tab_btn.classList.add("tab_button");
    tab_btn.textContent = emoji;
    tab_btn.addEventListener("click", changeTab)
    tabEl.appendChild(tab_btn);
    // Return the tab for further modification
    return tab;

}

let ScoreboardCache;
function drawScoreBoard(scoreboard){
    ScoreboardCache = scoreboard;
    scoreboardEl.innerHTML = "";
    tabEl.innerHTML = "";
    // Loop over and create a tab for every score
    for(let emoji in scoreboard){
        let tab = addEmojiTab(emoji);
        let title = document.createElement("h2");
        title.textContent = emoji + " Scores"
        tab.appendChild(title);

        let scoreTable = document.createElement("table");
        scoreTable.innerHTML = `
        <tr>
            <th>Username</th><th>Score</th>
        </tr>
        `
        scoreTable.dataset.emoji = emoji;
        let sortable = [];
        for (let uid in scoreboard[emoji])
            sortable.push([uid, scoreboard[emoji][uid]]);

        let sortedScoreboard = sortable.sort((a, b) => {
            return b[1].score - a[1].score
        });
        for(let i in sortedScoreboard){
            let user = sortedScoreboard[i][1];
            let row = document.createElement("tr");
            row.innerHTML = `
            <td>${user.username}</td><td>${user.score}</td>
            `
            row.dataset.userId = sortedScoreboard[i][0];
            row.dataset.username = user.username;
            row.dataset.score = user.score;
            scoreTable.appendChild(row);
        }
        tab.appendChild(scoreTable);
    }
}

function handleScoreIncrease(scoreObj){
    if (ScoreboardCache[scoreObj.emoji][scoreObj.uid] == undefined)
        return;
    ScoreboardCache[scoreObj.emoji][scoreObj.uid]["score"] += 1;
    drawScoreBoard(ScoreboardCache);
}

function handleScoreIncrease_old(scoreObj) {
    // Recieves Object { uid: "333007839637536771", emoji: "upyolo" }
    // Get the correcct row
    // let table = document.querySelectorAll(`table[data-emoji="${scoreObj.emoji}"] > tr`) // For shure hackish
    // let rows = [...table].filter((el) => {
    //     return el.dataset.userId == scoreObj.uid
    // });
    // if (rows.length == 0) {
    //     // TODO: Handle
    //     return;
    // }
    // let row = rows[0];
    // let score = parseInt(row.dataset.score);
    // let nscore = score + 1;
    // row.dataset.score = nscore;

    // row.childNodes[2].textContent = nscore;
    // console.log(row);
}

socket.on("scoreboard", drawScoreBoard);