function getSelectionAsText() {
	const selection = document.getSelection();

	if (selection.rangeCount === 0) {
		return '';
	}

	const selectionRange = selection.getRangeAt(0); // Only consider the first range

	const fragment = selectionRange.cloneContents();
	const wrapper = document.createElement('div');
	wrapper.append(fragment);

	// Converts relative links to absolute links (#6)
	wrapper.querySelectorAll('a').forEach(link => link.setAttribute('href', link.href));

	// For tables, remove all immediate child nodes that are not required
	const tables = wrapper.querySelectorAll('table');
	for (const table of tables) {
		const floaters = Array.from(table.children).filter(node => !['THEAD', 'TBODY', 'TR', 'TFOOT'].includes(node.tagName));
		for (const floater of floaters) {
			floater.remove();
		}
	}

	return wrapper.textContent;
}

getSelectionAsText();
