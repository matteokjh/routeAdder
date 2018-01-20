//路由增加后新建模板vue文件以及修改router/index.js
//var fs = require('fs');

const tpl = require('tplser')
    , path = require('path')
    , fs = require('then-fs')
    , TPL_BASE = path.join(__dirname)
    , COMPONENT_BASE = path.join('./src/components')
    , routerRender = tpl.fromFile(
        path.join(TPL_BASE, 'router.js-tpl')
)

function routeFile(name){ //生成components/*.vue文件的函数
    
    return fs.readdir(COMPONENT_BASE).then(vue_files => {
        let compo_list = vue_files.map(vue_file => {
            let { name } = path.parse(vue_file); 

            return {
                name: name, 
                path: `@/components/${name}`
            }
        }); 
        let existed = compo_list.some( e => {
            return e.name === name;
        })
       if(existed){
            console.log("1.existed!");
       }else{
            let newImport = `import ${name} from '@/components/${name}'`;
            let temple = `<!-- ${name}.vue -->
<template>
    <div class="${name}">
        <h1>Hello {{ msg }}</h1>
    </div>
</template>

<script>
export default {
    data (){
        return {
            msg: '${name}'
        }
    }
}
</script>

<style scoped>
    
</style>`;
            fs.writeFile('./src/components/'+ name + '.vue',temple)
            console.log("1.create vue file succeed!")
        }
    });
}


module.exports = routeFile