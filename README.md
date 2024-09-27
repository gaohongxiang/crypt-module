# crypt_module

本模块通过结合1password，用于加解密文本。之所以采用1password，是因为加解密时可以用指纹操作，解锁1password，获取存储的密码，然后执行加解密操作，避免了每次手输密码的繁琐。兼顾安全和便捷。

加解密使用`crypto`库的`aes-256-gcm`算法，使用随机初始化向量，确保数据在传输或存储过程中的唯一性、保密性和完整性。此模式提供了高效的认证和加密，因此被认为是最好的加密模式之一。

> 1password中的密码切不可泄露，否则等于没加密！

### 1password

1、默认你已经熟悉使用1password密码管理器了，客户端需要勾选`设置->开发者->与1Password CLI 集成`选项。如果没有1password，可在此处了解:https://1password.com

2、创建一个密码，复制路径。此密码即`config.js`文件中的`personal_token`

### 配置文件

`config-example.js`为示例配置文件。存储你在1password中创建的密码的路径。需要在同目录下创建一个`config.js`文件，将你真实的`personal_token`路径放进去

示例

```
// personal_token存储在1password的blockchain保险库中，根据自己的情况修改，op://不要动
export const personal_token = 'op://blockchain/personal_token'
```

### 使用

第一次使用需要先安装依赖
```
npm install
```

加解密文本

```
const text = 'hello web3';
// 加密(相同文本每次加密结果也不同)
const enText = await enCryptText(text);
console.log(enText)
//解密
const text = await deCryptText(enText);
console.log(text)
```

加密某列文本

假设有一个`wallet.csv`文件，存放地址、私钥等信息，很显然，私钥不能明文存储。这个时候就需要给私钥这一列数据加密
```
id,address,enPrivateKey
1,bc1p0xlw9r7f63m5k4q8z8v49q35t9q0,L1k3wqhiuguv1Ki3pLnuiybr0vm
2,bc1p34x5y9x9q6u9w57h8j9z53l8z7xg,Pkmnuhfh7hbidcuin8877g2b1ns
3,bc1p34x5y9x9q6u9w57h8j9z53l8z7xg,Pkmnuhfh7hbidcuin8877g2b1ns
...
```

执行加密操作
```
await enCryptColumn('./crypt_module/wallet.csv', 'enPrivateKey');
```

加密过后，`wallet.csv`文件内容如下。
```
id,address,enPrivateKey
1,bc1p0xlw9r7f63m5k4q8z8v49q35t9q0,d825f5cba11602c68155999bdbbc7bb60e7bf118c52e8b30674c1f337a179715e897c5673761b78ba7e217b7b39725be2b2b0e878933ac
2,bc1p34x5y9x9q6u9w57h8j9z53l8z7xg,d63b0bea4c42bd610a895ff209d7405d71a9cd623dacccdf61a4cf19c2494305f6858216272841c60d149923309d68486e9d10abe96016
3,bc1p34x5y9x9q6u9w57h8j9z53l8z7xg,3fa81aae6b08911dc05b3d7e4cf7dfc12656ae8a800781274085a3976831b3a95db93740f05e4118f6b58dad09b818f8b91ebb1370f33c
...
```

>tips：通过第2、3条enPrivateKey数据可知，就算相同的数据加密出来也是不一样的，提高安全性。

目前大的应用场景就是使用`enCryptColumn`批量加密钱包文件的私钥、助记词等字段，安全存储。使用的时候用到哪个就用`deCryptText`解密。