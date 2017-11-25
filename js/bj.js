var c1=0;
var c2=0;
var c3=0;
var c4=0;
var c5=0;
var c6=0;
var c7=0;
var c8=0;
var c9=0;
var c10=0;

function init (){
  var uno = document.getElementById('uno');
  var dos = document.getElementById('dos');
  var tres = document.getElementById("tres");
  var cuatro = document.getElementById("cuatro");
  var cinco = document.getElementById("cinco");
  var seis = document.getElementById("seis");
  var siete = document.getElementById("siete");
  var ocho = document.getElementById("ocho");
  var nueve = document.getElementById("nueve");
  var diez = document.getElementById("diez");
  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var four = document.getElementById("four");
  var five = document.getElementById("five");
  var six = document.getElementById("six");
  var seven = document.getElementById("seven");
  var eight = document.getElementById("eight");
  var nine = document.getElementById("nine");
  var ten = document.getElementById("ten");

  uno.onclick = function(e){
    c1++;
    one.textContent=c1;
    }
   dos.onclick = function(e){
    c2++;
    two.textContent=c2;
  }

  tres.onclick = function(e){
    c3++;
    three.textContent=c3;
  }
  cuatro.onclick = function(e){
    c4++;
    four.textContent=c4;
  }
  cinco.onclick = function(e){
    c5++;
    five.textContent=c5;
  }
  seis.onclick = function(e){
    c6++;
    six.textContent=c6;
  }
  siete.onclick = function(e){
    c7++;
    seven.textContent=c7;
  }
  ocho.onclick = function(e){
    c8++;
    eight.textContent=c8;
  }
  nueve.onclick = function(e){
    c9++;
    nine.textContent=c9;
  }
  diez.onclick = function(e){
    c10++;
    ten.textContent=c10;
  }
}
