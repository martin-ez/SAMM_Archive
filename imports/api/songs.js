import { Mongo } from 'meteor/mongo';

export const SongsDBsaved = new Mongo.Collection('songs');
export const SongsDBsesion = new Mongo.Collection('songsSesion');

//Y los métodos?
