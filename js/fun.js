function getData(){
  var ip= document.getElementById('ip').value;
  var subred =document.getElementById('subred').value;
  var cl =document.getElementById('cl');
  var ms=document.getElementById('ms');
  var nm=document.getElementById('nm');
  var rango=document.getElementById('rango');
  var host=document.getElementById('host');
  var sub=document.getElementById('sub');
  var clase = ip.substr(0,ip.indexOf("."));
  var mascara="";
  var nuevamascara="";
  var rg=0;
  var hs=0;
  var sb=0;

if(ip==""){
  alert("ingrese direccion ip");
}
else{
  if(clase >=0 && clase<128){
  clase="A";
  mascara="255.0.0.0";
  }
  else if(clase>=128 &&clase<192){
    clase="B"
    mascara="255.255.0.0";
  }
  else if(clase >= 192 && clase<224){
    clase="C"
    mascara="255.255.255.0";
  }
  else if(clase >= 224 &&clase<240){
    clase="D"
  }
  else if(clase>=240 && clase<255){
    clase="E"
  }
  else {
    clase="Direccion Incorrecta!"
  }
  cl.textContent="Clase: "+clase;
  ms.textContent="Mascara: "+mascara;

}

if(subred<=2 && subred>1){
    nuevamascara="255.255.128";
    sb=Math.pow(2,1);
    hs=Math.pow(2,7)-2;
    rg=256-192;
  }
  else if(subred>2 && subred<=4){
    nuevamascara="255.255.192";
    sb|=Math.pow(2,2);
    hs=Math.pow(2,6)-2;
    rg=256-192;
  }
  else if(subred>4 && subred<=8){
    nuevamascara="255.255.224";
    sb=Math.pow(2,3);
    hs=Math.pow(2,5)-2;
    rg=256-224;
  }
  else if(subred>8 && subred<=16){
    nuevamascara="255.255.240";
    sb=Math.pow(2,4);
    hs=Math.pow(2,4)-2;
    rg=256-240;
  }
  else if(subred>16 && subred<=32){
    nuevamascara="255.255.248";
    sb=Math.pow(2,5);
    hs=Math.pow(2,3)-2;
    rg=256-240;
  }
  else if(subred>32 && subred<=64){
    nuevamascara="255.255.252";
    sb=Math.pow(2,6);
    hs=Math.pow(2,2)-2;
    rg=256-248;
  }
  else if(subred>64 && subred<=128){
    nuevamascara="255.255.254";
    sb=Math.pow(2,2);
    hs=Math.pow(2,2)-2;
    rg=256-252;
  }

nm.textContent="Nueva Mascara: "+nuevamascara;
sub.textContent="Sub redes :"+sb;
rango.textContent="Rango :"+rg;
host.textContent="Host :"+hs;

}
