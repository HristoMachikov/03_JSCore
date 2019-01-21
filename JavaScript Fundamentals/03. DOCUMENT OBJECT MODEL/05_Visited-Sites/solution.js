function solve() {
  let currentSiteContent = "";
  Array.from(document.getElementsByTagName('a')).forEach(elem => {
    elem.addEventListener('click', listenedResult);
    console.log(elem);
    function listenedResult(event) {
      let currentTarget = event.target;
      currentSiteContent = currentTarget.textContent;
      let nextElem = currentTarget.nextElementSibling;
      currentCount = Number(nextElem.textContent.split(" ")[1]);
      nextElem.textContent = `Visited: ${currentCount + 1} times`;
    };
  });
};