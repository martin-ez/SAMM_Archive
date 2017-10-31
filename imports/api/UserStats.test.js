import {Meteor} from "meteor/meteor";
import {assert} from "meteor/practicalmeteor:chai";
import {resetDatabase} from "meteor/xolvio:cleaner";
import {Factory} from "meteor/dburles:factory";
import {sinon} from 'meteor/practicalmeteor:sinon';
import {StatsDB} from "./UserStats";
import faker  from "faker";

if (Meteor.isServer) {
  //New group of tests
  describe('UserStats', function () {
    //New test
    describe('userStats.deleteUser', function () {
      let idUser;
      //Before Each test
      beforeEach(function () {
        StatsDB.remove({});//Delete Stats documents
        //Create new user
        //Create a fake mail to the user
        const email = faker.internet.email();
        const noSession = 0;
        const noSaved = 0;
        const favInstr = '-';
        const newUser = {email, noSession, noSaved, favInstr};
        //Add the new user and get the new id
        idUser = StatsDB.insert(newUser);
      });
      it('should delete the user', function () {
        //Call the method to test
        Meteor.call("userStats.deleteUser", {id: idUser});
        //Check if it was deleted correctly
        const doc = StatsDB.findOne({id:idUser});
        console.log(doc);
        assert.equal(null, doc);
      })
    });
  });


}



