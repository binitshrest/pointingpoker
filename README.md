# Pointing Poker
Pointing poker web app implemented with React 18 and firebase realtime database

https://pointingpoker.pages.dev/

## Project Setup
1. Install [Volta](https://docs.volta.sh/guide/getting-started)
2. In repo directory run `volta setup`
3. Check if volta is setup correctly by checking node and npm versions in a new terminal
    ```
    node -v // v18.19.0
    npm -v // 10.3.0
    ```
4. Run `npm install`
5. Install firebase-tools using volta `volta install firebase-tools@12.4.6`
6. Login into the firebase cli with `firebase login`
7. Run `firebase init` to create a new project. Choose auth and realtime database products during init.
8. Add firebase config of the newly created project in `.env.local` file. Example:
    ```
    VITE_FIREBASE_CONFIG="{"apiKey":"xxx","authDomain":"xxx","databaseURL":"xxx","projectId":"xxx","storageBucket":"xxx","messagingSenderId":"xxx","appId":"xxx"}"
    ```

## Running the app on localhost
1. Run `firebase emulators:start` to emulate firebase auth and realtime db locally (Requires JDK 11 or greater installed in path)
2. Run `npm run dev` to serve site on localhost
