const app = require('./app');

// Setup Server
const port = 4444;
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});

