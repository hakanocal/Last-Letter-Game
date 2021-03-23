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

var hr = 0;
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
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
    // timer.innerHTML = hr + ':' + min + ':' + sec;
    timer.innerHTML = "Geçen süre: " + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = "Geçen süre: " +"00:00";
    stoptime = true;
    hr = 0;
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
var hintCount = 0;
document.getElementById('help').innerHTML = "İpucu: " + hintCount;
document.getElementById('hint').disabled = false;
document.getElementById("hint").style.cursor = "pointer";
document.getElementById('stopwatch').innerHTML = "Geçen süre: 00:00"
insertedWordListArray = [];
var insertedWordList;
function bodyOnLoad(){
    var randomWordIndexForPageLoad	=	Math.round(Math.random()*(wordArray.length-1));
    var randomWordForPageLoad = wordArray[randomWordIndexForPageLoad];
    document.getElementById('insertedWordList').innerHTML += randomWordForPageLoad + "\n"; 
    insertedWordList = document.getElementById('insertedWordList').innerHTML.trim();
    var n = insertedWordList.split("\n");
    for(var x in n){   
        insertedWordListArray.push((n[x].trim()));
    }
    document.getElementById('score').innerHTML = "Skor: " + (insertedWordListArray.length-1);
}
// GİRİLEN KELİMEYİ ARA
var finded; 
var lastLetter;
function findWord() {
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
	finded = document.getElementById('insWord').value
    /* Son kelime ve son karakteri*/
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerHTML.trim();
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
                document.getElementById('insertedWordList').innerHTML += finded + "\n";
                document.getElementById('insWord').value = "";
                var scrollList = document.getElementById("insertedWordList");
                scrollList.scrollTop = scrollList.scrollHeight;
                // insertedWordList.scrollTo(0,document.querySelector("#insertedWordList").scrollHeight);
                document.getElementById('score').innerHTML = "Skor: " + (insertedWordListArray.length);
                if (stoptime == true){
                    startTimer();
                }
            }
            else {
                alert('Böyle bir kelime yok')
            }
        }
        else{
            alert('zaten daha önceden yazdın')
        }
    }
    else{
        alert('girdiğiniz kelime listedeki son kelimenin son harfi ile başlamıyor')
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
    document.getElementById("reset").blur();
    resetTimer();
    insertedWordListArray = [];
    insertedWordList = "";
    document.getElementById('insertedWordList').innerHTML = "";
    document.getElementById('insWord').value = "";
    bodyOnLoad();
    hintCount = 0;
    document.getElementById('help').innerHTML = "İpucu: " + hintCount;
    document.getElementById('hint').disabled = false;
    document.getElementById("hint").style.cursor = "pointer";
}


// İPUCU BUTONU
function hint(){
    document.getElementById("hint").blur();
    document.getElementById("sendWord").blur();
    /* son kelime ve karakteri */
    insertedWordListArray = [];
    insertedWordList = document.getElementById('insertedWordList').innerHTML.trim();
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
        alert('kelime kalmadı olum')
    }
    else{
        if (hintCount >= 5){
            document.getElementById('hint').disabled = true;
            document.getElementById("hint").style.cursor = "default";
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
        }
        else{
            hintCount +=1;
            document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            var randomWordStartingWithFirstLetter = startWithFirstLetterList[Math.floor(Math.random() * startWithFirstLetterList.length)];
            document.getElementById('insWord').value = randomWordStartingWithFirstLetter;
            if (hintCount >= 5){
                document.getElementById('hint').disabled = true;
                document.getElementById("hint").style.cursor = "default";
                document.getElementById('help').innerHTML = "İpucu: " + hintCount;
            }
        }
    }
}
