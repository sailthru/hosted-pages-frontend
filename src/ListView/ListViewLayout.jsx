import React, { useEffect, useState } from "react";
import { ListLayout } from "@sailthru/stui-layouts";
import { Button } from "@sailthru/stui-elements";
import { Modal, ModalWrapper } from "@sailthru/stui-components";
import { CreatePageForm } from "./CreatePageForm";
import * as pagesApi from "../core/api";

const ListViewLayout = ({ children }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [mode, setMode] = useState();

  function handleFormChange(changedField) {
    const newState = Object.assign({}, state, changedField);
    setError(false);
    setState(newState);
  }
  function handleSubmit(done) {
    //FIXME
    setDisableSubmitButton(true);
    pagesApi
      .createPage({ ...state, mode })
      .then(done)
      .catch((e) => setError(true));
    //             .finally(setDisplayModal((state) => !state))
  }
  useEffect(() => {
    setDisableSubmitButton(false);
    if (!state.name || !state.type) {
      setDisableSubmitButton(true);
    }
  });
  return (
    <>
      <ListLayout
        pageTitle="Hosted Pages"
        cta={
          <Button
            onClick={() => {
              setDisplayModal((state) => !state);
              setModalTitle(() => "New HTML Page");
              setMode(() => "html");
            }}
          >
            New Page
          </Button>
        }
      >
        {children}
      </ListLayout>

      <ModalWrapper display={displayModal}>
        <Modal
          title={modalTitle}
          applyButtonText="Create"
          disableApply={disableSubmitButton}
          onApply={handleSubmit}
          onDismiss={() => setDisplayModal(false)}
        >
          <CreatePageForm
            name={state.name}
            type={state.type}
            onChange={handleFormChange}
          />
        </Modal>
      </ModalWrapper>
    </>
  );
};

export { ListViewLayout };
