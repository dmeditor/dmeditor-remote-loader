import * as React from "react";
import {
  initLanguage,
  registerDefaultWidgets,
  setDMEditorConfig,
} from "dmeditor";
import { nanoid } from "nanoid";
import { RemoteLoaderPlugin } from "../src";
import * as dmeditor from "dmeditor";

initLanguage("nor-NO");
registerDefaultWidgets();

//load remote widget asynchronically
const remoteLoader = new RemoteLoaderPlugin(dmeditor, {
  loadBaseUrl: "http://dmeditor-repo.dev.digimaker.no",
  repoUrl: "http://dmeditor-repo.dev.digimaker.no/dmeditor.json",
});
remoteLoader.init().then(() => {
  console.log("remote widgets:", remoteLoader.repositoriesPackage);
  remoteLoader.loadWidgets().then((data) => {
    console.log("Remote widget loaded", data);
    // renderApp();
  });
});

setDMEditorConfig({
  general: {
    projectStyles: {
      default: `background: white`,
    },
    themes: [
      {
        identifier: "red",
        name: "Red",
        cssStyle: `
        --project-main-color: red;
        --project-main-bg-color: #fbadad;
    
        /*background: var(--project-main-bg-color);  */
    
        /*todo: use css variable*/
      `,
      },
      {
        identifier: "blue",
        name: "Blue",
        cssStyle: `
        --project-main-color: blue;
        --project-main-bg-color: #e0e0ff;
        /*background: var(--project-main-bg-color);  */
      `,
      },
    ],
  },
  widgets: {
    heading: { defaultStyle: { _: "big-space" } },
  },
});
