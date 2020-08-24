const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on("ready", () => {
  // create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  const mainMenu = Menu.buildFromTemplate(mainaMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on("addStudent", function () {
  createAddWindow();
});

function createAddWindow() {
  // create new window
  addWindow = new BrowserWindow({
    width: 500,
    height: 500,
    title: "Add new student",
  });
  // load html into window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

// getElementbyId('addstudent').
//document.getElementById("addstu").innerHTML = createAddWindow();

const mainaMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "drawin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform == "darwin") {
  mainaMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  mainaMenuTemplate.push({
    label: "developer tool",
    submenu: [
      {
        label: "Toggle Dev Tool",
        accelerator: process.platform == "drawin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
