import { Mongo } from 'meteor/mongo';

export const SavedDB = new Mongo.Collection('songs');
export const SessionDB = new Mongo.Collection('songsSesion');
