


//SAYFANIN YÜKLENME DURUMUNA GÖRE ANİMASYON GÖSTER
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector("body").style.visibility = "hidden"; 
        document.querySelector("#wrapper-loader").style.visibility = "visible"; 
    } else { 
        document.querySelector("#wrapper-loader").style.display = "none"; 
        document.querySelector("body").style.visibility = "visible"; 
    } 
}; 
//GEÇEN SÜRE
const timer = document.getElementById('stopwatch');

var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        if (min == 59 && sec == 59){
            document.getElementById("hint").disabled = true;
            document.getElementById("sendWord").disabled = true;
            document.getElementById("insWord").disabled = true;
            document.getElementById("insWord").value = "Oyun bitti lütfen yeni oyun başlatın";

            document.getElementById("hint").style.cursor = "default";
            document.getElementById("sendWord").style.cursor = "default";
        }
        else{
            sec = sec + 1;
            if (sec == 60) {
                min = min + 1;
                sec = 0;
            }
            
            if (sec < 10 || sec == 0) {
            sec = '0' + sec;
            }
            if (min < 10 || min == 0) {
                min = '0' + min;
            }
            timer.innerHTML = passingTime + ": " + min + ':' + sec;
            setTimeout("timerCycle()", 1000);
        }
  }
}

function resetTimer() {
    timer.innerHTML = passingTime + ": " + "00:00";
    stoptime = true;
    sec = 0;
    min = 0;
}
//ENTER TUŞUNA TIKLANDIĞINDA SEND BUTONUNU ÇALIŞTIR
var inputKey = document.getElementById("ListenKey");
inputKey.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendWord").click();
    document.getElementById("sendWord").blur();
    }
});
//SPACE TUŞUNA TIKLANDIĞINDA BUTONUNU ÇALIŞTIR
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        document.getElementById("hint").click();
        document.getElementById("hint").blur();
    }
}
window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};
//DOSYADA BULUNAN KELİMELERİ LİSTEYE AKTAR
var wordArray = []
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var n = allText.split("\n");
                for(var x in n){   
                    wordArray.push((n[x].trim()));
                }
            }
        }
    }
    rawFile.send(null);
}
readTextFile("allWords.txt");
// BAŞLANGIÇTA REASTGELE KELİME İLE OYUNA BAŞLA

var howToPlayState = "alwaysOpen"; /* alwaysOpen dışındaki bir değer girilirse slide aktif olur ve aç/kapat yapılabilir */
var idCounter = 0;
var lastLetterIdCounter = 0;
function insWorddefaultStyle(){
    document.getElementById('insWord').style.color = "black";
}
var hintCount = 0;
var remainingHintCount = 5;
document.getElementById('help').innerHTML = "İpucu: " + hintCount;
document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
document.getElementById('hint').disabled = false;
document.getElementById("hint").style.cursor = "pointer";
document.getElementById('stopwatch').innerHTML = passingTime + ": " + "00:00";
insertedWordListArray = [];
var insertedWordList;
function bodyOnLoad(){
    document.getElementById("insWord").focus();
    var randomWordIndexForPageLoad	=	Math.round(Math.random()*(wordArray.length-1));
    var randomWordForPageLoad = wordArray[randomWordIndexForPageLoad];

    idCounter+=1;
    var createSpanElement	=	document.createElement("DIV");	
    createSpanElement.setAttribute("id", idCounter);
    var kelimeOlustur	=	document.createTextNode(randomWordForPageLoad);	
    createSpanElement.appendChild(kelimeOlustur);				
    document.getElementById("insertedWordList").appendChild(createSpanElement);

    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    document.getElementById('score').innerHTML = score + ": " + (insertedWordListArray.length-1);
}
//info fadeout timer
// var var_infoTimer;
// function infoTimer() {
//     var_infoTimer = setTimeout(function(){ 
//         $("#info").fadeOut(1000); 
//     }, 3000);
// }
// function stopInfoTimer() {
//     clearTimeout(var_infoTimer);
// }

