import {Meteor} from "meteor/meteor";
import {assert} from "meteor/practicalmeteor:chai";
import {resetDatabase} from "meteor/xolvio:cleaner";
import {SessionDB} from "./SessionSongs";

if (Meteor.isServer) {
  //New group of tests
  describe('SessionSongs', function () {
    //New test
    describe('session.addSong', function () {
      //Before Each test
      beforeEach(() => {
        resetDatabase();
      });

      it('should save the song', function () {
        const tempId = Math.floor((Math.random() * 20) + 1);
        const newSong = {tempId, "tempo": 80, "key": "D", "minor": true, "progression": [-1, 6, 7, 7], "progressionName": ["Dm", "A#", "C", "C"], "backgroundSound": "synth_brass_1", "band": "The SlateBlue Pheasants", "drums": {"user": "", "pattern": [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]], "volume": [1, 1, 1, 1]}, "bass": {"user": "", "pattern": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], "mode": 16}, "keys": {"user": "Disabled"}, "solo": {"user": "Disabled"}};
        Meteor.call("session.addSong", {song: newSong, noUsers: 1});
        const doc = SessionDB.findOne({'song.tempId': tempId});
        assert.equal(80, doc.song.tempo);
        assert.equal("D", doc.song.key);
        assert.equal(1, doc.noUsers);
      })
    });
    //New test
    describe('session.updateSong', function () {
      let idSong;
      beforeEach(function () {
        SessionDB.remove({});//Delete SessionSongs documents
        //Create new song
        const newSong = {"tempo": 80, "key": "D", "minor": true, "progression": [-1, 6, 7, 7], "progressionName": ["Dm", "A#", "C", "C"], "backgroundSound": "synth_brass_1", "band": "The SlateBlue Pheasants", "drums": {"user": "", "pattern": [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]], "volume": [1, 1, 1, 1]}, "bass": {"user": "", "pattern": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], "mode": 16}, "keys": {"user": "Disabled"}, "solo": {"user": "Disabled"}};
        //Add the new Song and get the new id
        idSong = SessionDB.insert({song: newSong, noUsers: 1});
      });

      it('should update the song', function () {
        const tempId = Math.floor((Math.random() * 20) + 1);
        //UpdatedSong with a new property called tempId and with the properties key and tempo changed.
        const updatedSong = {tempId, "tempo": 50, "key": "A", "minor": true, "progression": [-1, 6, 7, 7], "progressionName": ["Dm", "A#", "C", "C"], "backgroundSound": "synth_brass_1", "band": "The SlateBlue Pheasants", "drums": {"user": "", "pattern": [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]], "volume": [1, 1, 1, 1]}, "bass": {"user": "", "pattern": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], "mode": 16}, "keys": {"user": "Disabled"}, "solo": {"user": "Disabled"}};
        //Call method session.updateSong and send updatedSong
        Meteor.call("session.updateSong", {id: idSong, song: updatedSong});
        const doc = SessionDB.findOne({_id: idSong});
        assert.equal(50, doc.song.tempo);
        assert.equal("A", doc.song.key);
        assert.equal(tempId, doc.song.tempId);
      });
    })
  });
}

