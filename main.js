const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;

app.on('ready', function(){
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function(){
        console.log('closed');
        app.quit();
    });
});

// Open Add On Window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Task List Item'
    });
    
    addWindow.loadURL(`file://${__dirname}/addItem.html`);

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    addWindow.on('close', function(){
        addWindow = null;
    });
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
});

// Open file
function openFile(){
};


const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click(){ 
                    openFile();
                }
            }
        ]
    },{
        label: 'Edit',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },{
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },{
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click: function(){
                    app.quit();
                }
            }

        ]
    },{
        label: "Developer Tools",
        submenu: [
            {
                label: 'Toggle Developer Tools',
                click: function(item, focusedWindow){
                focusedWindow.toggleDevTools()},
                accelerator: 'Ctrl+I'
            },{
                role: 'reload'
            }
        ]
    }
]
