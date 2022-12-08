import React, { useEffect, useState } from "react";
import { PageTable } from "./PageTable";
import { ListViewLayout } from "./ListViewLayout";

import * as pagesApi from "../core/pagesApi";

function ListView() {
  const [loading, setLoading] = useState(true); // load from the start to prevent blip
  const [pageMap, setPageMap] = useState({});
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
    <ListViewLayout>
      <PageTable
        loading={loading}
        pages={Object.values(pageMap)}
        getPageById={getPageById}
      />
    </ListViewLayout>
  );
}

export { ListView };
