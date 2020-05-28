// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDQa8SPKBDaDQcQTky0SPH21F4AVOGiPik',
    authDomain: 'feast-782f3.firebaseapp.com',
    databaseURL: 'https://feast-782f3.firebaseio.com',
    projectId: 'feast-782f3',
    storageBucket: 'feast-782f3.appspot.com',
    messagingSenderId: '554113548886',
    appId: '1:554113548886:web:ee1b75d392ef3636d4f1f7',
    measurementId: 'G-SR7V6CNQ7Q'
  }
};

export const roles = {
  admin: 'Admin',
  standard: 'Standard'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
