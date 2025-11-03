export * from "./config";
export * from "./loader";

import {
  init,
  loadRemote,
  registerRemotes,
} from "@module-federation/enhanced/runtime";
import React from "react";
import ReactDOM from "react-dom";

interface Repository {
  url: string;
  name: string; //eg: '@no/company_name'
}

/**
 * 
  {
    "name": "remote2",
    "version": "1.0.0",
    "description": "",
    "exposeName": "main",
    "entry": "remoteEntry.js",
    "widgets": [
      {
        "id": "sample-widget",
        "name": "SampleWidget",
        "version": "1.0.0",
        "previewImage": "http://localhost:3002",
        "description": ""
      }
    ],
    "dependencies": {},
    "engines": {
      "dmeditor": "1.0.0"
    }
  }
 */
interface RepositoryPackage {
  name: string;
  version: string;
  description?: string;
  exposeName?: string;
  entry?: string;
  widgets: Array<{
    id: string;
    name: string;
    version: string;
    previewImage: string;
    description: string;
  }>;
  dependencies: Record<string, string>;
  engines: Record<string, string>;
}

interface RepositoryConfig {
  loadBaseUrl: string;
  repoUrl: string;
  mode?: "dev" | "prod";
}

export class RemoteLoaderPlugin {
  _dmeditor: any;

  config: RepositoryConfig;

  repositories: Array<Repository>;
  repositoriesPackage: Array<RepositoryPackage> = [];

  constructor(
    dmeditor: any,
    config: RepositoryConfig
    // repositories: Array<Repository>
  ) {
    this._dmeditor = dmeditor;
    this.config = config;
    // this.repositories = repositories;
  }

  initShared() {
    const remotes = this.repositoriesPackage.map((item: RepositoryPackage) => ({
      name: item.name,
      entry: this._joinPath(
        this.config.loadBaseUrl,
        `${item.name}/remoteEntry.js`
      ),
    }));

    init({
      name: "app",
      remotes,
      shared: {
        react: {
          version: "18.2.0",
          scope: "default",
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
        },
        "react-dom": {
          version: "18.2.0",
          scope: "default",
          lib: () => ReactDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: "^18.2.0",
          },
        },
        dmeditor: {
          version: "0.2.3",
          scope: "default",
          lib: () => this._dmeditor,
          shareConfig: {
            singleton: true,
            requiredVersion: "^0.2.3",
          },
        },
      },
    });
  }

  async init() {
    const data = await fetch(this.config.repoUrl).then((response) =>
      response.json()
    );

    this.repositoriesPackage = data;
    this.initShared();
  }

  //invoke init before this method
  async loadWidgets() {
    const results = [];
    for (const item of this.repositoriesPackage) {
      console.log("Loading widget", item.name);
      const main: any = await loadRemote(`${item.name}/main`);
      main.default();
      results.push(main);
    }
    return results;
  }

  _joinPath(url: string, path: string) {
    if (url[url.length - 1] === "/") {
      url = url.slice(0, -1);
    }
    if (path[0] !== "/") {
      path = "/" + path;
    }
    return url + path;
  }
}
