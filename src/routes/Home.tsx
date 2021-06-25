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

    let prevData = editorRef.getData();

    editorRef.setData(prevData.concat(chromeMessage));
  };

  /**
   * Get current URL
   */
  useEffect(() => {
    chrome.storage.sync.get(["key"], function (result) {
      let prevData = editorRef.getData();
      editorRef.setData(prevData.concat(result.key));
    });

    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

    getCurrentTabUrl((url) => {
      setUrl(url || "undefined");
    });
  }, []);

  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "Hello from React",
    };

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
          setResponseFromContent(responseFromContentScript);
        });
    });
  };

  const sendRemoveMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "delete logo",
    };

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          setResponseFromContent(response);
        });
    });
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
          editorRef = editor;
          let prevData = editor.getData();
          console.log({ prevData });
          editor.setData(prevData.concat(newSelection));
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};
