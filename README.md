# BioDivAppConfigEditor
This project is part of a master thesis at the University of Applied Sciences Bremen.

##How to build this Project

1. Install Maven (version > 3.0) and don't forget to set M2_HOME and JAVA_HOME system variables to the right  path.
2. Toolchain: 
   1. Install compass (generates CSS from SASS-files (.scss)): http://compass-style.org/install/
      * Only needed if you intend to make changes in the layout !
   2. Install node.js: https://nodejs.org/en/download/
   3. Execute the command "npm install -g bower" to install bower  
   4. Execute the command "npm install -g grunt-cli" to install grunt
3. Execute "mvn spring-boot:run" to start the project in an embedded tomcat via maven
   * or execute "mvn spring-boot:run" -Pprod to start the project in production mode 
   * or execute "mvn package" to create a war file (found in target folder) 
   * or execute "mvn package -Pprod" to create a production war file (found in target folder) 
      * To run a war file in production mode the corresponding spring profile has to be aktivated 
         * Start the war file like this "java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod"
         * or add "-Dspring.profiles.active=prod" to your JAVA_OPTS when running your server

If anything goes wrong, please go through each of the steps above again. If there are still problems try to find 
the "node_modules" folder and delete it. Afterwards repeat the steps above once again.

[UPDATE 18.09.2015] It looks like Node.JS changed something. If there are multiple errors concerning node-gyp during the build please run the command "npm update node-gyp" on the project folder. Afterwards the maven build should be working again.

For frontend development you might want to run the project in development mode and use the command "grunt serve" 
on the project folder. It will start a separate instance of the frontend with enabled browser sync. Browser sync 
allows faster development because it takes care of reloading changed files into the browser. 
