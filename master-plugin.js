function MasterMap(masterPage){
	this.masterPage = masterPage;
	this.keys = [];

	this.extractAllKeys = function(){
		return this.extractAllKeysFromString(this.masterPage);
	};

	this.extractAllKeysFromString = function(masterPage){
		var startIndex = masterPage.indexOf('[%');

		if(startIndex > 0)
		{
			var lastIndex = masterPage.indexOf('%]');
			this.keys.push(masterPage.slice(startIndex+2, lastIndex).trim());
			return this.extractAllKeysFromString(masterPage.substr(lastIndex + 2));
		}
		else
			return this.keys;
	};
}

function PageMap(keys){
	this.elements = {};
	this.keys = keys;

	this.extracElements = function () {
		for(var i = 0; i < this.keys.length; i++)
		{
			var html = document.getElementById(this.keys[i]).innerHTML;
			this.elements[this.keys[i]] = html;
		}

		return this.elements;
	};
}

function AjaxCallerWrapper(masterPageURL){
	this.masterPageURL = masterPageURL;
	
	this.createAjaxCallerObject = function (){
		 if(window.XMLHttpRequest)
			return new XMLHttpRequest();
		else
			return new ActiveXObject("Microsoft.XMLHTTP");
	};
	
	this.executeAjaxCall = function(onSuccessCallback){
		var ajaxCall = this.createAjaxCallerObject();
		ajaxCall.open("GET", this.masterPageURL);
		ajaxCall.send();
		ajaxCall.onreadystatechange = function (){ onSuccessCallback(ajaxCall) };
	};
}

function makePage (masterPage, elements, keys) {
	var pageToReturn = masterPage;

	for (var i = 0; i < keys.length; i++) {
		var regex = new RegExp("\\[\\%\\s*" + keys[i].toString() + "\\s*\\%\\]");
		pageToReturn = pageToReturn.replace(regex, elements[keys[i]]);
	}

	return pageToReturn;
}

function onResponseForAjaxCaller(responseText){
	var masterMapper = new MasterMap(responseText);
	var keys = masterMapper.extractAllKeys();
	var elements = (new PageMap(keys)).extracElements();

	document.write(makePage(responseText, elements, keys));
}

function onResponseForAjaxCallerForSuccessCall(ajaxCall) {
	if(ajaxCall.readyState == 4 && ajaxCall.status == 200)
		onResponseForAjaxCaller(ajaxCall.responseText);
}

function pageLoad(){
	var masterPageURL = document.getElementById("masterpage-plugin").getAttribute("url");
	var ajaxCallerWrapper = new AjaxCallerWrapper(masterPageURL);
	ajaxCallerWrapper.executeAjaxCall(onResponseForAjaxCallerForSuccessCall);
}

window.onload = pageLoad();