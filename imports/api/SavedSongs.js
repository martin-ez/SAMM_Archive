import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const SavedDB = new Mongo.Collection('saved');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('saved', ()=>{
    return SavedDB.find();
  });
}

Meteor.methods({
  'saved.addSong'({song, owner}){
    return SavedDB.insert({
      song:song,
      owner:owner
    });
  },
  'saved.updateSong'({id, song}){
    return SavedDB.update(id,{
      $set: {song:song}
    });
  },
  'saved.deleteSong'({id}){
    return SavedDB.remove(id);
  }
});
