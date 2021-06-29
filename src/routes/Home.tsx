// @ts-nocheck
import React, { useEffect, useState } from "react";

import { ChromeMessage, Sender } from "../types";
import { getCurrentTabUId, getCurrentTabUrl } from "../chrome/utils";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editorRef = {};

export const Home = () => {
  const [newSelection, setNewSelection] = useState("");

  const messagesFromReactAppListener = (
    chromeMessage: any,
    sender: chrome.runtime.MessageSender,
    response: any
  ) => {
    setNewSelection(chromeMessage);

    let previousState = editorRef.getData();

    editorRef.setData(previousState.concat(chromeMessage));
  };

  /**
   * Get current URL
   */
  useEffect(() => {
    chrome.storage.sync.get(["key", "string"], function (result) {
      // Adding the formatted data in editor if any
      let previousState = "";
      if (result["string"]) {
        previousState = editorRef.getData();
        editorRef.setData(previousState.concat(result["string"]));
      }

      if (result.key) {
        previousState = editorRef.getData();
        editorRef.setData(previousState.concat(result.key));
        chrome.storage.sync.remove(["key", "string"]);
      }
    });

    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

    getCurrentTabUrl((url) => {
      //  setUrl(url || "undefined");
    });
  }, []);

  // const sendTestMessage = () => {
  //   const message: ChromeMessage = {
  //     from: Sender.React,
  //     message: "Hello from React",
  //   };

  //   getCurrentTabUId((id) => {
  //     id &&
  //       chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
  //         setResponseFromContent(responseFromContentScript);
  //       });
  //   });
  // };

  // const sendRemoveMessage = () => {
  //   const message: ChromeMessage = {
  //     from: Sender.React,
  //     message: "delete logo",
  //   };

  //   getCurrentTabUId((id) => {
  //     id &&
  //       chrome.tabs.sendMessage(id, message, (response) => {
  //         setResponseFromContent(response);
  //       });
  //   });
  // };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <CKEditor
        editor={ClassicEditor}
        // data={contentState}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          editorRef = editor;
          editor.setData(editor.getData().concat(newSelection));
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          chrome.storage.sync.set({ string: data });
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};
