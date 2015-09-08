# BioDivAppConfigEditor
This project is part of a master thesis at the University of Applied Sciences Bremen.

How to build this Project
----------------------------------------------------------------------------------------------------------------------

1. Install Maven (version > 3.0) and don't forget to set M2_HOME and JAVA_HOME system variables to the right  path.
2. Toolchain:

   2.1 Install node.js    
   2.2 Execute the command "nmp install -g bower" to install bower  
   2.3 Execute the command "nmp install -g grunt-cli" to install grunt
3. Execute "mvn spring-boot:run" to start the project via maven
   or execute "mvn spring-boot:run" -Pprod to start the project in production mode (notice that the 
   or execute "mvn package" to create a war file (found in target folder) 
   or execute "mvn package .Pprod" to create a production war file (found in target folder) 
      to run a war file in production mode the corresponding spring profile has to be aktivated 
      Exampel: "java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod"

If anything goes wrong, please go through each of the steps above again. If there are still problems try to find 
the "node_modules" folder and delete it. Afterwards repeat the steps above once again.

For frontend development you might want to run the project in development mode and use the command "grunt serve" 
on the project folder. It will start a separate instance of the frontend with enables browser sync. Browser sync 
allows faster development because it takes care of reloading changes files into the browser. 
