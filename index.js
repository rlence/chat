const express = require('express');
const app = express();

//settings

app.set('port', process.env.PORT || 3000);


// start the server
app.listen(app.get('port'), ()=>{
       console.log('server on port', app.get('port'));
});