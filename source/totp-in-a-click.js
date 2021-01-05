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
	const code = totp(htmlContent.trim());

	const inputElement = document.createElement('textarea');
	document.body.append(inputElement);
	inputElement.value = code;
	inputElement.focus();
	inputElement.select();
	document.execCommand('Copy');
	inputElement.remove();
});
