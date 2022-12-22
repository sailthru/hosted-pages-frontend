import React, { useEffect, useMemo, useState } from "react";
import { PageTable } from "./PageTable";
import { CreatePageModal } from "./features/CreatePage/CreatePageModal";

import * as pagesApi from "../core/pagesApi";
import { ListLayout } from "@sailthru/stui-layouts";
import { Button } from "@sailthru/stui-elements";
import { ModalWrapper } from "@sailthru/stui-components";

function ListView() {
  const [loading, setLoading] = useState(true); // load from the start to prevent blip
  const [pageMap, setPageMap] = useState({});
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
      .catch(console.error)
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
        <PageTable
          loading={loading}
          pages={pagesData}
          getPageById={getPageById}
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
