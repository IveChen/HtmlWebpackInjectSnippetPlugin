### 安装使用
```shell
    npm install HtmlWebpackInjectSnippetPlugin --save-dev
```

```
let HtmlWebpackInjectSnippetPlugin = require('html-webpack-inject-snippet-plugin')

...

{
    plugins:[
        new HtmlWebpackInjectSnippetPlugin({
            snippets:[
                { 
                    //required 要匹配的标签名
                    tag:tagName, 
                    //optional, true for openTag or false for closeTag.
                    //default openTag
                    isOpenTag:true, 
                    //optional, true for all and false for the first match
                    //default: just first tag
                    global: false, 
                    /**
                    * matchTagContent and snippet
                    * action = 'append'   matchTagContent + snippet
                    * action = 'prepend'  snippent + matchTagContent
                    * default ''
                    * if action not set,
                    * when isOpenTag is true, default value is 'append'
                    * when isOpenTag is false, default Value is 'prepend'
                    **/
                    action:'', //optional. 
                    snippet:'',//required the inject snippet code
                },
                //*for example
                // source code '<head>test</head>
                
                //result: <head>headInjecttest</head>
                {
                    tag:'head',
                    snippet:'headInject'
                },
                
                //result: <head>testheadInject</head>
                {
                    tag:'head',
                    isOpenTag:false
                    snippet:'headInject
                },
                //result:headInject<head>test</test>
                {   
                    tag:'head',
                    snippet:'headInject',
                    action:'prepend'
                }，
                //result:<head>test</test>headInject
                {
                    tag:'head',
                    isOpenTag:false
                    snippet:'headInject',
                    action:'append'
                }
            ]    
        })
    ]
}
```