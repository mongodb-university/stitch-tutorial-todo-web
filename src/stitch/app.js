import { Stitch } from "mongodb-stitch-browser-sdk";

// TODO: Add your Stitch app's App ID
const APP_ID = "<YOUR APP ID>";

// TODO: Initialize the app client
const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

export { app };
