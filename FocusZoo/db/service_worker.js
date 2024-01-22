import * as database from './database.js';
import * as websites from './websites.js';

database.createZooDatabase();


websites.initWebsites(function () {
});