// GİRİLEN KELİMEYİ ARA
var finded; 
var lastLetter;
var styledWord;
var insertedWordListArray;
function findWord() {
    document.getElementById("insWord").focus();
    if (lastLetterIdCounter != 0){
        document.getElementById('lastLetterIdCounter-'+lastLetterIdCounter).removeAttribute('style');
    }
    if (styledWord != undefined){
        styledWord.style.backgroundColor = "initial";
        styledWord.style.color = "rgb(84, 84, 84)";
    }
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
	finded = document.getElementById('insWord').value.toLowerCase().trim();
    /* Son kelime ve son karakteri*/
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    var lastWord = insertedWordListArray[insertedWordListArray.length - 1]
    var lastLetter = lastWord[lastWord.length-1]

    var firstLetter = finded[0]
    if (lastLetter == firstLetter){
        function func_listedeara(eleman, sira, referans){
            return eleman == finded;
        }
        var sonuc		=	insertedWordListArray.find(func_listedeara);
        if (sonuc != finded){

            function func_kelimeListesindeAra(eleman, sira, referans){
                return eleman == finded;
            }
            var word		=	wordArray.find(func_kelimeListesindeAra);
            if (finded == word){
                idCounter +=1;
                var createSpanElement	=	document.createElement("DIV");	
                createSpanElement.setAttribute("id", idCounter);
                var kelimeOlustur	=	document.createTextNode(finded);	
                createSpanElement.appendChild(kelimeOlustur);				
                document.getElementById("insertedWordList").appendChild(createSpanElement);

                document.getElementById('insWord').value = "";
                var scrollList = document.getElementById("insertedWordList");
                scrollList.scrollTop = scrollList.scrollHeight;
                // insertedWordList.scrollTo(0,document.querySelector("#insertedWordList").scrollHeight);
                document.getElementById('score').innerHTML = score + ": " + (insertedWordListArray.length);

                function giveMeRandomWord(){
                    /* SON HARFLE BAŞLAYAN KELİME KALMADIYSA RASTGELE YENİ KELİME VER */
                    var insertedWordListArray = [];
                    var insertedWordList = document.getElementById('insertedWordList').innerText.trim();
                    var n = insertedWordList.split("\n");
                    for(var x in n){   
                        insertedWordListArray.push((n[x].trim()));
                    }
                    var lastWord = insertedWordListArray[insertedWordListArray.length - 1];
                    var lastLetter = lastWord[lastWord.length-1];

                    var withoutInsertedWord = [];
                    var isEqual = false;
                    for (var i = 0; i < wordArray.length; i++){
                        for (var j = 0; j < insertedWordListArray.length; j++){
                            if (wordArray[i] == insertedWordListArray[j]){
                                isEqual = true;
                            }
                            else{
                                if (!isEqual){
                                    isEqual = false;
                                }
                            }
                        }
                        if (!isEqual){
                                withoutInsertedWord.push(wordArray[i]);
                        }
                        var isEqual = false;
                    }


                    var firstLetter = lastLetter;
                    var startWithFirstLetterList = [];
                    for(var x in withoutInsertedWord){ 
                        var perArrayItem = withoutInsertedWord[x].trim();
                        var isStartingWithFirstLetter = perArrayItem.startsWith(firstLetter);
                        if (isStartingWithFirstLetter == true){
                            startWithFirstLetterList.push(perArrayItem);
                        }
                    }
                    if (startWithFirstLetterList.length == 0){
                        // $("#info").fadeOut(1); 
                        // $("#info").fadeIn(1); 
                        var randomWordIndexForPageLoad	=	Math.round(Math.random()*(withoutInsertedWord.length-1));
                        var randomWordForPageLoad = withoutInsertedWord[randomWordIndexForPageLoad];
                        if (randomWordForPageLoad != undefined){
                            idCounter+=1;
                            var createSpanElement	=	document.createElement("DIV");	
                            createSpanElement.setAttribute("id", idCounter);
                            var kelimeOlustur	=	document.createTextNode(randomWordForPageLoad);	
                            createSpanElement.appendChild(kelimeOlustur);				
                            document.getElementById("insertedWordList").appendChild(createSpanElement);

                            var alan		=	document.getElementById("insertedWordList").children;
                            for(var baslangic = 0; baslangic<alan.length; baslangic++){
                                if (alan[baslangic].innerText == randomWordForPageLoad){
                                    alan[baslangic].style.color = "green";
                                    styledWord = alan[baslangic];
                                }					
                            }
                            giveMeRandomWord();

                        }
                        else{
                            document.getElementById('insWord').value = pleaseRestartGame;
                            document.getElementById('insWord').disabled = true;
                        }
                    }
                }
                giveMeRandomWord();
                



                if (stoptime == true){
                    startTimer();
                }

                
                
            }
            else {
                // $("#info").stop();
                // $("#info").fadeOut(1); 
                // $("#info").fadeIn(1); 
                document.getElementById('insWord').style.color = "#b1000d";
                // document.getElementById('info').innerHTML = "Böyle bir kelime yok";
                // infoTimer();
            }
        }
        else{
            // $("#info").stop();
            // $("#info").fadeOut(1); 
            // $("#info").fadeIn(1); 
            // document.getElementById('info').innerHTML = "Bu kelime önceden yazıldı";
            
            /* Eğer girilen kelime zaten daha önceden yazıldıysa listede o kelimeyi kırmızı ile göster*/
            var alan		=	document.getElementById("insertedWordList").children;
            for(var baslangic = 0; baslangic<alan.length; baslangic++){
                if (alan[baslangic].innerText == finded){
                    document.getElementById(alan[baslangic].id).scrollIntoView({ block: 'nearest', inline: 'start' });
                    // document.getElementById(alan[baslangic].id).scrollIntoView({behavior: 'smooth'});
                    alan[baslangic].style.backgroundColor = "#b1000d";
                    alan[baslangic].style.color = "white";
                    styledWord = alan[baslangic];
                }					
            }
            // infoTimer();
        }
    }
    else{
        // $("#info").fadeOut(1); 
        // $("#info").fadeIn(1); 
        // document.getElementById('info').innerHTML = "Kelime son harf ile başlamıyor";
        /* son kelimeye ulaş */
        lastLetterIdCounter +=1;
        var str = document.getElementById("insertedWordList").lastElementChild.innerText; 
        var txt2 = "<span style='background-color:#b1000d; color:white;' id='lastLetterIdCounter-" + lastLetterIdCounter + "'>" + str.slice(-1) + "</span>" ;
        var txt3 = str.slice(0, str.length-1);
        document.getElementById("insertedWordList").lastElementChild.innerHTML = txt3 + txt2;
        // infoTimer();
        var scrollList = document.getElementById("insertedWordList");
        scrollList.scrollTop = scrollList.scrollHeight;
    }
}
// BUTONLARIN GENİŞLİĞİNİ EN UZUN OLANA GÖRE AYARLA
    buttonLengths = []
    var buttonCount	=	document.querySelector(".buttons").childElementCount;
    for (i = 0; i < buttonCount; i++) {
        buttonLengths.push(document.querySelector(".buttons").children[i].offsetWidth);
    }
    maxButtonLenght = Math.max.apply(Math, buttonLengths);
    var sonuc = document.getElementsByClassName("button");
    for (i = 0; i < buttonCount; i++) {
        sonuc[i].style.width = maxButtonLenght + "px";	
    }
