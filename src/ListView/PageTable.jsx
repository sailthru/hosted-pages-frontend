import React from "react";

import { Table } from "@sailthru/stui-components";
import { PageTableHoverOptions } from "./PageTableHoverOptions";

/** Configures STUI Table to render data in columns */
function PageTable({ loading, pages, getPageById }) {
  const columns = React.useMemo(
    () => [
      {
        id: "page-mode-icons",
        accessor: (p) => p.pageId,
        width: 20,
        disableSortBy: true,
        Cell: function ({ cell }) {
          const pageId = cell.value;
          const page = getPageById(pageId);
          if (page.mode == "visual") {
            return (
              <i className="fal fa-pencil-ruler" title="Visual Template" />
            );
          } else {
            return (
              <>
                <i className="fal fa-code" title="HTML Template" />
              </>
            );
          }
        },
      },
      {
        Header: "Page Name",
        accessor: (p) => p.pageId,
        Cell: function ({ cell }) {
          const pageId = cell.value;
          const page = getPageById(pageId);
          return (
            <>
              <a
                target="_self"
                href={pageEditorUrl(page.pageId, page.mode)}
                rel="noreferrer"
              >
                {page.name}
              </a>
            </>
          );
        },
      },
      {
        Header: "URL",
        accessor: "url",
        disableSortBy: true,
        width: 200,
        Cell: function ({ cell }) {
          return (
            <>
              {cell.value.url_display}{" "}
              <a target="_blank" href={cell.value.url} rel="noreferrer">
                <i className="fas fa-external-link-alt" title="Live Page" />
              </a>
            </>
          );
        },
      },
      {
        Header: "Category",
        accessor: (row) => row.type[0].toUpperCase() + row.type.slice(1),
      },
      {
        Header: "Last Modified",
        accessor: "modifyTime",
      },
      {
        Header: "Modify User",
        accessor: "modifyUser",
        disableSortBy: true,
      },
      {
        id: "id",
        accessor: (p) => p,
        width: 0.2,
        disableSortBy: true,
        Cell: (cell) => (
          <PageTableHoverOptions
            pageId={cell.value.pageId}
            pageEditorUrl={pageEditorUrl(cell.value.pageId, cell.value.mode)}
          />
        ),
      },
    ],
    [pages]
  );

  return (
    <Table
      isLoading={loading}
      columns={columns}
      data={pages}
      enableTextWrap={true}
      totalItems={pages.length}
      pageSize={20}
      pageIndex={0}
      plugins={{
        columnSort: true,
        pagination: true,
      }}
    />
  );
}

export { PageTable };

export function pageEditorUrl(pageId, pageMode) {
  const htmlPageUrl = `/page?page_id=${pageId}`; // TODO add click through see EPT-1713
  const visualPageUrl = "/hosted-pages-list";
  if (pageMode == "visual") {
    return visualPageUrl;
  } else {
    return htmlPageUrl;
  }
}
