/* global __INJECTIBLE_CODE__: readonly */

import totp from 'totp-generator';

// Action listener to redirect user to source repo
browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: 'https://github.com/worldline/totp-in-a-click'
	});
});

// Add context menus for specific actions
browser.contextMenus.create({
	id: 'generate-totp',
	title: 'Generate TOTP',
	contexts: ['selection']
});

// Listener for events from context menus
browser.contextMenus.onClicked.addListener(async (info, tab) => {
	let htmlContent = '';

	const completionData = await browser.tabs.executeScript(tab.id, {
		frameId: info.frameId,
		code: __INJECTIBLE_CODE__ // Replaced by webpack with actual code
	});

	htmlContent = completionData[0] || '';
  let selection = htmlContent.trim()
  let selectionAsList = selection.split('&')
  let options = {digits: 6, algorithm: 'SHA-1', period: 60}
  let key = ''
  for(item in selectionAsList) {
    if (item.includes("=")) {
      tempList = item.split("=")
      if ("period" == tempList[0] || "digits" == tempList[0]) {
        options[tempList[0]] = parseInt(tempList[1])
      } else {
        options[tempList[0]] = tempList[1]
      }
    } else {
      key = item
    }
  }
	const code = totp(key,options);

	const inputElement = document.createElement('textarea');
	document.body.append(inputElement);
	inputElement.value = code;
	inputElement.focus();
	inputElement.select();
	document.execCommand('Copy');
	inputElement.remove();
});
