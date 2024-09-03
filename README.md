# Pointing Poker


Hello, world
Planning made easy. Clean UI, smooth UX, neat stats. 

I got tired of random popups, bugs, and non-responsiveness from old generic pointing poker apps made with PHP. So I made this pointing poker app to estimate tickets with my team and plan without annoyances. Try it today, and let me know how it worked for you!

### [Go to App](https://pointingpoker.pages.dev/)

Implemented with [React](https://react.dev/), [NES.css](https://nostalgic-css.github.io/NES.css/#),  and [Firebase Realtime Database](https://firebase.google.com/products/realtime-database). The new UI is made with Typescript, [shadcn/ui](https://ui.shadcn.com/) components, [Tailwind CSS](https://tailwindcss.com/) and [Recharts](https://recharts.org/).

## Project Setup

1. Install [Volta](https://docs.volta.sh/guide/getting-started)
2. In the repo directory run `volta setup`
3. Check if Volta is set up correctly by checking node and npm versions in a new terminal
   ```
   node -v // v18.19.0
   npm -v // 10.3.0
   ```
4. Run `npm install`
5. Install firebase-tools using volta `volta install firebase-tools@12.4.6`
6. Login into the firebase CLI with `firebase login`
7. Run `firebase init` to create a new project. Choose Auth and Realtime Database products during init.
8. Add the Firebase config of the newly created project in the `.env.local` file. Example:
   ```
   VITE_FIREBASE_CONFIG="{"apiKey":"xxx","authDomain":"xxx","databaseURL":"xxx","projectId":"xxx","storageBucket":"xxx","messagingSenderId":"xxx","appId":"xxx"}"
   ```
9. Add firebase auth URL and database URL in `.env.local`.
   ```
   VITE_FIREBASE_APP_URL="https://{auth-domain}"
   VITE_FIREBASE_DATABASE_URL="https://{database-domain}"
   ```

## Running the app on localhost

1. Run `firebase emulators:start` to emulate firebase auth and realtime db locally (Requires JDK 11 or greater installed in path)
2. Run `npm run dev` to serve site on localhost