// YENİDEN BAŞLAT
function resetGame(){
    document.getElementById('insWord').disabled = false;
    lastLetterIdCounter = 0;
    document.getElementById("insWord").focus();
    idCounter = 0;
    document.getElementById("hint").disabled = false;
    document.getElementById("sendWord").disabled = false;
    document.getElementById("insWord").disabled = false;
    document.getElementById("hint").style.cursor = "pointer";
    document.getElementById("sendWord").style.cursor = "pointer";

    document.getElementById("reset").blur();
    resetTimer();
    insertedWordListArray = [];
    insertedWordList = "";
    document.getElementById('insertedWordList').innerHTML = "";
    document.getElementById('insWord').value = "";
    bodyOnLoad();
    hintCount = 0;
    remainingHintCount = 5;
    document.getElementById('help').innerHTML = "İpucu: " + hintCount;
    document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
    document.getElementById('hint').disabled = false;
    document.getElementById("hint").style.cursor = "pointer";
}


// İPUCU BUTONU
function hint(){
    if (styledWord != undefined){
        styledWord.style.backgroundColor = "initial";
        styledWord.style.color = "rgb(84, 84, 84)";

    }
    document.getElementById("insWord").focus();
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
    /* son kelime ve karakteri */
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerText.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    var lastWord = insertedWordListArray[insertedWordListArray.length - 1];
    var lastLetter = lastWord[lastWord.length-1];
    /* listeye girilen karakterlerin olmadığı yeni bir liste çıkart ve son karakterle başlayan kelimelerin bulunduğu listeden rastgele kelime seç ardından inputta kelimeyi  göster*/
    var withoutInsertedWord = [];
    var isEqual = false;
    for (var i = 0; i < wordArray.length; i++){
        for (var j = 0; j < insertedWordListArray.length; j++){
            if (wordArray[i] == insertedWordListArray[j]){
                isEqual = true;
            }
            else{
                if (!isEqual){
                    isEqual = false;
                }
            }
        }
        if (!isEqual){
                withoutInsertedWord.push(wordArray[i]);
        }
        var isEqual = false;
    }

    var firstLetter = lastLetter;
    var startWithFirstLetterList = [];
    for(var x in withoutInsertedWord){ 
        var perArrayItem = withoutInsertedWord[x].trim();
        var isStartingWithFirstLetter = perArrayItem.startsWith(firstLetter);
        if (isStartingWithFirstLetter == true){
            startWithFirstLetterList.push(perArrayItem);
        }
    }
    if (startWithFirstLetterList.length == 0){
        // $("#info").fadeOut(1); 
        // $("#info").fadeIn(1); 
        var randomWordIndexForPageLoad	=	Math.round(Math.random()*(withoutInsertedWord.length-1));
        var randomWordForPageLoad = withoutInsertedWord[randomWordIndexForPageLoad];
        if (randomWordForPageLoad != undefined){
            idCounter+=1;
            var createSpanElement	=	document.createElement("DIV");	
            createSpanElement.setAttribute("id", idCounter);
            var kelimeOlustur	=	document.createTextNode(randomWordForPageLoad);	
            createSpanElement.appendChild(kelimeOlustur);				
            document.getElementById("insertedWordList").appendChild(createSpanElement);

            var alan		=	document.getElementById("insertedWordList").children;
            for(var baslangic = 0; baslangic<alan.length; baslangic++){
                if (alan[baslangic].innerText == randomWordForPageLoad){
                    alan[baslangic].style.color = "green";
                    styledWord = alan[baslangic];
                }					
            }
            
        }
        else{
            document.getElementById('insWord').value = pleaseRestartGame;
            document.getElementById('insWord').disabled = true;
            
        }
        
        // infoTimer();
    }
    else{
        if (hintCount >= 5){
            document.getElementById('hint').disabled = true;
            document.getElementById("hint").style.cursor = "default";
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            document.getElementById('remainingHintCount').innerHTML = remainingHintCount;

        }
        else{
            hintCount +=1;
            remainingHintCount -=1;
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
            var randomWordStartingWithFirstLetter = startWithFirstLetterList[Math.floor(Math.random() * startWithFirstLetterList.length)];
            document.getElementById('insWord').value = randomWordStartingWithFirstLetter;
            if (hintCount >= 5){
                document.getElementById('hint').disabled = true;
                document.getElementById("hint").style.cursor = "default";
                document.getElementById('help').innerHTML = "İpucu: " + hintCount;
                document.getElementById('remainingHintCount').innerHTML = remainingHintCount;
            }
        }
    }
}


