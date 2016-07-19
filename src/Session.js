// Session.js
function Session(sessionData){
	this.ID = sessionData.ID
	this.taskType = sessionData.taskType;

	this.setDefaultSetting = function(settingData){
		this.defaultSetting = new Setting(settingData, sessionData);
	}
}