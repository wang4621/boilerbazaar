const path = require('path');

// cd into script to install python dependencies
process.chdir(path.join(__dirname, 'script'))

// Check if python is installed
try {
    require('child_process').execSync('python --version')
} catch (e) {
    console.log("Python is not installed")
    process.exit(1)
}
// Check if pip is installed
try {
    require('child_process').execSync('pip --version')
} catch (e) {
    console.error("Pip is not installed")
    process.exit(1)
}

require('child_process').execSync('pip install requests bs4')

// Cd into src and run "node server.js" and print the result
process.chdir(path.join(__dirname, 'src'))
require('child_process').execSync('node server.js', { stdio: 'inherit' })