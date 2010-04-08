var appUpdater = new runtime.air.update.ApplicationUpdater();

function checkUpdate() {
    var xmlString = air.NativeApplication.nativeApplication.applicationDescriptor;
    var appXml = new DOMParser();
    var xmlobject = appXml.parseFromString(xmlString, "text/xml");
    var root = xmlobject.getElementsByTagName('application')[0];
    var appVersion = root.getElementsByTagName("version")[0].firstChild.data;
    var appDescription = root.getElementsByTagName("description")[0].firstChild.data;
   
    document.getElementById('version').innerHTML = appVersion;
	document.getElementById('description').innerHTML = appDescription;

	appUpdater.configurationFile = new air.File("app:/updater/config.xml");
	
	appUpdater.addEventListener(runtime.air.update.events.UpdateEvent.INITIALIZED, Initialized);
	appUpdater.addEventListener(runtime.flash.events.ErrorEvent.ERROR, onError);
	appUpdater.addEventListener(runtime.air.update.events.DownloadErrorEvent.DOWNLOAD_ERROR, onError);
	appUpdater.addEventListener(runtime.air.update.events.UpdateEvent.DOWNLOAD_COMPLETE, GotConfig);

	appUpdater.initialize();
}

function Initialized(event) { 
	appUpdater.checkNow();
}

function GotConfig(event){
	var xmlString = appUpdater.updateDescriptor;
	var appXml = new DOMParser();
    var xmlobject = appXml.parseFromString(xmlString, "text/xml");
    var root = xmlobject.getElementsByTagName('update')[0];
    var remoteVersion = root.getElementsByTagName("version")[0].firstChild.data;
    var remoteDescription = root.getElementsByTagName("description")[0].firstChild.data;
	
	document.getElementById('remoteVersion').innerHTML = remoteVersion;
	document.getElementById('remoteDescription').innerHTML = remoteDescription;
	
	document.getElementById('update').style.display = '';
	event.preventDefault();
}

function onError(event) {
   alert(event);
}

function UpdateMe(event){
	appUpdater.installUpdate();
}

checkUpdate();