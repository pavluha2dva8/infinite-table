module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'react-app',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: [
        "import"
    ],
    rules: {
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'react/prop-types': 0,
        'linebreak-style': 0,
        'no-useless-escape': 0,
        'no-console': 'warn',
        'jsx-a11y/no-autofocus': [ 2, {
            'ignoreNonDOM': true
        }],
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        // 'i18next/no-literal-string': [
        //   'warn',
        //   {
        //     'markupOnly': true,
        //     'onlyAttribute': ['placeholder'],
        //     'ignoreComponent': [
        //       'Icon',
        //       'InfoOutlined'
        //     ],
        //   }
        // ],
        "react/jsx-no-target-blank": ['error', {
            "allowReferrer": true,
        }],
        indent: ['error', 2, { SwitchCase: 1 }],
        semi: ['error', 'never'],
        'import/order': [
            "error",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: "~/**",
                        group: "internal",
                        position: "after"
                    },
                    {
                        pattern: "./*.scss",
                        group: "sibling",
                        position: "after"
                    }
                ],
                pathGroupsExcludedImportTypes: [
                    'react',
                ],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true
                },
                'newlines-between': 'always',
            }
        ],
    }
}
