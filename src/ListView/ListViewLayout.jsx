import React, { useState } from "react";
import { ListLayout } from "@sailthru/stui-layouts";
import { Button } from "@sailthru/stui-elements";
import { ModalWrapper } from "@sailthru/stui-components";
import { CreatePageModal } from "./features/CreatePage/CreatePageModal";

const ListViewLayout = ({ children }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [mode, setMode] = useState();

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
        {children}
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
};

export { ListViewLayout };
