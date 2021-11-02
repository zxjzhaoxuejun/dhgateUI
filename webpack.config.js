const glob=require('glob')
const {VueLoaderPlugin}=require('vue-loader')
const path=require('path')
const list={}

// {
//     card:'./components/lib/card/index.js',
//     demo:'./components/lib/demo/index.js'
// }

async function makeList(dirPath,list){
    const files=glob.sync(`${dirPath}/**/index.js`)
    console.log('files:',files)
    for(let file of files){
        const component=file.split(/[/.]/)[2]
        console.log('component:',component)
        list[component]=`./${file}`
    }
    console.log('list:',list)
}
makeList('components/lib',list)
module.exports={
    mode:'development',
    entry:list,
    output:{
        filename:'[name].umd.js',
        path:path.resolve(__dirname,'dist'),
        globalObject: 'this',
        libraryExport: 'default', // 对外暴露default属性，就可以直接调用default里的属性
        library:'mui',// 指定的就是你使用require时的模块名
        libraryTarget:'umd',//libraryTarget会生成不同umd的代码，可以只是commonjs标准，也可以是amd标准
        umdNamedDefine:true//会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    {
                        loader:'vue-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}