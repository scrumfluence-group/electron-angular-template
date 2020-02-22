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

- Angular locally runs at: http://localhost:4200/
- Run angular locally (must be accessed through the browser): `npm run start`
- Run angular with electron: `npm run electron-build`
- Compile the electron app for windows: `electron-packager . --platform=win32`
- Compile the electron app for macOS: `electron-packager . --platform=darwin`

---

## Quick Commands

- Create a new component: `ng g c {NAME}`
- Create a new service: `ng g s {NAME}`
    - Note: Replace `{NAME}` with the name of the new component or service (lowercase).
    - `g` is short for `generate`
    - `c` is short for `component`
    - `s` is short for `service`

---

## Primary Project Dependencies

You must have the following installed on your machine:
- VsCode
- Nodejs

---

## Starting A New Project

- Open command prompt or a terminal.
- Install angular: `npm install -g @angular/cli`
- Start a new angular project: `ng new {PROJECT-NAME}`
    - Note: Replace ***{PROJECT-NAME}*** with the name of your new angular project.
    - Note: Make sure your in the directory where you want the project folder to be created.
- Open the new project in VsCode.
- From VsCode terminal run: `npm install electron --save-dev`
- From VsCode terminal run: `npm install electron-reload --save-dev`
- From VsCode terminal run: `npm install electron-packager --save-dev`
- Create the new JavaScript file: `main.js`
- Insert the code (from `Code` section at the bottom of this file) into the file: `main.js`
- Open the file: `src > index.html`
- Find the following tag in the HTML: `html > head > base`
    - Replace the `href` attribute value `/` with `./`
- Open the file: `package.json`
- Under the `version` key add: `"main": "main.js",`
- Within the `scripts` key and under the `e2e` key add the following keys: 
    ```
    "electron": "ng build --prod && electron .",
    "electron-dev": "electron . mode=develop"
    ```
    - Make sure to put a comma after: `"e2e": "ng e2e",`
- Open the file: `angular.json`
- Traverse the JSON structure as follows: `projects > {PROJECT-NAME} > architect > build > options > outputPath`
- Replace the `outputPath` key's value `"dist/{PROJECT-NAME}"` with: `"dist"`
- From VsCode terminal run: `npm run electron`
- To run electron in develop mode with hot loading run the following commands in 2 separate terminals:
    - In the 1st terminal run: `ng serve`
    - Wait until you see the ***Compiled successfully.*** message.
    - In the 2nd terminal run: `npm run electron-dev`
    
---

## Code

```javascript
const { app, BrowserWindow } = require('electron');
let win;
let settings = {
    mode: 'production'
};

process.argv.forEach(argument => {

    if (!argument.includes('=')) { return; }
    let values = argument.split('=');
    settings[values[0]] = values[1];
});

function createWindow() {

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });

    if (settings.mode === 'production') {
        win.loadURL(`file://${__dirname}/dist/index.html`);
    } else {
        win.loadURL(`http://localhost:4200/index.html`);
    }

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

if (settings.mode !== 'production') {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}
```