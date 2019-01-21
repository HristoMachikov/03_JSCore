function solve() {
  let currentSite = document.getElementsByTagName('a');
  console.log(currentSite);
  let currentSiteContent = "";
  let lisenerOfClicks = document.querySelector('a').addEventListener('click', addClick, false);
  function addClick() {
    console.log(lisenerOfClicks);
    for (element of currentSite) {
      if (element.textContent != "" && element.getAttribute('href') == "#") {
        let numbOfClicks = 0;

        numbOfClicks += 1;
        console.log(numbOfClicks);
        currentSiteContent = element.textContent;
      };
    };
  };
};