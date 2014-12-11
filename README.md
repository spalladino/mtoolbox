# mtoolbox

Prototype mobile toolbox for sending SMS based health information to communities and workers using mBuilder. Developed during Epihack Tanzania on December 2014.

mtoolbox is a client-side only web application that interfaces with [InSTEDD mbuilder](http://mbuilder.instedd.org) for sending SMS messages to population based on their location and role. The live app is running on [http://spalladino.github.io/mtoolbox/](http://spalladino.github.io/mtoolbox/) using the mbuilder account `epihack.tanzania`.

## Libraries

This project uses [Twitter Bootstrap](http://getbootstrap.com/) for styling, and [jQuery](http://jquery.com/) as a Javascript library.

## Development

The most direct way to serve the application in development is by running `python -m SimpleHTTPServer` from within mtoolbox's folder, and then open a browser to `localhost:8000`.

## Configuration

Create a file `config.js` in the application folder with the following contents to access mbuilder:

```
USERNAME = "example@gmail.com";
MBUILDER_TRIGGER = 'example';
MBUILDER_APP_ID = 0;
MBUILDER_URL = "http://mbuilder.instedd.org/";
MBUILDER_CONTACTS_TABLE = "Contacts";
```

## Credits

The application was developed by:

* [Katuta Kaunda](https://github.com/GilchristK)
* [Chibill](https://github.com/chibill)
* [Mpoki](https://github.com/mpoki) from [SACIDS](http://sacids.org/)
* [Santiago Palladino]((https://github.com/spalladino)) from [InSTEDD](http://instedd.org/)

