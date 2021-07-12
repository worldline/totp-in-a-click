/* global __INJECTIBLE_CODE__: readonly */

import totp from 'totp-generator';
import parseURI from 'otpauth-uri-parser';

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
	let code = ''

	const completionData = await browser.tabs.executeScript(tab.id, {
		frameId: info.frameId,
		code: __INJECTIBLE_CODE__ // Replaced by webpack with actual code
	});

	htmlContent = (completionData[0] || '').trim();
	if (htmlContent.startsWith('otpauth://')) {
		const parsed = parseURI(htmlContent)
		const secret = parsed["query"]["secret"]
		const digits = Number(parsed["query"]["digits"]) || 6
		const algorithm = parsed["query"]["algorithm"] || "SHA-1"
		const period = Number(parsed["query"]["period"]) || 30
		code = totp(secret, {
			digits: digits,
			algorithm: algorithm,
			period: period,
		})
	}else{
		code = totp(htmlContent);
	}

	const inputElement = document.createElement('textarea');
	document.body.append(inputElement);
	inputElement.value = code;
	inputElement.focus();
	inputElement.select();
	document.execCommand('Copy');
	inputElement.remove();
});
