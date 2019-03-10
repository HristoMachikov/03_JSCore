const SoftUniFy = require('./app.js');
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("SoftUniFy", function () {
    let suf;
    beforeEach(function () {
        suf = new SoftUniFy();
    })
    //CONSTRUCTOR
    describe("Constructor", function () {
        it("Should contain allSongs property that is initialized as an empty object.", function () {
            let actual = suf.allSongs;
            assert.deepEqual(actual, {}, "It have to be empty object!")
        });
        it("Should throw type error if set argument to allSongs property", function () {
            expect(() => suf.allSongs({})).to.throw(TypeError)
        });
    });
    //DOWNLOADSONG
    describe("downloadSong", function () {
        it("Should ONCE adds the given artist to the allSongs.", function () {
            let actual = suf.downloadSong("artist1", "song1", "lyrics1");
            let expected = { "allSongs": { "artist1": { "rate": 0, "votes": 0, "songs": ["song1 - lyrics1"] } } };
            assert.deepEqual(actual, expected);
        });
        it("Should TWICE adds the given artists to the allSongs.", function () {
            let actual = suf.downloadSong("artist1", "song1", "lyrics1");
            actual.downloadSong("artist2", "song2", "lyrics2")
            // console.log(JSON.stringify(suf))
            let expected = { "allSongs": { "artist1": { "rate": 0, "votes": 0, "songs": ["song1 - lyrics1"] }, "artist2": { "rate": 0, "votes": 0, "songs": ["song2 - lyrics2"] } } };
            assert.deepEqual(actual, expected);
        });
        it("Should TWICE adds the same artists to the allSongs.", function () {
            let actual = suf.downloadSong("artist1", "song1", "lyrics1");
            actual.downloadSong("artist1", "song2", "lyrics2")
            let expected = { "allSongs": { "artist1": { "rate": 0, "votes": 0, "songs": ["song1 - lyrics1", "song2 - lyrics2"] } } };
            assert.deepEqual(actual, expected);
        });
        // it("Should MANY adds the same artist to the allSongs.", function () {
        //     let expected = { "allSongs": { "artist1": { "rate": 0, "votes": 0, "songs": [] } } };
        //     for (let i = 0; i < 20; i++) {
        //         suf.downloadSong(`artist1`, `song${i}`, `lyrics${i}`);
        //         expected.allSongs.artist1.songs.push(`song${i} - lyrics${i}`)
        //     }
        //     assert.deepEqual(suf, expected);
        // });
        // it("Should MANY adds the different artists to the allSongs.", function () {
        //     let expected = { "allSongs": {} };
        //     for (let i = 0; i < 20; i++) {
        //         suf.downloadSong(`artist${i}`, `song${i}`, `lyrics${i}`);
        //         expected.allSongs[`artist${i}`] = { "rate": 0, "votes": 0, "songs": [`song${i} - lyrics${i}`] }
        //     }
        //     assert.deepEqual(suf, expected);
        // });
    });
    // PLAYSONG
    describe('playSong', function () {
        it('should searches all already downloaded songs and return the song', function () {
            suf.downloadSong("artist1", "song1", "lyrics1")
            let expected = { "allSongs": {} };
            for (let i = 0; i < 20; i++) {
                suf.downloadSong(`artist${i}`, `song${i}`, `lyrics${i}`);
                expected.allSongs[`artist${i}`] = { "rate": 0, "votes": 0, "songs": [`song${i} - lyrics${i}`] }
            }
            let output = "artist1:\n";
            output += "song1 - lyrics1\n"
            output += "song1 - lyrics1\n"
            //console.log(suf.playSong("song1"));
            assert.equal(suf.playSong("song1"), output);
        })
        it('should return message if the song is not found ', function () {
            let song = "song1";
            suf.downloadSong("artist0", "song0", "lyrics0")
            suf.downloadSong("artist2", "song2", "lyrics2")
            let output = `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`
            assert.equal(suf.playSong("song1"), output);
        })
        it('should return message if we do not have at least one downloaded song ', function () {
            let song = "song1";
            let output = `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`
            assert.equal(suf.playSong("song1"), output);
        })
    })
    // //SONGSLIST
    // describe('songsList', function () {
    //     it("should gets all already downloaded song", function () {
    //         let output = "";
    //         for (let i = 0; i < 20; i++) {
    //             suf.downloadSong(`artist${i}`, `song${i}`, `lyrics${i}`);
    //             output += `song${i} - lyrics${i}\n`;
    //         }
    //         assert.equal(suf.songsList, output.trim());
    //     })
    //     it('should return message if we do not have at least one downloaded song ', function () {
    //         assert.equal(suf.songsList, "Your song list is empty");
    //     })
    // })
    //RATEARTIST
    describe('rateArtist', function () {
        it('should return message "The undefined is not on your artist list."', function () {
            suf.downloadSong("artist1", "song1", "lyrics1");
            suf.downloadSong("artist1", "song2", "lyrics2");
            suf.downloadSong("artist2", "song2", "lyrics2")
            assert.equal(suf.rateArtist(), "The undefined is not on your artist list.");
        })
    })
});