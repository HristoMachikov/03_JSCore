(function solve() {

    $('#kingdom button').on('click', rebuildKingdom);

    let kingdomArr = ["castle", "dungeon", "fortress", "inferno", "necropolis", "rampart", "stronghold", "tower", "conflux"];
    let rebuildKingdomArr = [];
    let objAttacker = { "MAGES": 70, "FIGHTERS": 50, "TANKS": 20 };
    let objDefender = { "MAGES": 30, "FIGHTERS": 50, "TANKS": 80 };

    function rebuildKingdom() {
        let $kingdom = $('#kingdom input').eq(0);
        let $king = $('#kingdom input').eq(1);

        let kingdom = $kingdom.val().toLowerCase();
        let king = $king.val().toLowerCase();

        if ($king.val().trim().length >= 2
            && kingdomArr.includes(kingdom)
            && !rebuildKingdomArr.includes(kingdom)) {

            rebuildKingdomArr.push(kingdom)
            let $rebuildKingdom = $(`#${kingdom}`);

            $rebuildKingdom.css("display", "inline-block");
            let $h1 = $(`<h1>${kingdom.toUpperCase()}</h1>`);
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
    $('#characters button').on('click', joinKingdom);

    function joinKingdom() {
        let $joinCharacter = $('#characters').children().eq(3).children().eq(0);
        let $joinKingdom = $('#characters').children().eq(3).children().eq(1);

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
            nameElem.textContent += `${$joinCharacter.val()} `;
        } else {
            $joinCharacter.val("");
            $joinKingdom.val("");
        }
    }

    //WAR
    $('#actions button').on('click', attack)

    function attack() {
        let $attacker = $('#actions input').eq(0);
        let $defender = $('#actions input').eq(1);

        let attacker = $attacker.val().toLowerCase();
        let defender = $defender.val().toLowerCase();

        if (rebuildKingdomArr.includes(attacker)
            && rebuildKingdomArr.includes(defender)
            && attacker !== defender) {

            let armyAttacker = $(`#${attacker}`).find('fieldset p').toArray()
                .map(x => x.textContent);
            let armyDefender = $(`#${defender}`).find('fieldset p').toArray()
                .map(x => x.textContent);

            let attackerPoints = 0;
            let defenderPoints = 0;

            for (const elem of armyAttacker) {
                let armyName = elem.split(' - ')[0];
                let armyValue = Number(elem.split(' - ')[1]);
                attackerPoints += objAttacker[armyName] * armyValue;
            }
            for (const elem of armyDefender) {
                let armyName = elem.split(' - ')[0];
                let armyValue = Number(elem.split(' - ')[1]);
                defenderPoints += objDefender[armyName] * armyValue;
            }

            if (attackerPoints > defenderPoints) {
                $(`#${defender} h2`).text($(`#${attacker} h2`).text());
            }
        }
        else {
            $attacker.val("");
            $defender.val("");
        }
    }

})();