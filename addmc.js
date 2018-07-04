#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var fs = require("fs");

function readJSON(p){
    var contents = fs.readFileSync(p);
    return JSON.parse(contents);
}
if (argv._.length>0) { 
    for(var j = 0; j < argv._.length; j++){
        var jsonContent = readJSON(argv._[j]);
        var c = jsonContent.features.length;   
        
        for (var i = 0; i < c; i++) {
            var item = jsonContent.features[i];//https://github.com/developmentseed/unique/issues/12#issuecomment-382442848
            //console.log(item.properties.date);
            if(item.properties.landcover==='water'){
                item.properties.MC_ID=1;
            }
            if(item.properties.landcover==='earth'){
                item.properties.MC_ID=2;
            }
            if(item.properties.landcover==='forestland'){
                if(item.properties.type==='dense'){
                    item.properties.MC_ID=4;
                }
                if(item.properties.type==='moderate'){
                    item.properties.MC_ID=5;
                }
                if(item.properties.type==='sparse'){
                    item.properties.MC_ID=6;
                }
            }
            if(item.properties.landcover==='grassland'){
                if(item.properties.type==='partial'){
                    item.properties.MC_ID=8;
                }
                if(item.properties.type==='open'){
                    item.properties.MC_ID=9;
                }
            }
            if(item.properties.landcover==='cropland'){
                item.properties.MC_ID=10;
            }
            if(item.properties.landcover==='wetland'){
                item.properties.MC_ID=11;
            }
            if(item.properties.landcover==='built'){
                item.properties.MC_ID=12;
            }
            
        }
        fs.writeFileSync('f_'+argv._[j], JSON.stringify(jsonContent));
        console.log('\x1b[32m%s\x1b[0m', argv._[j]+' Complete!'); 
    }
}else{
    console.log('\x1b[36m%s\x1b[0m', 'Without parameters Usually :'); 
    console.log('\x1b[33m%s\x1b[0m', 'node convert.js input.geojson');
}