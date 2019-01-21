function solve() {
Array.from(document.getElementsByTagName('img')).forEach((img) =>{
    img.addEventListener('click', clickEvent);
});
function clickEvent(e){
    let card = e.target;
    card.src = "./img/Withcard..";
    let parent = card.parentNode;
    let spans = document.getElementById('result').children;

    if(parent.id === "")
}
}