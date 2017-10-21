import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const StatsDB = new Mongo.Collection('userStats');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('userStats', ()=>{
    return StatsDB.find();
  });
}

Meteor.methods({
  'userStats.addUser'({email, displayName, photoURL, noSession, noSaved, favInstr}){
    return StatsDB.insert({
      email:email,
      noSession:noSession,
      noSaved:noSaved,
      favInstr:favInstr
    });
  },
  'userStats.updateStats'({id, noSession, noSaved, favInstr}){
    return StatsDB.update(id,{
      $set: {
        noSession: noSession,
        noSaved: noSaved,
        favInstr: favInstr
      }
    });
  },
  'userStats.deleteUser'({id}){
    return StatsDB.remove(id);
  }
});
