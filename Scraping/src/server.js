// Create a server running on port 8080

// Path: src\server.js
const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0]
    if (url === '/ebay') {
        // Get url parameters
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const isbn = urlParams.get('isbn')
        // Get result by calling script
        const path = "../script/ebay.py"
        const result = require('child_process').execSync(`python ${path} ${isbn}`).toString()
        // Send result 200 OK and CORS headers
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        res.end(result)
    } else if (url === "/google") {
        // Get url parameters
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const isbn = urlParams.get('isbn')
        // Get result by calling script
        const path = "../script/googlePlay.py"
        const result = require('child_process').execSync(`python ${path} ${isbn}`).toString()
        // Send result
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        res.end(result)
    } else {
        // Send 404 and CORS headers
        res.writeHead(404, {
            'Access-Control-Allow-Origin': '*'
        });
        res.end('404 Not Found');
    }
})

// Allow cors to be * for now
server.listen(8080, () => {
    console.log('Server running on port 8080');
});