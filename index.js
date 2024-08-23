let numberSquance = [];
let userSquance = [];
let toggle = true;
let dontCheckFrom,dontCheckTo;
let moves = 1

function randomNumber(){
    while(numberSquance.length < 4){
        let randomNumber = Math.floor((Math.random() * 10));
        if(!numberSquance.includes(randomNumber))
            numberSquance.push(randomNumber);
    }
}

randomNumber();
function generateTryItBtn(){
    if (numberSquance.length === userSquance.length){
        const tryItCode = `<button id="check" onclick="check(); resetNumbers();">Try it</button>
        <button class="cancelBsideTry" onclick="cancelBtnFunction();">Cancel</button>`;
        $("#tryIt").html(tryItCode);
        $(".item").remove();
    }
};


function cancelBtnFunction(){
    userSquance = [];
    $(".currentNumber").text(" ");
    $(".cancelBsideTry").remove();
    $("#check").remove();
    resetNumbers();
};

function cancelProgressBtn(){
    userSquance = [];
    $(".currentNumber").text(" ");
    $(".cancelBtn").remove();
    resetNumbers();
};

function generateCurrentNum(){
    if (userSquance.length == 1){
        $(".currentNumber").text(`Current number: ${userSquance[0]}`);
        const cancelBtn = `<button class="cancelBtn" onclick="cancelProgressBtn();">Cancel</button>`;
        $(".currentNumber").after(cancelBtn);
    }
    if (userSquance.length == 2){
        $(".currentNumber").text(`Current number: ${userSquance[0]}${userSquance[1]}`);
    }
    if (userSquance.length == 3){
        $(".currentNumber").text(`Current number: ${userSquance[0]}${userSquance[1]}${userSquance[2]}`);
    }
    if (userSquance.length == 4){
        $(".currentNumber").text(`Current number: ${userSquance[0]}${userSquance[1]}${userSquance[2]}${userSquance[3]}`);
        $(".cancelBtn").remove();
    }
};

$(".item").click(function(){
    let userChosenNumber = +$(this).attr("id");
    userSquance.push(userChosenNumber);
    $(this).remove();
    generateCurrentNum();
    generateTryItBtn();
});

function resetNumbers(){
    $(".item").remove();
    let numbers = `        
        <button id="1" class="item">1</button>
        <button id="2" class="item">2</button>
        <button id="3" class="item">3</button>
        <button id="4" class="item">4</button>
        <button id="5" class="item">5</button>
        <button id="6" class="item">6</button>
        <button id="7" class="item">7</button>
        <button id="8" class="item">8</button>
        <button id="9" class="item">9</button>
        <button id="0" class="item">0</button>`;
    $("#board").html(numbers);
    $(".item").click(function(){
        // The + sgin to parse from string to int
        let userChosenNumber = +$(this).attr("id");
        userSquance.push(userChosenNumber);
        $(this).remove();
        generateCurrentNum();
        generateTryItBtn();
    });
}

$(".restart").click(function(){
    userSquance = [];
    numberSquance = [];
    randomNumber();
    $(".currentNumber").text(" ");
    $(".cancelBsideTry").remove();
    $(".cancelBtn").remove();
    $("#check").remove();
    $("#generator > #table").remove();
    moves = 1;
    resetNumbers();
});

$(".imgInfo").click(function(){
    if (toggle){
        $("#info").html(`Guess The Number is a game where you must use your logic in order to guess a 4-digit secret number selected by the computer at the beginning of the game. The number is formed with digits from 0 to 9; each digit appears once at most.<br><br>

            This number is guessed by you via multiple attempts. An attempt consists in a guessed number, selected by you, and the computer's reply. The computer must tell you, in his reply, how many digits have you guessed on the same position, and how many digits have you guessed on a different position.<br><br>
        
            You must guess the number using as few moves as possible. Good luck!`);
            toggle = false;
    }
    else {
        $("#info").html(``);
        toggle = true;
    }
});

function check(){
    let samePositionCount = 0, differentPositionCount = 0;
    for(let i = 0; i<4; i++){
        if (numberSquance[i] == userSquance[i])
            samePositionCount++;
    }
    for(let i = 0;i<4; i++){
        for (let k = 0; k<4; k++){
            dontCheckFrom = k;
            dontCheckTo = i;
            if (numberSquance[i] == userSquance[k] && dontCheckFrom != dontCheckTo){
                differentPositionCount++;
            }
        }
    }


    let guessedNumber;
    guessedNumber = userSquance.join("");
    
    const generateTable = 
        `<table id="table" class="content-table" bgcolor="#FFD369">
                <tr bgcolor="#222831">
                    <th>Moves</th>
                    <th>Guessed Number</th>
                    <th>Results</th>
                </tr>
                <tr bgcolor="#222831">
                    <td> ${moves} </td>
                    <td>${guessedNumber}</td>
                    <td>${samePositionCount} Same Position<br>${differentPositionCount} Different Position</td>
                </tr>
        </table>`;
    $("#generator").prepend(generateTable);
    moves++;
    userSquance = [];
    if(samePositionCount === 4){
        const html = `    
            <div  class="child-win-div">
                <h1 style="color: rgb(10, 188, 10);">You Won!</h1>
                <p>You have successfully guessed the 4 numbers. Congratulations!</p>
                <button class="restart" style="margin-top: 60px;">Start a new game</button>
            </div>`;
        $(".win-div").append(html);
        let audio = new Audio('Sounds/win-sound.wav');
        audio.play();
        $(".normal-restart-btn").hide();
        $(".restart").click(function(){
            userSquance = [];
            numberSquance = [];
            randomNumber();
            $(".currentNumber").text(" ");
            $(".cancelBsideTry").remove();
            $(".cancelBtn").remove();
            $("#check").remove();
            $("#generator > #table").remove();
            $(".win-div > div").remove();
            $(".normal-restart-btn").show();
            moves = 1;
            resetNumbers();
        });
    }
    $(".currentNumber").text(" ");
    $("#check").remove();
    $(".cancelBsideTry").remove();
}