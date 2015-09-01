# BioDivAppConfigEditor
This project is part of a master thesis at the University of Applied Sciences Bremen.

How to build this Project
----------------------------------------------------------------------------------------------------------------------

1. Install Maven (version > 3.0) and don't forget to set M2_HOME and JAVA_HOME system variables to the right  path.
2. install node.js
2.1 Execute the command "nmp install -g bower" to install bower  
2.2 Execute the command "nmp install -g grunt-cli" to install grunt
3. Execute mvn spring-boot:run to start the project via maven
   or execute mvn spring-boot:run -Pprod to start the project in production mode
   or execute mvn package 
   

If anything goes wrong, pleas go through each of the steps above again. If there are still problems try to find 
the "node_modules" folder and delete it. Afterwards repeat the steps above once again.