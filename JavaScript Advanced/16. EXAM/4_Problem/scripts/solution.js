(function solve() {

    let $kingdom = $('#kingdom').children().eq(1).children().eq(0);
    let $king = $('#kingdom').children().eq(1).children().eq(1);
    let $rebuildBtn = $('#kingdom').children().eq(1).children().eq(2);

    $rebuildBtn.on('click', rebuildKingdom);

    let kingdomArr = ["CASTLE", "DUNGEON", "FORTRESS", "INFERNO", "NECROPOLIS", "RAMPART", "STRONGHOLD", "TOWER", "CONFLUX"];
    function rebuildKingdom() {
        if ($king.val().trim().length >= 2
            && kingdomArr.includes($kingdom.val().toUpperCase())) {

            let kingdomName = $kingdom.val().toLowerCase();
            let $rebuildKingdom = $(`#${kingdomName}`);

            $rebuildKingdom.css("display", "inline-block");
            let $h1 = $(`<h1>${kingdomName.toUpperCase()}</h1>`);
            let $div = $('<div class="castle"></div>');
            let $h2 = $(`<h2>${$king.val().toUpperCase()}</h2>`);
            $rebuildKingdom.append($h1).append($div).append($h2).append(createFieldsetElement());
        } else {
            $kingdom.val("");
            $king.val("");
        }
    }

    function createFieldsetElement() {
        let $fieldset = $('<fieldset>');
        let $legend = $('<legend>Army</legend>');
        let $p1 = $('<p>TANKS - 0</p>');
        let $p2 = $('<p>FIGHTERS - 0</p>');
        let $p3 = $('<p>MAGES - 0</p>');
        let $div = $('<div class="armyOutput"></div>');
        $fieldset.append($legend).append($p1).append($p2).append($p3).append($div)
        return $fieldset;
    }

    //Join kingdom
    let $joinCharacter = $('#characters').children().eq(3).children().eq(0);
    let $joinKingdom = $('#characters').children().eq(3).children().eq(1);
    let $joinBtn = $('#characters').children().eq(3).children().eq(2);

    $joinBtn.on('click', joinKingdom);

    function joinKingdom() {
        let $joinArmy = $('input[type="radio"]:checked');
        let currArmy = $joinArmy.val() + 's';
        let currKingdom = $joinKingdom.val().toLowerCase();

        if ($joinArmy.val() !== undefined
            && $joinCharacter.val().length >= 2
            && $joinKingdom.val()
            && $(`#${currKingdom}`).css('display') === "inline-block") {

            let armyElem = $(`#${currKingdom}`).find('fieldset p').toArray()
                .filter(x => x.textContent.split(' - ')[0] === currArmy.toUpperCase())[0];

            let currArr = armyElem.textContent.split(' - ');
            armyElem.textContent = `${currArr[0]} - ${+currArr[1] + 1}`;

            let nameElem = $(`#${currKingdom}`).find('fieldset div')[0]
            nameElem.textContent += ` ${$joinCharacter.val()}`; 
        }
    }

    //WAR

})();
