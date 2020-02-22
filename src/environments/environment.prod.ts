export const environment = {
  production: true,
  'clientId': 'yourClientIdHere',
  'clientSecret': 'yourAADIssuedClientSecretHere',
  'authorityHostUrl': 'https://login.windows.net',
  'tenant': 'myTenant',
  'authorityUrl': 'authorityHostUrl' + '/' + 'tenant',
  'redirectUri': 'http://localhost:3000/getAToken',
  'resource':  '00000002-0000-0000-c000-000000000000',
  'WSHOST': "ws://localhost:4000/"
};
