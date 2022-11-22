import React from "react";
import { ListView } from './ListView/ListView';
import { ListViewTopPanel } from "./ListView/ListViewTopPanel";

export default function App() {
  return (
      <div>
          <ListViewTopPanel />
          <ListView />
      </div>
  );
}
