const boxes = document.querySelectorAll('.box');
const modal = document.querySelector('.modal');

let poses = [
 ['-', '-', '-'],
 ['-', '-', '-'],
 ['-', '-', '-']
];

let que = 1;

function checkForWin() {
 let letter = que % 2 === 1 ? 'x' : 'o';
 let win = false;
 let stillGoing = false;

 for(let i = 0; i < 3; i++) {
  if(poses[i].toString() === `${letter},${letter},${letter}`) { win = true; break;}

  if(`${poses[0][i]},${poses[1][i]},${poses[2][i]}` === `${letter},${letter},${letter}`) { win = true; 
  break; }

  if(poses[i].includes('-')) {
   stillGoing = true;
  }
 }

 if(`${poses[0][0]},${poses[1][1]},${poses[2][2]}` === `${letter},${letter},${letter}` || `${poses[0][2]},${poses[1][1]},${poses[2][0]}` === `${letter},${letter},${letter}`) { win = true; }

 if(!win && stillGoing) { return }

 const finishText = win ? `Player-${que % 2 == 1 ? 1 : 2} won!` : 'This is a Tie'
 modal.children[0].textContent = finishText;
 modal.classList.remove('hide');
}

const clickHandler = (e) => {
 let y = e.target.dataset.y;
 let x = e.target.dataset.x;
 
 if(poses[y][x] !== '-') { return }

 poses[y][x] = que % 2 === 1 ? 'x' : 'o';

 e.target.textContent = poses[y][x];
 
 checkForWin();

 que += 1;
}

function redo() {
 poses = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
 ];
 que = 1;
 modal.classList.add('hide');
 boxes.forEach(box => box.textContent="");
}

boxes.forEach(box => box.addEventListener("click", clickHandler));
modal.children[1].addEventListener('click', redo);
modal.classList.add('hide');