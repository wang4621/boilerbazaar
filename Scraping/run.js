const path = require('path');

// cd into script to install python dependencies
process.chdir(path.join(__dirname, 'script'))
console.log("Start downloading dependencies")

console.log("Check if python is installed")
// Check if python is installed
try {
    require('child_process').execSync('python --version')
} catch (e) {
    console.log("Python is not installed")
    process.exit(1)
}
console.log("Check if pip is installed")
// Check if pip is installed
try {
    require('child_process').execSync('pip --version')
} catch (e) {
    console.error("Pip is not installed")
    process.exit(1)
}

require('child_process').execSync('pip install requests bs4')
console.log("Finish downloading dependencies")
// Cd into src and run "node server.js" and print the result
console.log("Start running server")
process.chdir(path.join(__dirname, 'src'))
require('child_process').execSync('node server.js', { stdio: 'inherit' })