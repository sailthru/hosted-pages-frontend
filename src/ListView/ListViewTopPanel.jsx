import React from 'react';
import styled from 'styled-components';
import { PageTopPanel } from '@sailthru/stui-regions';
import { Button } from "@sailthru/stui-elements";

const Header = styled.header`
    margin-bottom: 10px;
`;

const NewButton = styled.div`
    position: absolute;
    right: 20px;
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
