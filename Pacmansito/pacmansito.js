var TABLE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,5,1,0,1,5,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,4,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,3,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,0,5,1,0,1,5,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,2,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

  var Y = 4;
function principal(){
  var canvas = document.getElementById("canvasito");
  var ctx = canvas.getContext("2d");
  var w = canvas.width/15;
  var h = canvas.height/15;
  var pacmanpos = [7,13];
  var fant1 = new Fantasma();
  var fant2 = new Fantasma();
  fant2.init([7,6],4);
  fant1.init([7,7],3);
  var jose = setInterval(ghost,200);
  function ghost(){
    fant2.move();
    fant1.move();
    draw(h,w,ctx);
  };
  draw(h,w,ctx);
  document.addEventListener("keydown",function(event){
    switch (event.keyCode) {
      case 38:
        move("arriba",pacmanpos);
        break;
      case 39:
        move("derecha",pacmanpos);
        break;
      case 37:
        move("izquierda",pacmanpos);
        break;
      case 40:
        move("abajo",pacmanpos);
        break;
      default:
        //
    }
    draw(h,w,ctx);
  });
}

function draw(h,w,ctx){
  for (var i = 0; i < 15; i++) {
    var hei = h*i;
    var rady = hei+(h/2);
    for (var j = 0; j < 15; j++) {
      var wei = w*j;
      var radx = wei+(w/2);
      switch (TABLE[i][j]) {
        case 0:
          ctx.fillStyle = "black";
          ctx.fillRect(wei,hei,w,h);
          break;
        case 1:
          ctx.fillStyle = "blue";
          ctx.fillRect(wei,hei,w,h);
          break;
        case 2:
          ctx.beginPath();
          ctx.fillStyle = "yellow";
          ctx.arc(radx,rady,h/2,0,Math.PI*2);
          ctx.fill();
          break;
        case 3:
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.arc(radx,rady,h/2,0,Math.PI*2);
          ctx.fill();
          break;
        case 4:
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.arc(radx,rady,h/2,0,Math.PI*2);
          ctx.fill();
          break;
        case 5:
          ctx.beginPath();
          ctx.fillStyle = "orange";
          ctx.arc(radx,rady,h/2,0,Math.PI*2);
          ctx.fill();
          break;
        default:

      }
      ctx.stroke();
    }
  }
}


function win(x){
  if(x === 1){
    Y = Y - 1;
    console.log(Y);
    if (Y === 0) {
      alert("HAS GANADO, Haz click para reiniciar");
      location.reload();
    }
  }
}

function move(dir,pacmanpos){
  var x;
  if (TABLE[pacmanpos[1]][pacmanpos[0]] === 2) {
      switch (dir) {
        case "arriba":
          if (TABLE[pacmanpos[1]-1][pacmanpos[0]] !== 1) {
            if (TABLE[pacmanpos[1]-1][pacmanpos[0]] === 5){
              x = 1;
              win(x);
            }
            TABLE[pacmanpos[1]-1][pacmanpos[0]] = 2;
            TABLE[pacmanpos[1]][pacmanpos[0]] = 0;
            pacmanpos[1]--;
          }
          break;
        case "derecha":
          if (TABLE[pacmanpos[1]][pacmanpos[0]+1] !== 1) {
            if (TABLE[pacmanpos[1]][pacmanpos[0]+1] === 5) {
              x = 1;
              win(x);
            }
            TABLE[pacmanpos[1]][pacmanpos[0]+1] = 2;
            TABLE[pacmanpos[1]][pacmanpos[0]] = 0;
            pacmanpos[0]++;
          }
          break;
        case "izquierda":
          if (TABLE[pacmanpos[1]][pacmanpos[0]-1] !== 1) {
            if (TABLE[pacmanpos[1]][pacmanpos[0]-1] === 5) {
              x = 1;
              win(x);
            }
            TABLE[pacmanpos[1]][pacmanpos[0]-1] = 2;
            TABLE[pacmanpos[1]][pacmanpos[0]] = 0;
            pacmanpos[0]--;
          }
          break;
        case "abajo":
          if (TABLE[pacmanpos[1]+1][pacmanpos[0]] !== 1) {
            if (TABLE[pacmanpos[1]+1][pacmanpos[0]] === 5) {
              x = 1;
              win(x);
            }
            TABLE[pacmanpos[1]+1][pacmanpos[0]] = 2;
            TABLE[pacmanpos[1]][pacmanpos[0]] = 0;
            pacmanpos[1]++;
          }
          break;
        default:
        //
    };
  }else{
    alert("Has perdido, Haz click para reiniciar");
    location.reload();
  }
}

function randomMove(dir) {
  var list = [];
  for (i in dir) {
    if (TABLE[dir[i][0]][dir[i][1]] === 0) {
      list.push(i);
    }else{
      list.push(i);
    }
  }
  return list[Math.floor(Math.random() * list.length)];
}
function Fantasma(){
  this.init = function(pos,num){
    this.pos = pos;
    this.num = num;
    this.dir = "arriba";
  },
  this.move = function(){
      switch (this.dir) {
        case "arriba":
          if (TABLE[this.pos[1]-1][this.pos[0]] !== 1){
            TABLE[this.pos[1]-1][this.pos[0]] = this.num;
            TABLE[this.pos[1]][this.pos[0]] = 0;
            this.pos[1]--;
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1]
            };
            this.dir = randomMove(dir);
          }else {
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }
          break;
        case "abajo":
          if (TABLE[this.pos[1]+1][this.pos[0]] !== 1){
            TABLE[this.pos[1]+1][this.pos[0]] = this.num;
            TABLE[this.pos[1]][this.pos[0]] = 0;
            this.pos[1]++;
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }else {
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1]
            };
            this.dir = randomMove(dir);
          }
          break;
        case "izquierda":
          if (TABLE[this.pos[1]][this.pos[0]-1]  !== 1){
            TABLE[this.pos[1]][this.pos[0]-1] = this.num;
            TABLE[this.pos[1]][this.pos[0]] = 0;
            this.pos[0]--;
            var dir = {
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }else {
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }
          break;
        case "derecha":
           if (TABLE[this.pos[1]][this.pos[0]+1] !== 1){
            TABLE[this.pos[1]][this.pos[0]+1] = this.num;
            TABLE[this.pos[1]][this.pos[0]] = 0;
            this.pos[0]++;
            var dir = {
              "derecha" : [this.pos[0] + 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }else {
            var dir = {
              "izquierda" : [this.pos[0] - 1, this.pos[1]],
              "arriba" : [this.pos[0], this.pos[1] - 1],
              "abajo" : [this.pos[0], this.pos[1] + 1]
            };
            this.dir = randomMove(dir);
          }
          break;
      }
  };
}
