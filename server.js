const compression = require('compression')
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8082;
app.use(cors());
app.use(compression());
app.use('/', express.static('dist/tabmagicv2'));

app.listen(port, ()=>{
	console.log('app is started and listening to the port : ', port);
})
