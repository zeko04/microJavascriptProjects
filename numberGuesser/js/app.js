//Game Values
let min = 1, 
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

// UI elements
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guessBtn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click',function(e){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter the number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct YOU WIN!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            gameOver(false, `Game Over you lost. The correct number was ${winningNum}`);
        } else {
            // Game continues answer wrong
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
})

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = 'green';
    setMessage(msg, color);
    // Play again 
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function getWinningNum(min ,max){
    return Math.floor(Math.random()*((max-min+1)+min));
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}