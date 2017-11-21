// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAY9MbxjIf0ayno8OehnyzjKndDNV0RPjY',
    authDomain: 'brew-shop.firebaseapp.com',
    databaseURL: 'https://brew-shop.firebaseio.com',
    projectId: 'brew-shop',
    storageBucket: '',
    messagingSenderId: '50151868172'
  }
};
