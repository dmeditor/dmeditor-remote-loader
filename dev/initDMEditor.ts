import {
  initLanguage,
  registerDefaultWidgets,
  setDMEditorConfig,
} from "dmeditor";
import { RemoteLoaderPlugin } from "../src";

initLanguage("nor-NO");
registerDefaultWidgets();

//load remote widget asynchronically
const remoteLoader = new RemoteLoaderPlugin({
  loadBaseUrl: "http://dmeditor-repo.dev.digimaker.no",
  repoUrl: "http://dmeditor-repo.dev.digimaker.no/repo.json",
});
remoteLoader.init().then(() => {
  remoteLoader.loadWidgets();
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
