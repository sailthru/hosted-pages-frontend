import React, { useEffect, useMemo, useState } from "react";
import { PageTable } from "./PageTable";
import { CreatePageModal } from "./CreatePage/CreatePageModal";

import * as pagesApi from "../core/pagesApi";
import { ListLayout } from "@sailthru/stui-layouts";
import { Button } from "@sailthru/stui-elements";
import { ModalWrapper } from "@sailthru/stui-components";
import { ResultNotification } from "../shared/ResultNotification";

const LoadPagesErrorMessage =
  "Something went wrong and hosted pages could not be retrieved. Please refresh and try again.";

function ListView() {
  const [loading, setLoading] = useState(true); // load from the start to prevent blip
  const [pageMap, setPageMap] = useState({});
  const [notificationType, setNotificationType] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const pagesData = useMemo(
    () => [...Object.values(pageMap)],
    [Object.values(pageMap)]
  );
  const [displayModal, setDisplayModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [mode, setMode] = useState();
  useEffect(getPages, []);

  function getPages() {
    pagesApi
      .fetchPages()
      .then((res) => {
        const map = res.reduce((accum, curr) => {
          const pageId = curr?.id;
          if (pageId != null) {
            accum[pageId] = {
              pageId: pageId,
              mode: curr.mode,
              name: curr.name,
              type: curr.type,
              url: curr.url,
              modifyUser: curr.modify_user,
              modifyTime: curr.modify_time,
              editorUrl: curr.editor_url,
            };
          }
          return accum;
        }, {});
        setPageMap(map);
      })
      .catch(function (error) {
        console.log("Error loading pages", error);
        setNotificationType("error");
        setNotificationMessage(LoadPagesErrorMessage);
      })
      .finally(() => setLoading(false));
  }

  function getPageById(pageId) {
    return pageMap[pageId];
  }

  return (
    <>
      <ListLayout
        pageTitle="Hosted Pages"
        cta={
          <Button
            onClick={() => {
              setModalTitle(() => "New HTML Page");
              setMode(() => "html");
              setDisplayModal((state) => !state);
            }}
          >
            New Page
          </Button>
        }
      >
        <ResultNotification
          display={notificationType}
          message={notificationMessage}
          type={notificationType}
        />
        <PageTable
          loading={loading}
          pages={pagesData}
          getPageById={getPageById}
          setNotificationType={setNotificationType}
          setNotificationMessage={setNotificationMessage}
        />
      </ListLayout>

      <ModalWrapper display={displayModal}>
        <CreatePageModal
          title={modalTitle}
          mode={mode}
          setDisplayModal={setDisplayModal}
        />
      </ModalWrapper>
    </>
  );
}

export { ListView };
