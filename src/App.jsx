import React from "react";
import { ListView } from './ListView/ListView';
import { ListViewTopPanel } from "./ListView/ListViewTopPanel";

export default function App() {
  return (
      <>
          <ListViewTopPanel />
          <ListView />
      </>
  );
}
