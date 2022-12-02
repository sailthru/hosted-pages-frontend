import React from "react";
import { ListLayout } from "@sailthru/stui-layouts";
import {Button} from "@sailthru/stui-elements";
import {Modal} from "@sailthru/stui-components";

function handleCreate() {
    // TODO see EPT-1715
}
const ListViewLayout = ({children}) => {
    return(
        <>
            <Modal
                title="Add New Font"
                applyButtonText="Add font"
                //             disableApply={disableSubmitButton}
                onApply={() => alert("appl")}
                //             onDismiss={done}
            > <p>hello james</p>
            </Modal>
            <ListLayout
                pageTitle="Hosted Pages"
                cta={(
                    <Button onClick={handleCreate}>
                        Add new page
                    </Button>
                )}
            >
                {children}
            </ListLayout>
        </>
    );
}

export { ListViewLayout };
