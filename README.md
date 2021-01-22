# Insurance Recommendation System

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

### User input persistency
#### Problems:
  - User gives us sensitive data (email, address).

#### Solutions:

- LocalStorage = easy but not good security
- SessionStorage = doesn't persist data if user closes the tab
- Cookies = secure but not good flexbiliy
- ServiceWorker = secure and flexible but complex

Conclusion: In real world example, I would go for ServiceWorker but for limited time localStorage would serve right.

#### Possible scaling thoughts
  - User/Product research would help to understand the wizard.
  -- It can be a case that there's no insurance we can provide for people older than 70 years old.
  --- Solution is we can give an error in a wizard step we ask for birthday.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
