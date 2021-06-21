# Getting started

please make sure you have yarn installed globally

### `yarn install`
then
### `yarn start`

This should install all dependencies and start the app. If you have another app running on :3000 you will have to select another local server the command line should prompt you.

# About this app
## Science37 Code Challenge
This app will default to 'news' as it's initial query sent to the api.

No setup should be necessary to get the proxy working as I am using the built in backend.js helper that can be bundled in a react app for locally built running of the app. Production environments or deployed would use nginx to handle proxy.

Redux Toolkit was used for state management