// Nasıl oynanır?
if (howToPlayState != "alwaysOpen"){
    if (document.getElementById('slideIcon').innerText == "arrow_drop_up"){
        $("#howToPlay").slideDown(1);
    }
    else{
        $("#howToPlay").slideUp(1);
    }
    
    
    if($("#howToPlay").is(":hidden"))
    {
        document.getElementById('slideIcon').innerText = "arrow_drop_down";
    }
    else{
        document.getElementById('slideIcon').innerText = "arrow_drop_up";
    }


    $("#rightSideTitle-wrapper").click(function(){
        if($("#howToPlay").is(":hidden"))
        {
            document.getElementById('slideIcon').innerText = "arrow_drop_up";
            $("#howToPlay").slideDown("fast");
        }
        else{
            document.getElementById('slideIcon').innerText = "arrow_drop_down";
            $("#howToPlay").slideUp("fast");
        }
    });
}
else{
    document.getElementById('slideIcon').innerText = "";
}

  
// DİL
// document.documentElement.lang = navigator.language;
var userLang = navigator.language || navigator.userLanguage; 

var send;
var hints;
var restart;
var passingTime;
var score;
var howtoplay;

function langEN(){
    document.getElementById("howToPlayImg").src = "images/howtoplayEN.gif";
    document.getElementById('langTurkce').style.border = "1px solid transparent";
    document.getElementById('langEnglish').style.border = "1px solid black";
    document.documentElement.lang = "en-US";
    setCookie("selectedLang", "EN", 30);

    /* WORDS */
    send = "Send";
    hints = "Hint";
    restart = "Restart Game";
    passingTime = "Passing Time";
    score = "Score";
    howToPlay = "How to play?";
    pleaseRestartGame = "No words left. Please restart the game";
    /* - - - */

    document.getElementById('sendWord').value = send + " " + "(Enter)";
    document.getElementById('hint').value = hints + " " + "(Space)";
    document.getElementById('reset').value = restart;
    if (min == 0 && sec == 0){
        document.getElementById('stopwatch').innerHTML = passingTime + ": " + "00:00";      
    }
    else{
        document.getElementById('stopwatch').innerHTML = timer.innerHTML = passingTime + ": " + min + ':' + sec;
    }
    document.getElementById('score').innerHTML = score + ": " + (insertedWordListArray.length-1);
    document.getElementById('howToPlayTitle').innerHTML = howToPlay;
}

