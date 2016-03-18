#  项目指南

##  工程目录说明
    css
    html
    img
    js

##  架构
1.	director.js 路由
2.	require.js	 模块载入框架(text、domready、css)
3.	underscore.js js工具库
4.	jquery2.2.js
5.	hammer.js 提供tap事件

##  思路
1.	启动程序
2.	监听路由
3.	路由变化，映射到对应的处理逻辑，加载对应的模块
4.	模块加载完成，修改dom
5.	页面跳转时，移除上一个模块，加载下一个模块，回到3

##  步骤
1.  index.htm
    requirejs引入main.js
2.  main.js配置requirejs的依赖，并启动webapp
3.  require.js配置路由
4.  各个模块

##  安装

1.  修改main.js中的window.basePath，改为当前项目地址
2.	如果用chrome打开，需要设置chrome支持ajax跨域请求数据
3.	链接地址比如列表链接：当前项目地址#list
