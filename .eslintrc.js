module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    globals: {
        THING: false,
        CMAP: false,
    },
    rules: {
        // 强制 error
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/html-indent': ['error', 4],
        "no-param-reassign": "off",
        'vue/html-quotes': ['error', 'double'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-empty': ['error', { allowEmptyCatch: true }],
        // 推荐 warn
        'max-len': ['warn', { code: 200 }],
        'no-underscore-dangle': 'warn',
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
};
