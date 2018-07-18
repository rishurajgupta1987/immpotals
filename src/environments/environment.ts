// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyACumuVSR2RlY3uvbLh2rCAs9ecB_VwtGk",
    authDomain: "cim-angular.firebaseapp.com",
    databaseURL: "https://cim-angular.firebaseio.com",
    projectId: "cim-angular",
    storageBucket: "cim-angular.appspot.com",
    messagingSenderId: "368894646465"
  }
};