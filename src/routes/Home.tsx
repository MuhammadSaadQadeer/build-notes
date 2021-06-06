import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";
import { getCurrentTabUId, getCurrentTabUrl } from "../chrome/utils";

export const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [responseFromContent, setResponseFromContent] = useState<string>("");

  let { push } = useHistory();

  const messagesFromReactAppListener = (
    chromeMessage: any,
    sender: chrome.runtime.MessageSender,
    response: any
  ) => {
    console.log("ssss", chromeMessage);
  };

  /**
   * Get current URL
   */
  useEffect(() => {
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
      {/* <header className="App-header">
                <p>Home</p>
                <p>URL:</p>
                <p>
                    {url}
                </p>
                <button onClick={sendTestMessage}>SEND MESSAGE</button>
                <button onClick={sendRemoveMessage}>Remove logo</button>
                <p>Response from content:</p>
                <p>
                    {responseFromContent}
                </p>
                <button onClick={() => {
                    push('/about')
                }}>About page
                </button>
            </header> */}
      {/* <Editor
        onEditorStateChange={onEditorStateChange}
        editorState={editorText}
      /> */}
    </div>
  );
};
