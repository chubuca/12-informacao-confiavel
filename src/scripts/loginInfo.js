var flag = 1;
var localEscrita = new Array();

window.onload = function(){
    var nomeLogin = 'Rossi - Teste';
    if (flag == 1){
        //nomeLogin = localStorage.getItem()   //Vai pegar o valor nome do local Storage
    
    localEscrita = document.getElementsByClassName('nomeLogin');
    console.log(localEscrita, nomeLogin);
    for (var i=0; i<localEscrita.length; i++){
        localEscrita[i].innerHTML = nomeLogin;
    }
    }
}