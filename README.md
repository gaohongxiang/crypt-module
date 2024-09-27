# crypt_module

本模块通过结合1password，用于加解密文本。运行程序需要指纹解锁1password，获取存储的密码，然后执行加解密操作。

### 1password

1、默认你已经熟悉使用1password密码管理器了，客户端需要勾选`设置->开发者->与1Password CLI 集成`选项。如果没有1password，可在此处了解:https://1password.com

2、创建一个密码，复制路径。此密码即`config.js`文件中的`personal_token`

### 配置文件

`config-example.js`为示例配置文件。存储你在1password中创建的密码的路径。需要在同目录下创建一个`config.js`文件，将你真实的`personal_token`路径放进去

### 使用

第一次使用需要先安装依赖
```
npm install
```

加解密文本

```
const text = 'hello web3';
// 加密(相同文本每次加密结果也不同)
const enText = await encryptText(text);
console.log(enText)
//解密
const text = await decryptText(enText);
console.log(text)
```