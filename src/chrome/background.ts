export {};
let prevData = "";
chrome.contextMenus.create({
  id: "send-text",
  title: "Add Text To Easy Note",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.runtime.sendMessage(info.selectionText);

  chrome.storage.sync.get(["key"], function (result) {
    if (result.key) {
      prevData = result.key + " " + info.selectionText;
    } else {
      // @ts-ignore
      prevData = info.selectionText;
    }

    //@ts-ignore
    chrome.storage.sync.set({ key: prevData }, function () {});
  });
});

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("[background.js] onConnect", port);
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log("[background.js] onSuspend");
});
