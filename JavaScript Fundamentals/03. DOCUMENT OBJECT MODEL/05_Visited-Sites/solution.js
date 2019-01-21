function solve() {
  //let currentSite = document.getElementsByTagName('a');
  //console.log(currentSite);
  let currentSiteContent = "";
  let lisenerOfClicks = document.addEventListener('click', function (e) {
    let currentTarget = e.target;
    currentSiteContent = currentTarget.textContent;


    let check = false;
    switch (currentSiteContent) {
      case "SoftUni":
      case "Google":
      case "YouTube":
      case "Wikipedia":
      case "Gmail":
      case "Stackoverflow": check = true; break;
      default: break;
    };
    let currentCount = 0;
    if (check) {
      let nextElem = currentTarget.nextElementSibling;
       currentCount = Number(nextElem.textContent.split(" ")[1]);
      nextElem.textContent = `Visited: ${currentCount + 1} times`;
    };
    return currentCount + 1;
  }, false);
};