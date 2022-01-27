let player = 'O';
let resetBtn;
let notification;
let scoreX = 0;
let scoreO = 0;
let boardArray = [['0','0','0'],['0','0','0'],['0','0','0']];

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);

startGame();

function startGame(){
    container.innerHTML = '';

	let clickEvent = function() {
		let ida = this.getAttribute('data-ida');
		let idb = this.getAttribute('data-idb');
		if(this.innerText == ''){
			this.innerHTML = '<div class="check">'+player+'</div>';
			boardArray[ida][idb] = player;
			player = (player == 'O')? 'X' : 'O';
			checkWin(clickEvent);
		}
	};

	let board = document.createElement('div');
	board.id = 'board';

	let dataIdb = 0;
	for(i = 0; i < 9; i++){
		let dataIda = (i < 3)? '0' : ((i < 6)? '1' : '2');
		let box = document.createElement('div');
		box.className = 'box';
		box.setAttribute('data-ida', dataIda);
		box.setAttribute('data-idb', dataIdb);
		box.addEventListener('click', clickEvent, false);
		board.append(box);
		if(dataIdb < 2){
			dataIdb++;
		}else{
			dataIdb = 0;
		}
		if((i + 1) % 3 == 0){
			if(i == 8){
				resetBtn = document.createElement('div');
				resetBtn.id = 'resetBtn';
				resetBtn.innerText = 'reset board';
				resetBtn.onclick = function(){
					clearBoardArray();
					startGame();
				};
				board.append(resetBtn);
			}else{
				let div = document.createElement('div');
				board.append(div);
			}
		}
	}
	container.append(board);

	let scoreBoard = document.createElement('div');
	scoreBoard.id = 'score_board';
		let sbhead = document.createElement('div');
		sbhead.innerText = 'SCORE';
		scoreBoard.append(sbhead);

		for(i = 0; i < 2; i++){
			let scorePlayer = (i == 0)? 'o' : 'x';
			let score = (i == 0)? scoreO : scoreX;
			let scoreBlock = document.createElement('div');
			scoreBlock.className = 'score_block';
				let sblhead = document.createElement('div');
				sblhead.className = 'sblhead';
				sblhead.innerText = scorePlayer;
				scoreBlock.append(sblhead);
				
				let sblBody = document.createElement('div');
				sblBody.className = 'sblbody';
				sblBody.setAttribute('data-id', scorePlayer);
				sblBody.innerText = score;
				scoreBlock.append(sblBody);
			scoreBoard.append(scoreBlock);
		}
	container.append(scoreBoard);

	notification = document.createElement('div');
	notification.id = 'notification';
	container.append(notification);
}

function checkWin(clickEvent){
    let a = 0;
    let b = 0;
	let e = boardArray;
	let sblbody = document.getElementsByClassName('sblbody');

    let winningCombinations = [
        [e[0][0] + e[1][0] + e[2][0]],
        [e[0][1] + e[1][1] + e[2][1]],
        [e[0][2] + e[1][2] + e[2][2]],
        [e[0][0] + e[0][1] + e[0][2]],
        [e[1][0] + e[1][1] + e[1][2]],
        [e[2][0] + e[2][1] + e[2][2]],
        [e[0][0] + e[1][1] + e[2][2]],
        [e[0][2] + e[1][1] + e[2][0]]
    ];
    let win;

    for(i = 0; i < 8; i++){
        if(winningCombinations[i].includes('XXX')){
            a++;
        }
        if(winningCombinations[i].includes('OOO')){
            b++;
        }
    }

    if(a == 0 && b == 0 && (e[0].includes('0') || e[1].includes('0') || e[2].includes('0'))){
        win = "next turn";
    }
    else{
        if(a == 0 && b == 0){
            win = "draw";
        }
        else if(a > 0 && b == 0){
            win = "X wins";
			scoreX++
            sblbody[1].innerText = scoreX;
        }
        else if(a == 0 && b > 0){
            win = "O wins";
			scoreO++
            sblbody[0].innerText = scoreO;
        }
        else if(a > 0 && b > 0){
            win = "error";
        }
        gameEnd(win, clickEvent);
    }
}

function clearBoardArray(){
	boardArray = [];
	boardArray = [['0','0','0'],['0','0','0'],['0','0','0']];
}

function gameEnd(win, clickEvent){
    notification.innerText = win;
	let box = document.getElementsByClassName('box');
    for(var i = 0; i < box.length; i++){
        box[i].removeEventListener("click", clickEvent, false);
    }
}
