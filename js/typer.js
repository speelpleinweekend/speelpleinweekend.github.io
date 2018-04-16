// This is an automatic typer that can be used on your website.
// ***************INSTRUCTIONS***************
// Add following line of code to the bottom of your HTML page:
// <script src="pathtothisfile (eg. /js/typer.js)></script>"
// 
// In your HTML document add following line where you need/want it:
// <p id="typer"></p> (this can be whatever text element you want it to be).
// 
// To your CSS file add this:
// .cursor {
//     animation: cursorflash 0.5s ease infinite;
//     font-weight: bold;
// }
// /*This will make the cursor flash*/
// @keyframes cursorflash {
//     0% {opacity: 0}
//     50% {opacity: 1}
//     100% {opacity: 0}
// }
// 
// How to start the thing:
// In a script use:
// new Typer(Array of String(s) you want it to type, Do you want a loop?, Speed of typing, Speed of backspacing, Automatic start?, What cursor do you want?, What element do I type in?);
// eg: new Typer(["Welcome!", "This thing type's on its own!?"], true, 100, 70, true, "|", "#typer");
// 
// ***************END OF INSTRUCTIONS***************
// 
// Feel free to do whatever you want with the code since it's open-source.
// 
// @author: Lenny Claes
// @version: 0.3.0
// 
// Enjoy!

let typer;
let input;
let looped;
let f_speed;
let b_speed;
let letterIndex;
let wordIndex;
let tmpWord;
let goingBack;
let typeInterval;
let speed;
let auto;
let cursor

function Typer(inputList, loop, fspeed, bspeed, autoStart, cursorType, elt) {
    typer =  document.querySelector(elt);
    input = inputList;
    looped = loop;
    f_speed = fspeed;
    b_speed = bspeed;
    letterIndex = 0;
    wordIndex = 0;
    tmpWord = "";
    goingBack = false;
    typeInterval;
    speed = getSpeed();
    auto = autoStart;
    cursor = cursorType || "";
    if(validate()) {
        if(auto) {
            startType();
        } else {
            console.warn("TyperJS says: Waiting for you to give the start signal...");
        }
    }

    function startType() {
        speed = getSpeed();
        if(validate()) {
            typeInterval = setInterval(() => {
                if(!goingBack) {
                    pressKey();
                } else {
                    backspace();
                }
            }, speed);
        }
    }

    function getSpeed() {
        let theSpeed;

        if(!goingBack) {
            theSpeed = f_speed;
        } else {
            theSpeed = b_speed;
        }
        return theSpeed;
    }

    function validate() {
        var valid = false;
        
        if(Array.isArray(inputList)) {
            if(inputList.length === 0) {
                valid = false;
                console.error("TyperJS says: No input was given to type.");
            } else {
                valid = true;
            }
        } else {
            valid = false;
            console.error("TyperJS says: The text should be given as an array.");
        }
        
        return valid;
    }

    function pressKey() {
        tmpWord += input[wordIndex].substring(letterIndex, letterIndex + 1);
        letterIndex++;
        typer.innerHTML = tmpWord + '<span class="cursor">' + cursor + '</span>';
        if(tmpWord == input[wordIndex]) {
            clearInterval(typeInterval);
            setTimeout(startType, input[wordIndex].length * 150);
            goingBack = true;
        }
    }

    function backspace() {
        tmpWord = "";
        goingBack = true;
        tmpWord = input[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        typer.innerHTML = tmpWord + '<span class="cursor">' + cursor + '</span>';
        if (letterIndex <= 0) {
            clearInterval(typeInterval);
            goingBack = false;
            finished();
        }
    }

    function finished() {
        let finished = false;

        if(loop) {
            if(wordIndex == input.length - 1) {
                wordIndex = 0;
                finished = false;
                //console.error("TyperJS says: can't finish when looped.");
            } else {
                finished = false;
                wordIndex++;
            }

            startType();
        } else {
            if(wordIndex == input.length - 1) {
                clearInterval(typeInterval);
                wordIndex = 0;
                finished = true;
            } else {
                finished = false;
                wordIndex++;
                startType();
            }
        }

        return finished;
    }

    function stopTyping() {
        clearInterval(typeInterval);
    }
}