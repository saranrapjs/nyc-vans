NYC VANS
=====

Code for importing and embedding commercial vehicles (and their data) from New York City.  Data is from the [Federal Motor Carrier Safety Administration](http://ai.fmcsa.dot.gov/) and here was where I found the Nov. 2012 data set:

http://ai.fmcsa.dot.gov/SMS/Data/Downloads.aspx

This'll give you a csv file, described by the gov as "1,338,795 Interstate,Intrastate Hazmat and Intrastate Non-Hazmat Motor Carriers".  You can then run `node import.js` to seed a sqlite db with this data.  This sqlite db is what's used to populate the site!  It's limited to records within NYC zip codes but you could really use this for any/all if you so please.  `node app.js` is used to run the express server

TODO:
* Canvas-ified version of the van itself (so as to be embeddable)
* Double check syntax for DROP TABLE IF EXISTS on initial import