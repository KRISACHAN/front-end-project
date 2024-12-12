/** @type {import('cz-git').UserConfig} */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', // 修复
                'docs', // 文档变更
                'style', // 代码格式
                'refactor', // 重构
                'perf', // 性能优化
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // 回退
                'build', // 打包
            ],
        ],
        'subject-case': [0],
    },
    prompt: {
        alias: { fd: 'docs: fix typos' },
        messages: {
            type: '选择你要提交的类型 :',
            scope: '选择一个提交范围 (可选):',
            customScope: '请输入自定义的提交范围 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
            breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
            footerPrefixesSelect: '选择关联issue前缀 (可选):',
            customFooterPrefix: '输入自定义issue前缀 :',
            footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
            confirmCommit: '是否提交或修改commit ?',
        },
        types: [
            { value: 'feat', name: 'feat:     新增功能' },
            { value: 'fix', name: 'fix:      修复缺陷' },
            { value: 'docs', name: 'docs:     文档变更' },
            { value: 'style', name: 'style:    代码格式' },
            { value: 'refactor', name: 'refactor: 代码重构' },
            { value: 'perf', name: 'perf:     性能优化' },
            { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
            { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
            { value: 'revert', name: 'revert:   回退代码' },
            { value: 'build', name: 'build:    打包构建' },
        ],
        useEmoji: false,
        scopes: [],
        allowCustomScopes: true,
        allowEmptyScopes: true,
        customScopesAlign: 'bottom',
        customScopesAlias: 'custom',
        emptyScopesAlias: 'empty',
        upperCaseSubject: false,
        allowBreakingChanges: ['feat', 'fix'],
        breaklineChar: '|',
        skipQuestions: ['body', 'breaking'],
        issuePrefixes: [
            { value: 'closed', name: 'closed:   ISSUES has been processed' },
        ],
        customIssuePrefixAlign: 'top',
        emptyIssuePrefixAlias: 'skip',
        customIssuePrefixAlias: 'custom',
        allowCustomIssuePrefix: true,
        allowEmptyIssuePrefix: true,
        confirmColorize: true,
        maxHeaderLength: Infinity,
        maxSubjectLength: Infinity,
        minSubjectLength: 0,
        scopeOverrides: undefined,
        defaultBody: '',
        defaultIssues: '',
        defaultScope: '',
        defaultSubject: '',
    },
};
