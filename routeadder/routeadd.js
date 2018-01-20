// routeadd.js

let routerGenerator = require('./methods/routerGenerator.js');
let routeFile = require('./methods/routeToFile.js');

var argv;
try {   
    argv = JSON.parse(process.env.npm_config_argv).original;
}catch(ex) {
    argv = process.argv;
}
console.log('argv : '+argv[2]);
var reg = /^[0-9a-zA-Z]+$/;
argv[2] === undefined ? console.log("undefined!") : ( reg.test(argv[2]) ? routeFile(argv[2]) : console.log("illegal input!"));

routerGenerator('./src/router/index.js').then(e => {
    console.log("2.Generate route succeed!");
}, e => {
    console.log(e);
});