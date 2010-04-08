@echo off
REM Prepend the "adt" part with path to your installed air sdk bin folder (http://www.adobe.com/products/air/tools/sdk/)
echo Air On Github Sample
echo ****************************  
echo building...

adt -package -storetype pkcs12 -keystore AirOnGithub.p12 AirOnGithub.air ./application.xml -C ./ icons lib index.html updater/config.xml