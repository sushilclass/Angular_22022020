// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//let CLIENTID = process.env.CLIENTID || "yourClientIdHere";
export const environment = {
  production: false, 
  clientId: "yourclientidhere",
  clientSecret: 'yourAADIssuedClientSecretHere',
  authorityHostUrl: 'https://login.windows.net',
  tenant: 'myTenant',
  authorityUrl: 'authorityHostUrl' + '/' + 'tenant',
  redirectUri: 'http://localhost:3000/getAToken',
  resource:  '00000002-0000-0000-c000-000000000000',
  WSHOST: "ws://localhost:4000/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
