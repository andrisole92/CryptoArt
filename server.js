const express = require('express');
const path = require('path');
const app = express();
const shell = require('shelljs');

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
} else {
    shell.echo('good');

}


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', function (req, res) {
    shell.echo('good');
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(9000);