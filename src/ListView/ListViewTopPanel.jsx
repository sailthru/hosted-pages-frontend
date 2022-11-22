import React from 'react';
import styled from 'styled-components';
import { PageTopPanel } from '@sailthru/stui-regions';
import { Button } from "@sailthru/stui-elements";

const Header = styled.header`
    grid-area: header;
    position: initial;
    z-index: auto;
    margin-bottom: 10px;
`;

const NewButton = styled.div`
    display: flex;
    position: absolute;
    right: 20px;
    z-index: 2;
`;

function handleCreate() {
    // TODO see EPT-1715
}

const ListViewTopPanel = () => (
    <Header>
        <PageTopPanel
            title="Hosted Pages"
            backgroundColor="dark"
        >
            <NewButton>
                <Button onClick={handleCreate}>
                    New Page
                </Button>
            </NewButton>
        </PageTopPanel>
    </Header>
);

export { ListViewTopPanel };
