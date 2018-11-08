window.onload = () => {
  const boardSize = 800;
  const n:number = 100;

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  let board: Array<Array<boolean>> = new Array(n+2);
  for(let i = 1; i < board.length-1; i++){
    board[i] = new Array<boolean>(n+2);
  }

  for(let i:number = 1; i < board.length-1; i++){
    for(let j:number = 1; j < board.length-1; j++){
      board[i][j] = false;
    }
  }

  board[5][5] = true;
  board[6][6] = true;
  board[5][6] = true;

  // Call 'draw' function whenever browser renders a frame on the screen
  draw(board);

  function draw(board: Array<Array<boolean>>) {
    // Demo code showing how to draw in the canvas
    ctx.clearRect(0, 0, boardSize, boardSize);
    //ctx.fillRect(10, 10, 30, 30);

    let squareSize:number = boardSize / n;
    walkThroughArray(board);
    
    for(let i:number = 1; i < board.length-1; i++){
      for(let j:number = 1; j < board.length-1; j++){
        if(board[i][j] === true){
          let starti:number = i*squareSize;
          let startj:number = j*squareSize;
          ctx.fillRect(starti, startj, starti+squareSize, startj+squareSize);
        }
      }
    }

    draw(board);
  }

  function walkThroughArray (board: Array<Array<boolean>>){
    for(let i:number = 1; i < board.length-1; i++){
      for(let j:number = 1; j < board.length-1; j++){
        let aliveNeighbours:number = checkNeighbours(board, i, j);
        whatToDo(board, i, j, aliveNeighbours);
      }
    }
  }

  function whatToDo (board: Array<Array<boolean>>, i:number, j:number, aliveNeighbours:number){
    if(board[i][j] === false){
      if(aliveNeighbours === 3){
        board[i][j] = true;
      }
    }else{
      if(aliveNeighbours < 2 || aliveNeighbours > 3){
        board[i][j] = false;
      }
    }
  }

  function checkNeighbours (board: Array<Array<boolean>>, i:number, j:number){
    let countAlive:number = 0;
    if(board[i-1][j-1] === true){
      countAlive++;
    }
    if(board[i][j-1] === true){
      countAlive++;
    }
    if(board[i+1][j-1] === true){
      countAlive++;
    }
    if(board[i+1][j] === true){
      countAlive++;
    }
    if(board[i+1][j+1] === true){
      countAlive++;
    }
    if(board[i][j+1] === true){
      countAlive++;
    }
    if(board[i-1][j+1] === true){
      countAlive++;
    }
    if(board[i-1][j] === true){
      countAlive++;
    }
    return countAlive;
  }
};