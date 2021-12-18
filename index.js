var ttt = {

  board : [], // масив для зберігання поточної гри

  // ПЕРЕЗАПУСК ГРИ
  reset : function () {
    // СКИНУТИ МАССИВ ДОШКИ та ОТРИМАТИ КОНТЕЙНЕР HTML
    ttt.board = [];
    var container = document.getElementById("ttt-game");
    container.innerHTML = "";

    // ПЕРЕМАДЮВАТИ КВАДРАТИ
    for (let i=0; i<9; i++) {
      ttt.board.push(null);
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "ttt-" + i;
      square.addEventListener("click", ttt.play);
      container.appendChild(square);
    }
  },

  // ГРАТИ - КОЛИ ГРАВЕЦЬ ВИБИРАЄ КВАДРАТ
  play : function () {
    // ХІД ГРАВЦЯ -«О»
    var move = this.dataset.idx;
    ttt.board[move] = 0;
    this.innerHTML = "O"
    this.classList.add("player");
    this.removeEventListener("click", ttt.play);

    // БІЛЬШЕ НЕМАЄ ХОДІВ – НЕМАЄ ПЕРЕМОЖЦЯ
    if (ttt.board.indexOf(null) == -1) {
      alert("No winner");
      ttt.reset();
    }

    // ХІД КОМП'ЮТЕРА -"X"

    else {
      move = ttt.dumbAI();

      ttt.board[move] = 1;
      var square = document.getElementById("ttt-" + move);
      square.innerHTML = "X"
      square.classList.add("computer");
      square.removeEventListener("click", ttt.play);
    }

    // ВКАЗУЄТЬСЯ ХТО ПЕРЕМІГ
    win = null;

    // ПЕРЕВІРКА ГОРИЗОНТАЛЬНИХ РЯДКІВ
    for (let i=0; i<9; i+=3) {
      if (ttt.board[i]!=null && ttt.board[i+1]!=null && ttt.board[i+2]!=null) {
        if ((ttt.board[i] == ttt.board[i+1]) && (ttt.board[i+1] == ttt.board[i+2])) { win = ttt.board[i]; }
      }
      if (win !== null) { break; }
    }

    // ПЕРЕВІРКИ ВЕРТИКАЛЬНИХ РЯДІВ
    if (win === null) {
      for (let i=0; i<3; i++) {
        if (ttt.board[i]!=null && ttt.board[i+3]!=null && ttt.board[i+6]!=null) {
          if ((ttt.board[i] == ttt.board[i+3]) && (ttt.board[i+3] == ttt.board[i+6])) { win = ttt.board[i]; }
          if (win !== null) { break; }
        }
      }
    }

    // ПЕРЕВІРКА ДІАГОНАЛЕЙ
    if (win === null) {
      if (ttt.board[0]!=null && ttt.board[4]!=null && ttt.board[8]!=null) {
        if ((ttt.board[0] == ttt.board[4]) && (ttt.board[4] == ttt.board[8])) { win = ttt.board[4]; }
      }
    }
    if (win === null) {
      if (ttt.board[2]!=null && ttt.board[4]!=null && ttt.board[6]!=null) {
        if ((ttt.board[2] == ttt.board[4]) && (ttt.board[4] == ttt.board[6])) { win = ttt.board[4]; }
      }
    }

    // НЕМАЄ ПЕРЕМОЖЦЯ
    if (win !== null) {
      alert("WINNER - " + (win==0 ? "Player" : "Computer"));
      ttt.reset();
    }
  },

  // КОМП'ЮТЕР ОБИРАЄ ПУСТУ КОМІРКУ
  dumbAI : function () {
    //
    var open = [];
    for (let i=0; i<9; i++) {
      if (ttt.board[i] === null) { open.push(i); }
    }

    // КОМ'ЮТЕР ВИБИРАЄ ВИПАДКОВУ КОМІРКУ
    var random = Math.floor(Math.random() * (open.length-1));
    return open[random];
  },

};
window.addEventListener("load", ttt.reset);
