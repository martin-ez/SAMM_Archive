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
    SessionDB.insert({
      song:song,
      noUsers:noUsers
    });
  },
  'session.updateSong'({id,song}){
    SessionDB.update(id,{
      $set: {song:song}
    });
  },
  'session.addUser'({id}){
    var s = SessionDB.findOne(id);
    var users = s.noUsers+1;
    SessionDB.update(id,{
      $set: {noUsers:users}
    });
  },
  'session.deleteSong'({id}){
    SessionDB.remove(id);
  }
});
