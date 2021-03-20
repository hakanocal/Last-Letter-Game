
/* ------ enter tuşuna tıklandığında send butonunu çalıştır -----*/
var inputKey = document.getElementById("ListenKey");
inputKey.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendWord").click();
    }
});

/* ------------DOSYADA BULUNAN KELİMELERİ LİSTEYE AKTAR--------------  */
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
readTextFile("words_alpha.txt");
var randomWordIndexForPageLoad	=	Math.round(Math.random()*(wordArray.length-1));
var randomWordForPageLoad = wordArray[randomWordIndexForPageLoad];
/* --------başlangıçta rastgele kelime ile oyuna başla----------- */
function bodyOnLoad(){
    document.getElementById('insertedWordList').innerHTML += randomWordForPageLoad + "\n"; 
}
/* --------GİRİLEN KELİMEYİ ARA------------ */
var finded; 
function checkWord(eleman, sira, referans){
	return eleman == finded;
}
var words = wordArray;
function findWord() {
	finded = document.getElementById('insWord').value
    var word		=	words.find(checkWord);
    if (word == finded){
            document.getElementById('insertedWordList').innerHTML += finded + "\n";
            document.getElementById('insWord').value = "";
            insertedWordList.scrollTo(0,document.querySelector("#insertedWordList").scrollHeight);
        }
    else {
        alert('bulunamadı')
    }
}

