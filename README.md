# Group 8: Auto vs. Train 

## Synopsis

This is a website designed to allow the public to compare the costs (time, money,
environmental impact) of traveling within Ohio, Michigan, Indian, and Pennsylvania
via car or train.

## Motivation

This project is trying to raise awareness of the benefits of passenger rail among
the public to help generate the support to implement a rail network within Ohio.

## Installation

_Assuming you have installed node.js and postgresql..._

1. Enter the folder containing the repo

2. Run `npm install` to install the required packages
3. Create the database (See Database Creation below, and this only has to be done when you clone to an empty file)
4. Add/customize configuration files.  Certain files may be missing/incomplete due to sensitive information like API keys.
5. Run `cd server` then `node server.js` to star the express server
6. Run `npm run dev` to start the development server
7. Navigate your browser to `localhost:3000` to view the main page
8. Navigate your browser to `localhost:3000\DB_Maintenance` to view the database demo

## Production/VM Server Setup
1. Log into the server via ssh, you'll need `sudo` access
2. Go to `/var/www/html/`
3. Clone the repo to the current file
4. Run `npm install`
5. Create the database (See Database Creation below, and this only has to be done when you clone to an empty file)
6. Run `npm run build`
7. Run `cd server`, then `node server.js`, then `cd ..`
8. In another terminal, or utilizing the Linux [screen](https://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/) command, run `npm start`
9. Your database of choice needs to be running, currently configured for mysql in a production environment.

# Apache 2 Configurations

The website requires that Apache route specific parts of the URL to specific ports. We did this on a Linux machine by:
  
1. Navigating to `/etc/apache2/sites-enabled/` and opening `000-default.conf`
2. Edit the file so it matches the following while updating it to match your server.

```
<VirtualHost *:80>
    
    ServerName csvm17.cs.bgsu.edu
    # ServerAlias www.csvm17.cs.bgsu.edu

    ProxyPass /database http://localhost:3001
    ProxyPassReverse /database http://localhost:3001
    
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    # The ServerName directive sets the request scheme, hostname and port that
    # the server uses to identify itself. This is used when creating
    # redirection URLs. In the context of virtual hosts, the ServerName
    # specifies what hostname must appear in the request's Host: header to
    # match this virtual host. For the default virtual host (this file) this
    # value is not decisive as it is used as a last resort host regardless.
    # However, you must set it for any further virtual host explicitly.
    #ServerName www.example.com

    ServerAdmin webmaster@localhost


    # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
    # error, crit, alert, emerg.
    # It is also possible to configure the loglevel for particular
    # modules, e.g.
    #LogLevel info ssl:warn

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # For most configuration files from conf-available/, which are
    # enabled or disabled at a global level, it is possible to
    # include a line for only one particular virtual host. For example the
    # following line enables the CGI configuration for this host only
    # after it has been globally disabled with "a2disconf".
    #Include conf-available/serve-cgi-bin.conf
    
    # ProxyHTMLLogVerbose On
        # LogLevel Info

</VirtualHost>

```

## Database Creation

1. Download and Install Sqlite from https://www.sqlite.org/index.html
2. For Windows, make sure you add your sqlite directory to PATH in environment variables for ease of use.
    - At the command prompt, navigate to your project/db_script directory
    - To create the database type: `sqlite3 avtDB.db <  avtDB_dump.sql`
    - To Login type: `sqlite3 avtDB.db`
    - To Test type: `SELECT * FROM stations;`
3. If updates are made to the dump file, the .db file will need to be deleted to recreate the new DB (for development use)

## Tests
    
Read `TESTING.md`.

## Contributors
- Jon Konecny
- Matt Jackson
- John Bartocci
- Mubarak Buhaya
- Izaak Kromer
- Nathen Tomes
- Kristopher Littlejohn
- Adarsh Gupta

