const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');

document.getElementById('saveBtn').addEventListener('click', saveFile);

function saveFile(){
    dialog.showSaveDialog((filename)=>{
        if (filename === undefined){
            alert("You didn't enter in a file name!");
            return;
        };

        

        var listItems = document.getElementById('list').getElementsByTagName('li'),
        
            myArray = map(listItems, getText);
        
        function map(arrayLike, fn) {
            var ret = [], i = -1, len = arrayLike.length;
            while (++i < len) ret[i] = fn(arrayLike[i]);
            return ret;
        }
        
        function getText(node) {
            if (node.nodeType === 3) return node.data;
            var txt = '';
            if (node = node.firstChild) do {
                txt += getText(node);
            } while (node = node.nextSibling);
            console.log(txt);
            return txt;
        }

        console.log(myArray);
        const content = myArray;



        fs.writeFile(filename, content, (err)=>{
            if (err) console.log(err);
            alert("The file has been saved successfully!");
        }); 
    });
};