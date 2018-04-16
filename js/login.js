let curUser;

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

let infobox = document.querySelector('#welcome-text');
let loginBox = document.querySelector('#login');
let inviteBox = document.querySelector('#invite');
let tenueTxt = document.querySelector('#tenue');

function loggedIn() {
    infobox.innerHTML = "<p>Beste " + curUser.name + " " + curUser.lastname + "</p>";
    inviteBox.style.display = "block";
    loginBox.style.display = "none";
    tenueTxt.innerHTML = curUser.kleding;
}

function failed() {
    infobox.innerHTML = "<p class='failed'>Dat heeft niet gewerkt!</p>";
}