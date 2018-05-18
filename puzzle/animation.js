function changeImages (){
  var list = ["dora","kim","mr-robot"],
      num = Math.floor(Math.random() * 3);
  document.getElementById("picture1").src = list[num]+"1.jpg";
  document.getElementById("picture2").src = list[num]+"2.jpg";
  document.getElementById("picture3").src = list[num]+"3.jpg";
}

var pepe = {

  free : 8,

  pieces : [ // [x, y]
    [0, 0],   [100, 0],   [200, 0],
    [0, 100], [100, 100], [200, 100],
    [0, 200], [100, 200], [200, 200]
  ],

  board : [],

  myCanvas : function (imageh){
    this.c = document.getElementById("canvas");
    this.c.height = this.c.width;
    this.ctx =this.c.getContext("2d");
    this.img = document.getElementById(imageh)
    this.randomPieces();
    this.draw();
    inicio();
  },

  draw : function () {
    for (var i = 0; i < 9; i++) {
      var imgx = this.pieces[this.board[i]][0], // coordenada x en imagen
          imgy = this.pieces[this.board[i]][1], // coordenada y en imagen
          puzx = this.pieces[i][0], // coordenada x en canvas
          puzy = this.pieces[i][1]; // coordenada y en canvas
      if (this.board[i] !== this.free) {
        this.ctx.drawImage(this.img, imgx, imgy, 100, 100, puzx, puzy, 100, 100);
      } else {
        this.ctx.clearRect(puzx, puzy, 100, 100);
      }
    }
    this.drawlines();
  },

  drawlines : function (){
    this.ctx.moveTo(100,0);
    this.ctx.lineTo(100,300);
    this.ctx.stroke();
    this.ctx.moveTo(200,0);
    this.ctx.lineTo(200,300);
    this.ctx.stroke();
    this.ctx.moveTo(0,100);
    this.ctx.lineTo(300,100);
    this.ctx.stroke();
    this.ctx.moveTo(0,200);
    this.ctx.lineTo(300,200);
    this.ctx.stroke();
  },

  move : function (event){
    var list = [
      event.offsetX - (event.offsetX % 100),
      event.offsetY - (event.offsetY % 100)
    ];
    for (var i = 0; i < 9; i++) {
      if (this.same(list, this.pieces[i])) {
        var clicked = i;
        var around = [i - 3, i - 1, i + 1, i + 3]
      }
    }
    var changed = false;
    for (j in around) {
      if (this.board[around[j]] !== undefined && this.board[around[j]] === this.free && !changed) {
        if (!((clicked === 2 && around[j] === 3) ||
             (clicked === 3 && around[j] === 2) ||
             (clicked === 5 && around[j] === 6) ||
             (clicked === 6 && around[j] === 5))){
             this.changePiece(clicked, around[j]);
             changed = true;
        }
      }
    }
    this.draw();
    if (this.win()) {
      alert("¡Has ganado!");
      this.restart();
      reinicio();
      changeImages();
    }
  },

  restart : function () {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
  },

  win : function () {
    var cont = 0;
    for (var i = 0; i < 9; i++) {
      if (this.board[i] === i) {
        cont++;
      }
    }
    return cont === 9;
  },

  changePiece : function (p1, p2) {
    var aux = this.board;
    aux[p2] = this.board[p1];
    aux[p1] = this.free;
    this.board = aux;
  },

  same : function (p1, p2) {
    if (p1[0] === p2[0]) {
      if (p1[1] === p2[1]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  randomPieces : function () {
    this.board = [
      9, 9, 9,
      9, 9, 9,
      9, 9, 9
    ];
    for (var i = 0; i < 9; i++) {
      do {
        var num = Math.floor(Math.random() * 9);
      } while (this.repeat(num));
      this.board[i] = num;
    }
  },

  repeat : function (num) {
    var rep = false;
    for (j in this.board) {
      if (num === this.board[j]) {
        rep = true;
      }
    }
    return rep;
  }
}
