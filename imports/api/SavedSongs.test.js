import {Meteor} from "meteor/meteor";
import {assert} from "meteor/practicalmeteor:chai";
import {resetDatabase} from "meteor/xolvio:cleaner";
import {Factory} from "meteor/dburles:factory";
import {sinon} from 'meteor/practicalmeteor:sinon';
import {SavedDB} from "./SavedSongs";
import faker  from "faker";

if (Meteor.isServer) {
  //New group of tests
  describe('SavedSongs', function () {
    //New test
    describe('saved.addSong', function () {
      //Before Each test
      beforeEach(() => {
        resetDatabase();
      });
      //Create a fake name to the user
      const ownerName = faker.name.findName();
      it('should save the song', function () {
        const tempId = Math.floor((Math.random() * 20) + 1);
        const newSong = {tempId, "tempo": 80, "key": "D", "minor": true, "progression": [-1, 6, 7, 7], "progressionName": ["Dm", "A#", "C", "C"], "backgroundSound": "synth_brass_1", "band": "The SlateBlue Pheasants", "drums": {"user": "", "pattern": [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]], "volume": [1, 1, 1, 1]}, "bass": {"user": "", "pattern": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], "mode": 16}, "keys": {"user": "Disabled"}, "solo": {"user": "Disabled"}};
        //Call the method to test
        Meteor.call("saved.addSong", {song: newSong, owner: ownerName});
        //Check if it was saved correctly
        const doc = SavedDB.findOne({'song.tempId': tempId});
        assert.equal(80, doc.song.tempo);
        assert.equal("D", doc.song.key);
        assert.equal(ownerName, doc.owner);
      })
    });
  });


}