function langTR(){
    document.getElementById("howToPlayImg").src = "images/howtoplayTR.gif";
    document.getElementById('langTurkce').style.border = "1px solid black";
    document.getElementById('langEnglish').style.border = "1px solid transparent";
    document.documentElement.lang = "tr";
    setCookie("selectedLang", "TR", 30);

    /* WORDS */
    send = "Gönder";
    hints = "İpucu";
    restart = "Yeniden Başlat";
    passingTime = "Geçen süre";
    score = "Skor";
    howToPlay = "Nasıl oynanır?";
    pleaseRestartGame = "Kelime kalmadı. Lütfen oyunu yeniden başlat";
    /* - - - */

    document.getElementById('sendWord').value = send + " " + "(Enter)";
    document.getElementById('hint').value = hints + " " + "(Space)";
    document.getElementById('reset').value = restart;
    if (min == 0 && sec == 0){
        document.getElementById('stopwatch').innerHTML = passingTime + ": " + "00:00";      
    }
    else{
        document.getElementById('stopwatch').innerHTML = timer.innerHTML = passingTime + ": " + min + ':' + sec;
    }
    document.getElementById('score').innerHTML = score + ": " + (insertedWordListArray.length-1);
    document.getElementById('howToPlayTitle').innerHTML = howToPlay;

}


// COOKIE
function setCookie(cookieName,cookieValue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
  
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
function checkCookie() {
    var isVisited = getCookie("isVisited");
    if (isVisited) {
        if (howToPlayState != "alwaysOpen"){
            $("#howToPlay").slideUp(1);
            document.getElementById('slideIcon').innerText = "arrow_drop_down";
        }
        else{
            document.getElementById('slideIcon').innerText = "";
        }
    } 
    else {
        setCookie("isVisited", true, 30);
    }

    var selectedLang = getCookie("selectedLang");
    if (selectedLang != ""){
        if (selectedLang == "TR"){
            langTR();
        }
        else{
            langEN();
        }
    }
    else{
        if (userLang == "tr-TR" || userLang == "tr"){
            langTR();
        }
        else{
            langEN();
        }
    }
}
