import React from "react";
import { Table } from "@sailthru/stui-components";
import PageTableActions from "./PageTableActions";


/** Configures STUI Table to render data in columns */
function PageTable({ loading, pages, getPageById, displayModal }) {
  const columns = [
    {
      id: "page-mode-icons",
      accessor: (p) => p.pageId,
      width: 20,
      disableSortBy: true,
      Cell: function ({ cell }) {
        const pageId = cell.value;
        const page = getPageById(pageId);
        if (page.mode == "visual") {
          return <i className="fal fa-pencil-ruler" title="Visual Template" />;
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
        const htmlPageUrl = `/page?page_id=${pageId}`;
        const visualPageUrl = "/hosted-pages-list"; // TODO add click through see EPT-1713
        if (page.mode == "visual") {
          return (
            <a target="_self" href={visualPageUrl}>
              {" "}
              {page.name}{" "}
            </a>
          );
        } else {
          return (
            <a target="_self" href={htmlPageUrl}>
              {" "}
              {page.name}{" "}
            </a>
          );
        }
      },
    },
    {
      Header: "URL",
      accessor: "url",
      disableSortBy: true,
      width: 200,
      Cell: function ({ cell }) {
        return (
          <div>
            {" "}
            {cell.value.url_display}{" "}
            <a target="_blank" href={cell.value.url}>
              <i className="fas fa-external-link-alt" title="Live Page" />
            </a>
          </div>
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
      accessor: (p) => p.pageId,
      width: 0.2,
      disableSortBy: true,
      Cell: (cell) => (<PageTableActions pageId={cell.value} />)
    },
  ];

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
