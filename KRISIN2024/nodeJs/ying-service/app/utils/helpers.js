import fs from 'fs';
import path from 'path';
import os from 'os';
import { eq } from 'lodash';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '@utils/http-errors';

export function getIP() {
    let IPv4 = '127.0.0.1';
    if (os?.networkInterfaces()?.en0) {
        os.networkInterfaces().en0.forEach(en => {
            if (eq(en.family, 'IPv4')) {
                IPv4 = en.address;
            }
        });
    }
    return IPv4;
}

// 生成 Access Token 的函数
export const generateAccessToken = function (uid, scope) {
    const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
    const expiresIn = process.env.JWT_ACCESS_EXPIRED;
    const token = jwt.sign(
        {
            uid,
            scope,
        },
        secretKey,
        {
            expiresIn: expiresIn,
        },
    );
    return token;
};

// 验证 Refresh Token 的函数
export const verifyRefreshToken = function (token) {
    const secretKey = process.env.JWT_REFRESH_SECRET_KEY; // 获取 Refresh Token 的密钥
    try {
        const decoded = jwt.verify(token, secretKey); // 验证 Token
        return decoded; // 返回解码后的 Token 数据
    } catch (error) {
        // 根据错误类型抛出相应的错误信息
        if (error.name === 'TokenExpiredError') {
            throw UNAUTHORIZED('Refresh Token 已过期'); // Token 过期
        }
        throw UNAUTHORIZED('无效的 Refresh Token'); // 其他错误
    }
};

// 生成 Refresh Token 的函数
export const generateRefreshToken = function (uid, scope) {
    const secretKey = process.env.JWT_REFRESH_SECRET_KEY; // 获取 Refresh Token 的密钥
    const expiresIn = process.env.JWT_REFRESH_EXPIRED;
    const token = jwt.sign(
        {
            uid,
            scope,
        },
        secretKey,
        {
            expiresIn: expiresIn,
        },
    );
    return token;
};

export function isFileExisted(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch (error) {
        return false;
    }
}

export function mkdirPath(pathStr) {
    let projectPath = path.resolve(__dirname, '..');
    let tempDirArray = pathStr.split('\\');
    for (let i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath + '/' + tempDirArray[i];
        if (isFileExisted(projectPath)) {
            let tempstats = fs.statSync(projectPath);
            if (!tempstats.isDirectory()) {
                fs.unlinkSync(projectPath);
                fs.mkdirSync(projectPath);
            }
        } else {
            fs.mkdirSync(projectPath);
        }
    }
    return projectPath;
}
