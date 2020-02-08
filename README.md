# electron-angular-template

Note: To see a markdown file in preview mode use the command: `CTRL + SHIFT + V`

---

## Basic Angular Development Information

This project was initially generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

- For development server run: `ng serve` and navigate to `http://localhost:4200/`.
- For code scaffolding run `ng generate component component-name` to generate a new component.
    - Note: You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- For build run `ng build` to build the project.
    - Note: The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
- For unit tests Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- For end-to-end tests run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
- For further help run `ng help` or visit [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

## Running Angular

- Angular locally run at: http://localhost:4200/
- Run angular locally (must be accessed through the browser): `npm run start`
- Run angular with electron: `npm run electron-build`
- Compile the electron app for windows: `electron-packager . --platform=win32`
- Compile the electron app for macOS: `electron-packager . --platform=darwin`

---

## Primary Project Dependencies

You must have the following installed on your machine:
- VsCode
- Nodejs

---

## Starting A New Project

- Open command prompt or a terminal.
- Install angular: `npm install -g @angular/cli`
- Start a new angular & electron project: `ng new PROJECT-NAME`
    - Note: Replace ***PROJECT-NAME*** with the name of your new angular project.
    - Note: Make sure your in the directory where you want the project folder to be created.
- Open the new project in VsCode.
- From VsCode terminal run: `npm install electron --save-dev`
- Create the new JavaScript file: `main.js`
- Insert the following code into the file: `main.js`

```
const { app, BrowserWindow } = require('electron');
let win;

function createWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });

    win.loadURL(`file://${__dirname}/dist/index.html`);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {

    if (win === null) {
        createWindow();
    }
});
```

---

- Open the file: `src > index.html`
- Find the following tag in the HTML: `html > head > base`
    - Replace the `href` attribute value `/` with `./`
- Open the file: `package.json`
- Under the `version` key add: `"main": "main.js",`
- Within the `scripts` key and under the `e2e` key add: `"electron-build": "ng build --prod && electron ."`
    - Make sure to put a comma after: `"e2e": "ng e2e",`
- Open the file: `angular.json`
- Traverse the JSON structure as follows: `projects > test > architect > build > options > outputPath`
- Replace the `outputPath` key's value `"dist/test"` with: `"dist"`
- From VsCode terminal run: `npm run electron-build`