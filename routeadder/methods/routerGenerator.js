// routerGenerator.js
const tpl = require('tplser')
    , path = require('path')
    , fs = require('then-fs')
    , TPL_BASE = path.join(__dirname)
    , COMPONENT_BASE = path.join('./src/components')
    , routerRender = tpl.fromFile(
        path.join(TPL_BASE, 'router.js-tpl')
    )

/**
 * @description 读取 component 目录下的Vue文件并生成路由文件 最后写入到 target 里
 * @param {String} target 
 */
function routerGenerator(target){
    return fs.readdir(COMPONENT_BASE).then(vue_files => {
        let compo_list = vue_files.map(vue_file => {
            let { name } = path.parse(vue_file); 

            return {
                name: name, 
                path: `@/components/${name}`
            }
        }); 
        console.log(compo_list);
        let routerFileStr = routerRender({
            compo_list: compo_list,
            pathProcess: e => {
                let temp = e.toLowerCase(); 
                return temp === 'index' ? '' : temp; 
            },
            shouldAddDot: (list, now_idx) => (
                now_idx === list.length - 1 ? '' : ','
            )
        });

        return fs.writeFile(
            target, routerFileStr
        ); 
        
    });
}

module.exports = routerGenerator; 
