let curUser;
let infobox = document.querySelector('#welcome-text');
let loginBox = document.querySelector('#login');
let inviteBox = document.querySelector('#invite');
let tenueTxt = document.querySelector('#tenue');
let printBtn = document.querySelector('#print-btn');

if(localStorage.getItem("currentUser")) {
    curUser = JSON.parse(localStorage.getItem("currentUser"));
    loggedIn();
} else {
    document.querySelector('#login-btn').addEventListener('click', (e) => {
        e.preventDefault();
        let username = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let form = document.querySelector('#login-form')
        if(username && password) {
            let correct = false;
            users.forEach(x => {
                if(!correct) {
                    if(x.name == username && x.password == password) {
                        correct = true;
                        curUser = x;
                    } else {
                        correct = false;
                    }
                }
            });
            if(correct) {
                loggedIn();
            } else {
                failed();
            }   
        } else {
            failed();
        }
        form.reset();
    });
}

function loggedIn() {
    localStorage.setItem("currentUser", JSON.stringify(curUser));
    infobox.innerHTML = "<h2>Beste " + curUser.name + " " + curUser.lastname + "</h2>";
    inviteBox.style.display = "block";
    loginBox.style.display = "none";
    tenueTxt.innerHTML = curUser.kleding;
    showPrintBtn();
    printBtn.addEventListener('click', printPage);
}

function failed() {
    infobox.innerHTML = "<p class='failed'>Dat heeft niet gewerkt!</p>";
}

function printPage() {
    hideHeader();
    hidePrintBtn();
    setTimeout(function(){
        print();
        showPrintBtn();
        showHeader();
    }, 300);
}

function hideHeader() {
    document.querySelector('header').style.display = "none";
    document.querySelector('#welcome-wrap').style.background = "var(--speel-blue)";
    document.querySelector('#welcome-wrap').style.color = "var(--speel-geel)";
    let ps = document.querySelectorAll('p');
    ps.forEach(x => {
        x.style.fontSize = "22px";
    });
    let lis = document.querySelectorAll('li');
    lis.forEach(x => {
        x.style.fontSize = "22px";
    });
}

function showHeader() {
    document.querySelector('header').style.display = "block";
    document.querySelector('#welcome-wrap').style.background = "#ccc";
    document.querySelector('#welcome-wrap').style.color = "#000";
    let ps = document.querySelectorAll('p');
    ps.forEach(x => {
        x.style.fontSize = "18px";
    });
    let lis = document.querySelectorAll('li');
    lis.forEach(x => {
        x.style.fontSize = "18px";
    });
}

function showPrintBtn() {
    printBtn.style.display = "block";
}

function hidePrintBtn() {
    printBtn.style.display = "none";
}