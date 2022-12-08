import React from "react";
import { ListLayout } from "@sailthru/stui-layouts";
import { Button } from "@sailthru/stui-elements";

function handleCreate() {
  // TODO see EPT-1715
}

const ListViewLayout = ({ children }) => {
  return (
    <>
      <ListLayout
        pageTitle="Hosted Pages"
        cta={<Button onClick={handleCreate}>New Page</Button>}
      >
        {children}
      </ListLayout>
    </>
  );
};

export { ListViewLayout };
