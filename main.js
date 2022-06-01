const electron = require('electron');
const url = require('url');
const path = require('path');

process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu} =  electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Creating a new Window
    mainWindow = new BrowserWindow({});

    //loading html file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainwindow.html'),
        protocol:'file:',
        slashes: true
    }));     

    //Build Menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // inserting Menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create Add Window
function NotePadWindow(){
    
    var child = require('child_process').execFile;
    var executablePath = "notepad.exe";

    child(executablePath, function(err, data){
        if(err){
            console.error(err);
            return;
        }
        console.log(data.toString());
    });     
}

function PaintWindow(){
    var child = require('child_process').execFile;
    var executablePath = "mspaint.exe";

    child(executablePath, function(err, data){
        if(err){
            console.error(err);
            return;
        }
        console.log(data.toString());
    });     
}

function SnipWindow(){
    var child = require('child_process').execFile;
    var executablePath = "SnippingTool.exe";
    
    child(executablePath, function(err, data){
        if(err){
            console.error(err);
            return;
        }
        console.log(data.toString());
    });     
}
// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
          {
            label:'NotePad',
            click() {
                accelerator: process.platform == 'darwin' ? 'Commmad+N':
                'Ctrl+N',
                NotePadWindow();
            }
          },
          {
            label:'Paint',
            click() {
                accelerator: process.platform == 'darwin' ? 'Commmad+Alt+P':
                'Ctrl+Alt+P',
                PaintWindow();
            }
          },
          {
            label: 'Snipping Tool',
            click() {
                accelerator: process.platform == 'darwin' ? 'Commmad+Alt+S':
                'Ctrl+ALt+S',
                SnipWindow();
            }
          },
          {
            label: 'Close',
            accelerator: process.platform == 'darwin' ? 'Commmad+Q':
            'Ctrl+Q',
            click(){
                app.quit();
            }
           }
        ]   
    }
];

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu:[
            {
                label: "Toggle DevTools",
                accelerator: process.platform == 'darwin' ? 'Command+I':
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
            }
        ]
    });
}
