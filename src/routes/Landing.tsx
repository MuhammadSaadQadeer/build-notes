import React from "react";
import { useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { Dimmer, Loader, Button, Segment } from "semantic-ui-react";

const fetchValue = (url: string) => {
  return fetch(url, {
    method: "GET",
  });
};

function Landing() {
  const [execute, response, isLoading] = useAsync(fetchValue);
  const [documentContent, setDocumentContent] = React.useState(false);

  const [executeDocContent, contentResponse, isContentLoading] =
    useAsync(fetchValue);

  useEffect(() => {
    //@ts-ignore
    execute("http://localhost:3000/data");
    //@ts-ignore
    executeDocContent("http://localhost:3000/documents");
  }, []);

  const showDocumentContent = (documentId: any) => {
    console.log(documentId, contentResponse);
    // setDocumentContent(documentId);
    //@ts-ignore
    let content = contentResponse.filter(
      (document: any) => document.refId == documentId
    );
    console.log({ content });
    setDocumentContent(content[0].content);
  };
  return (
    <div>
      <>
        {isLoading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {response && !documentContent ? (
              //@ts-ignore
              response.map(
                (card: {
                  id: number;
                  title: string;
                  noOfDocs: number;
                  list: [];
                }) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        showDocumentContent(card.id);
                      }}
                    >
                      <div style={{ margin: 5, cursor: "pointer" }}>
                        <Segment>
                          <h5 style={{ textTransform: "capitalize" }}>
                            {card.title}
                          </h5>

                          <h6>Documents: {card.noOfDocs}</h6>
                          <h4>Labels</h4>
                          <Button size="mini" color="red">
                            #Learning
                          </Button>
                          <Button size="mini" color="orange">
                            #Extensions
                          </Button>
                        </Segment>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div>
                <>
                  {
                    <Button onClick={() => setDocumentContent(false)}>
                      Back
                    </Button>
                  }
                  <div //@ts-ignore
                    dangerouslySetInnerHTML={{ __html: documentContent }}
                  />
                </>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
}

export default Landing;
