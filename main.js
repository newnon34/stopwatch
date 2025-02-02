let startTime; //スタートボタンクリック時の時刻
let elapsedTime = 0; //経過時間
let holdTime; //一時停止用に時間保持
let timer; 

let startButton
let stopButton 
let resetButton
let ShowTime //表示時間

//要素を取得
window.onload = function () {
  startButton = document.getElementById("start");
  stopButton = document.getElementById("stop");
  resetButton = document.getElementById("reset");
  showTime = document.getElementById("timerDisplay");
}

//スタートボタン押下時
function startTimer(){
  //タイマー開始時刻を取得
  startTime = Date.now();
  //時間計測
  measureTime(); 

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
}

//ストップボタン押下時
function stopTimer(){
  clearInterval(timer);

  //停止時間を保持
  holdTime += Date.now() - startTime;

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;  
};


//リセットボタン押下時
function resetTimer(){
  clearInterval(timer);

  elapsedTime = 0;
  holdTime = 0;
  showTime.textContent = "00:00:00.000";

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
}

$(document).ready(function(){
 //リセットボタンを押したら
 $("#reset").click(function(){
  //ストップボタンを非活性化する
  $("#stop").prop("disabled", true);
 });
});

//時間計測
function measureTime() {
  timer = setTimeout(function(){

    elapsedTime = 0;
    holdTime = 0;
    showTime.textContent = "00:00:00.000";
    
    //経過時間を取得
    elapsedTime = Date.now()-startTime + holdTime;
    //経過時間を表示
    showTime.textContent = new Date(elapsedTime).toISOString().slice(11,23);
    
    //再帰的に計測を実行
    measureTime();
  },10);
}