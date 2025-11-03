# dmeditor-remote-loader

DMEditor remote widget loader, used for loading remote widgets & Widget-store

Example of using it:

```ts
//load remote widget asynchronically
const remoteLoader = new RemoteLoaderPlugin(dmeditor, {
  loadBaseUrl: "http://dmeditor-repo.dev.digimaker.no",
  repoUrl: "http://dmeditor-repo.dev.digimaker.no/repo.json",
});
remoteLoader.init().then(() => {
  remoteLoader.loadWidgets();
});
```
