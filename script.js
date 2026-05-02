var t = 1;
var r = 0;
var fixActive = false;
var names = ["Emilia", "Abby", "Vivie", "Audrey", "Billie", "Olivia", "Mae", "Rosie"];
var spinnerBtn = document.getElementById('spinnerBtn');
var logTxt = document.getElementById('logTxt');
function appendLine(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    div.classList.add('fade-in');
    logTxt.appendChild(div);
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
spinnerBtn.addEventListener('click', async function() {
    spinnerBtn.style.backgroundColor = '#cccccc';
    spinnerBtn.disabled = true;
    spinnerBtn.innerHTML = "<b>PICKING...</b>";
    if (r == 0) { // rotation 0 = team name + pick one person
        appendLine("<br><b>Team " + t + "</b>");
        await sleep(2000);
        randomIndex = Math.floor(Math.random() * names.length);
        appendLine(names[randomIndex]);
        if (names[randomIndex] == "Emilia" || names[randomIndex] == "Abby") {
            fixActive = true;
        }
        names.splice(randomIndex, 1);
        r = 1;
        spinnerBtn.style.backgroundColor = '#72a14c';
        spinnerBtn.disabled = false;
        spinnerBtn.innerHTML = "<b>PICK</b>";
    }
    else if (r == 1) { // rotation 1 = pick other person
        if (fixActive) {
            await sleep(2000);
            appendLine(names[0]);
            names.splice(0, 1);
            r = 0;
            t++;
            fixActive = false;
        }
        else {
            randomIndex = Math.floor(Math.random() * names.length);
            while (names[randomIndex] == "Emilia" || names[randomIndex] == "Abby") {
                randomIndex = Math.floor(Math.random() * names.length);
            }
            await sleep(2000);
            appendLine(names[randomIndex]);
            names.splice(randomIndex, 1);
            r = 0;
            t++;
        }
        spinnerBtn.style.backgroundColor = '#72a14c';
        spinnerBtn.disabled = false;
        spinnerBtn.innerHTML = "<b>PICK</b>";
    }
    if (t > 4) {
        spinnerBtn.disabled = true;
        spinnerBtn.style.backgroundColor = '#cccccc';
        spinnerBtn.innerHTML = "<b>DONE</b>";
    }
});