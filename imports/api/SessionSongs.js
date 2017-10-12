import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const SessionDB = new Mongo.Collection('session');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('session', ()=>{
    return SessionDB.find();
  });
}

Meteor.methods({
  'session.addSong'({song,noUsers}){
    return SessionDB.insert({
      song:song,
      noUsers:noUsers
    });
  },
  'session.updateSong'({id,song}){
    return SessionDB.update(id,{
      $set: {song:song}
    });
  },
  'session.addUser'({id}){
    var s = SessionDB.findOne(id);
    var users = s.noUsers+1;
    return SessionDB.update(id,{
      $set: {noUsers:users}
    });
  },
  'session.deleteSong'({id}){
    return SessionDB.remove(id);
  }
});
