// başlangıçta rastgele kelime ile oyuna başla
function bodyOnLoad(){
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "tawke" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "takew" + "\n"; 
    document.getElementById('insertedWordList').innerHTML += "take" + "\n"; 
}
// enter tuşuna tıklandığında send butonunu çalıştır
var inputKey = document.getElementById("ListenKey");
inputKey.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendWord").click();
    }
});

//
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
document.getElementById("result").innerHTML += wordArray;


/* ------------------- */
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
        }
        else {
            alert('bulunamadı')
    }
}
window.scrollTo(0,document.querySelector("#insertedWordList").scrollHeight);
