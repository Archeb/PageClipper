import { MeiliSearch } from "../../lib/privateSearch/meilisearch.esm.js";
import { UUID } from "../../lib/privateSearch/uuid.esm.js";

let enabled = true;

export { enabled, onMessage, indexDocument, createScreenshot };

async function onMessage(message) {
	if (message.method.endsWith(".state")) {
		return { enabled };
	}
}

async function createScreenshot(tab) {
	// return uint8array of screenshot
	return chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" }).then((dataURI) => {
		if (dataURI) {
			return dataURLtoUInt8Array(dataURI);
		} else {
			console.error("Error capturing screenshot");
			return null;
		}
	});
}

async function indexDocument(message, tab) {
	const content = message.pageData.content;
	const title = tab.title;
	const url = tab.url;
	const client = new MeiliSearch({
		host: message.privateSearchURL + "/meili/",
		apiKey: message.privateSearchToken,
	});
	const index = client.index(message.privateSearchIndex);

	// extract all the text from the content, ignoring invisible elements like <style> and <script>
	let text = "";
	text = content.replace(/<style([\s\S]*?)<\/style>/gi, "");
	text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
	text = text.replace(/<\/div>/gi, "\n");
	text = text.replace(/<\/li>/gi, "\n");
	text = text.replace(/<li>/gi, "  *  ");
	text = text.replace(/<\/ul>/gi, "\n");
	text = text.replace(/<\/p>/gi, "\n");
	text = text.replace(/<br\s*[\/]?>/gi, "\n");
	text = text.replace(/<[^>]+>/gi, " ");

	// feed the text to the meilisearch REST API
	const data = {
		id: UUID.generate(),
		title: title,
		url: url,
		text: text,
		filename: message.filename,
		timestamp: Date.now(),
	};
	await index.addDocuments([data]);
}

function dataURLtoUInt8Array(dataurl) {
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return u8arr;
}
