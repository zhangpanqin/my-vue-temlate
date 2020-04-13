## 项目命令列表

```
# 依赖安装
yarn install

# 启动开发环境（常用）,接口请求代理到后端服务
yarn serve

# 启动开发环境，接口转发到本地 mock 数据 server
yarn mock

# 查看项目打包之后依赖分布 
yarn preview

# 打包生产环境
yarn build

# 语法检测（JS 语法）
yarn lint

# 单元测试
yarn test:unit
```

## VS Code 编辑器设置

### 跨平台换行符问题

#### 报错内容：

> Expected linebreaks to be 'LF' but found 'CRLF'.eslint(linebreak-style)

#### 解决方案：

1、执行命令

```bash
git config --global core.autocrlf input
git config --global core.safecrlf true
```

2、设置 VS Code

> 首选项 -> 设置 -> 搜索 `eol` -> 改为 `\n`

注意：如果已下载的代码不生效，删除项目重新克隆代码。

## 本地接口 mock

此部分功能移植的 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

在 `mock/api` 写入你需要模拟的接口。然后在 `mock/index.js` 引入。

链接的匹配支持正则表达式。

然后 `yarn mock` 启动开发服务，接口就会请求本地的 mock 服务。

### 例子

mock/api/user.js

```js
export default [
    // hello word
    {
        url: '/hello-word/1',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    str: 44
                }
            };
        }
    },
    {
        url: '/hello-word/2',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    str: 2233
                }
            };
        }
    },
]

```

index.js

```js
import user from './api/user';

// 将接口放入到 mocks 中
const mocks = [
    ...user
];
```

src/api/user.js

```js
import request from '@/utils/request';

const user = {
    helloWord() {
        return request({
            type: 'get',
            url: '/hello-word/2',
        });
    },
};

export default user;

```

src/views/About.vue

```vue
<template>
    <div class="about">
        <h1>This is an about page</h1>
        <h2>{{msg}}</h2>
    </div>
</template>
<script>
import user from '@/api/user';

export default {
    name: 'About',
    data() {
        return {
            msg: '默认消息',
        };
    },
    async mounted() {
        await user.helloWord().then((data) => {
            this.msg = JSON.stringify(data.data);
        });
    },
};
</script>

```

