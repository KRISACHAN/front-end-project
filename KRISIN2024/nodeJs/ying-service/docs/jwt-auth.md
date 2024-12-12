# JWT 鉴权、Access Token 和 Refresh Token 详解

## 1. 什么是 JWT 鉴权？

JWT（JSON Web Token）是一种用于在网络中安全传递信息的开放标准。它通过将用户的身份信息和其他元数据编码为一个字符串，允许服务器验证用户的身份并授权访问受保护的资源。JWT 鉴权的主要优点是无状态性，服务器不需要存储会话信息。

### JWT 的结构

JWT 通常由三部分组成：

- **Header（头部）**: 指定令牌的类型（JWT）和所使用的签名算法（如 HMAC SHA256）。
- **Payload（有效载荷）**: 包含用户信息和其他声明（如过期时间）。
- **Signature（签名）**: 用于验证消息的完整性和身份。

## 2. Access Token（访问令牌）

Access Token 是一种短期有效的令牌，用于授权用户访问受保护的资源。它通常在用户登录后生成，并在一定时间后过期。

### Access Token 示例代码

```javascript
const jwt = require('jsonwebtoken');

// 生成 Access Token 的函数
function generateAccessToken(user) {
    // 生成 Access Token，有效期为 15 分钟
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// 使用示例
const user = { id: 1, email: 'user@example.com' };
const accessToken = generateAccessToken(user);
console.log(accessToken); // 输出生成的 Access Token
```

### 关键流程

1. 用户登录后，服务器验证用户身份。
2. 生成 Access Token，并将其返回给客户端。
3. 客户端在后续请求中携带 Access Token。

## 3. Refresh Token（刷新令牌）

Refresh Token 是一种长期有效的令牌，用于在 Access Token 过期后获取新的 Access Token。Refresh Token 通常存储在数据库中，并且需要更高的安全性。

### Refresh Token 示例代码

```javascript
// 生成 Refresh Token 的函数
function generateRefreshToken(user) {
    // 生成 Refresh Token，有效期为 30 天
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

// 使用示例
const refreshToken = generateRefreshToken(user);
console.log(refreshToken); // 输出生成的 Refresh Token
```

### 关键流程

1. 当 Access Token 过期时，客户端使用 Refresh Token 请求新的 Access Token。
2. 服务器验证 Refresh Token 的有效性。
3. 如果有效，生成新的 Access Token 并返回给客户端。

## 4. Access Token 和 Refresh Token 的协作

在实际应用中，Access Token 和 Refresh Token 通常协同工作，以提供无缝的用户体验和安全性。以下是它们之间的协作流程：

1. 用户登录后，服务器生成并返回 Access Token 和 Refresh Token。
2. 客户端使用 Access Token 访问受保护的资源。
3. 当 Access Token 过期时，客户端使用 Refresh Token 请求新的 Access Token。
4. 服务器验证 Refresh Token，如果有效，则生成新的 Access Token 并返回。

### 代码示例：使用 Koa.js 实现 JWT 鉴权

```javascript
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// 中间件：验证 Access Token
async function verifyToken(ctx, next) {
    const token = ctx.headers['authorization']?.split(' ')[1]; // 从请求头获取 Token
    if (!token) {
        ctx.status = 401; // 未授权
        ctx.body = { message: 'Token not found' };
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // 验证 Token
        ctx.user = decoded; // 将用户信息存储在上下文中
        await next(); // 继续处理请求
    } catch (err) {
        ctx.status = 403; // 禁止访问
        ctx.body = { message: 'Invalid Token' };
    }
}

// 登录接口
router.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body; // 获取用户输入
    // 这里省略用户验证逻辑
    const user = { id: 1, email }; // 假设用户验证通过
    const accessToken = generateAccessToken(user); // 生成 Access Token
    const refreshToken = generateRefreshToken(user); // 生成 Refresh Token
    ctx.body = { accessToken, refreshToken }; // 返回 Token
});

// 受保护的资源接口
router.get('/protected', verifyToken, async (ctx) => {
    ctx.body = { message: 'This is a protected resource', user: ctx.user }; // 返回受保护的资源
});

// 刷新 Access Token 接口
router.post('/refresh-token', async (ctx) => {
    const { refreshToken } = ctx.request.body; // 获取 Refresh Token
    if (!refreshToken) {
        ctx.status = 401; // 未授权
        ctx.body = { message: 'Refresh Token not found' };
        return;
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // 验证 Refresh Token
        const user = { id: decoded.id }; // 获取用户信息
        const newAccessToken = generateAccessToken(user); // 生成新的 Access Token
        ctx.body = { accessToken: newAccessToken }; // 返回新的 Access Token
    } catch (err) {
        ctx.status = 403; // 禁止访问
        ctx.body = { message: 'Invalid Refresh Token' };
    }
});

// 启动 Koa 服务器
app.use(bodyParser());
app.use(router.routes());
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

## 5. 前端如何更新 Access Token

前端在 Access Token 过期后，需要主动调用 `POST /refresh-token` 接口来获取新的 Access Token。以下是具体的流程：

### 1. Access Token 过期

- 当用户使用 Access Token 访问受保护的资源时，如果 Access Token 已过期，服务器会返回一个 401 Unauthorized 或 403 Forbidden 的响应。

### 2. 调用 Refresh Token 接口

- 前端捕获到 Access Token 过期的错误后，应该从存储中获取 Refresh Token，并调用 `POST /refresh-token` 接口，发送 Refresh Token 以请求新的 Access Token。

### 3. 服务器验证 Refresh Token

- 服务器接收到 Refresh Token 后，会验证其有效性。如果有效，服务器将生成新的 Access Token 并返回给前端。

### 4. 更新 Access Token

- 前端接收到新的 Access Token 后，应该将其存储（例如在 localStorage 或 sessionStorage 中），并在后续请求中使用新的 Access Token。

### 示例代码

以下是前端调用 Refresh Token 接口的示例代码：

```javascript
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // 从存储中获取 Refresh Token
    if (!refreshToken) {
        console.error('No refresh token found');
        return;
    }

    try {
        const response = await fetch('/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }), // 发送 Refresh Token
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken); // 更新 Access Token
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}
```

## 6. 总结

JWT 鉴权通过 Access Token 和 Refresh Token 的协作，实现了安全、无状态的用户身份验证。Access Token 用于短期授权，而 Refresh Token 则用于获取新的 Access Token，从而提升用户体验。通过 Koa.js 的示例代码，我们可以看到如何实现这一过程，确保用户在访问受保护资源时的安全性和便利性。
