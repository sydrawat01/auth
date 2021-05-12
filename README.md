# Auth with Firebase

Basic auth with [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth).

Using [Redux Toolkit](https://redux-toolkit.js.org/) for global state management.

## `.env` file

React apps initialized using `create-react-app` have `.dotenv` pacgkage built in, and need to have the `REACT_APP` prefix to the environment variables. More about these [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).

To access these .env variables, use `process.env.<variable_name>`.

Here's an example of what the `.env` file looks like:

```js
REACT_APP_API_KEY = "YOUR_API_KEY"

REACT_APP_SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_API_KEY}'
REACT_APP_SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_API_KEY}'
REACT_APP_CHANGE_PWD = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=${REACT_APP_API_KEY}'
```

## TODO

- [x] Use the `Modal` to display error messages.
- [x] [Fix Memory Leak Bug](https://github.com/sydrawat/auth/issues/1).
- [ ] Add auto logout based on the expiration time [`expiresIn` property from the response payload].
