/* eslint-disable max-lines */
/* eslint-env node */
"use strict";

// eslint-version: 6.01

module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
    },

    overrides: [
        {
            files: "**/*.js",
            parserOptions: {
                sourceType: "script",
            },
        },
    ],

    plugins: [
        "import",
        "@typescript-eslint",
    ],

    env: {
        es6: true,
    },

    rules: {
        // Error detection
        "for-direction": "error",
        "getter-return": "error",
        "no-constant-condition": [
            "error",
            { checkLoops: false },
        ],
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-func-assign": "error",
        "no-invalid-regexp": [
            "error",
            { allowConstructorFlags: ["s"] },
        ],
        "no-irregular-whitespace": "error",
        "no-obj-calls": "error",
        "no-prototype-builtins": "error",
        "no-regex-spaces": "error",
        "no-template-curly-in-string": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "accessor-pairs": "error",
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "consistent-return": "error",
        "no-compare-neg-zero": "error",
        eqeqeq: [
            "error",
            "always",
            { null: "ignore" },
        ],
        "no-implied-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-labels": "error",
        "no-extra-label": "error",
        "no-global-assign": "error",
        "no-lone-blocks": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-redeclare": "error",
        "no-return-assign": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": [
            "error",
            { allowTaggedTemplates: true },
        ],
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-useless-catch": "error",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        radix: "error",
        strict: [
            "error",
            "global",
        ],
        "no-delete-var": "error",
        "no-shadow-restricted-names": "error",
        "no-undef": "error",
        "no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
            },
        ],
        "no-use-before-define": [
            "error",
            { classes: false, functions: false },
        ],
        "no-new-require": "error",
        "no-path-concat": "error",
        "unicode-bom": [
            "error",
            "never",
        ],
        "no-fallthrough": "error",
        "dot-notation": "error",
        "no-alert": "error",
        "no-async-promise-executor": "error",
        "no-misleading-character-class": "error",
        "require-atomic-updates": "error",
        "default-case": "error",
        "prefer-named-capture-group": "error",
        "require-unicode-regexp": "error",
        "no-buffer-constructor": "error",

        // ---- Style rules ----
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-extra-parens": [
            "error",
            "all",
            { nestedBinaryExpressions: false },
        ],
        "no-extra-semi": "error",
        "dot-location": [
            "error",
            "property",
        ],
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-implicit-globals": "error",
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-proto": "error",
        "no-void": "error",
        "no-label-var": "error",
        "array-bracket-spacing": "error",
        "brace-style": [
            "error",
            "1tbs",
            { allowSingleLine: true },
        ],
        camelcase: [
            "error",
            { properties: "never" },
        ],
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "always-multiline",
            },
        ],
        "comma-spacing": [
            "error",
            { before: false, after: true },
        ],
        "comma-style": "error",
        "computed-property-spacing": "error",
        "eol-last": "error",
        "func-call-spacing": "error",
        "function-paren-newline": [
            "error",
            "consistent",
        ],
        indent: [
            "error",
            4,
            { ignoredNodes: ["ConditionalExpression"] },
        ],
        "key-spacing": [
            "error",
            { beforeColon: false, afterColon: true },
        ],
        "keyword-spacing": "error",
        "lines-around-comment": [
            "error",
            {
                allowBlockStart: true,
                allowArrayStart: true,
                allowObjectStart: true,
                // TODO: Check others
            },
        ],
        "max-len": [
            "error",
            120,
            {
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreComments: true,
            },
        ],
        "max-statements-per-line": "error",
        "new-cap": [
            "error",
            { properties: false },
        ],
        "new-parens": "error",
        "newline-per-chained-call": [
            "error",
            { ignoreChainWithDepth: 3 },
        ],
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-lonely-if": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-assign": "error",
        "no-new-object": "error",
        "no-tabs": "error",
        "no-trailing-spaces": "error",
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": [
            "error",
            "beside",
        ],
        "object-curly-newline": [
            "error",
            { consistent: true },
        ],
        "object-curly-spacing": [
            "error",
            "always",
        ],
        "one-var": [
            "error",
            { initialized: "never" },
        ],
        "operator-assignment": "error",
        "padded-blocks": [
            "error",
            "never",
        ],
        "quote-props": [
            "error",
            "as-needed",
        ],
        semi: [
            "error",
            "always",
        ],
        "semi-spacing": "error",
        "semi-style": "error",
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "space-unary-ops": [
            "error",
            { nonwords: false, words: true },
        ],
        "switch-colon-spacing": "error",
        "template-tag-spacing": [
            "error",
            "never",
        ],
        "arrow-parens": [
            "error",
            "always",
        ],
        "arrow-spacing": [
            "error",
            { before: true, after: true },
        ],
        "constructor-super": "error",
        "generator-star-spacing": [
            "error",
            "after",
        ],
        "no-class-assign": "error",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-new-symbol": "error",
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": [
            "error",
            "always",
        ],
        "prefer-arrow-callback": [
            "error",
            {
                allowNamedFunctions: true,
                allowUnboundThis: true,
            },
        ],
        "prefer-const": [
            "error",
            { destructuring: "all" },
        ],
        "prefer-destructuring": [
            "error",
            {
                array: false,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        "prefer-numeric-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "symbol-description": "error",
        "template-curly-spacing": [
            "error",
            "always",
        ],
        "yield-star-spacing": [
            "error",
            { before: false, after: true },
        ],
        curly: [
            "error",
            "multi-line",
            "consistent",
        ],
        "line-comment-position": "error",
        "space-before-blocks": [
            "error",
            "always",
        ],
        "max-lines": [
            "error",
            500,
        ],
        "max-statements": [
            "error",
            500,
        ],
        complexity: [
            "error",
            { max: 40 },
        ],
        "no-inline-comments": "error",
        "block-spacing": "error",
        "spaced-comment": [
            "error",
            "always",
        ],
        "no-div-regex": "error",
        "no-new": "error",
        "linebreak-style": "error",
        "max-depth": "error",
        "max-nested-callbacks": "error",
        "max-params": [
            "error",
            4,
        ],
        "no-negated-condition": "error",
        "no-plusplus": "error",
        "no-empty": [
            "error",
            { allowEmptyCatch: false },
        ],
        "no-empty-function": "error",
        quotes: [
            "error",
            "double",
            { allowTemplateLiterals: true },
        ],
        "no-else-return": "error",
        "no-eval": "error",
        "no-new-func": "error",
        "no-floating-decimal": "error",
        "no-implicit-coercion": "error",
        "no-throw-literal": "error",
        "array-element-newline": [
            "error",
            "consistent",
        ],
        "implicit-arrow-linebreak": [
            "error",
            "beside",
        ],
        "lines-between-class-members": [
            "error",
            "always",
            { exceptAfterSingleLine: true },
        ],
        "multiline-comment-style": [
            "error",
            "starred-block",
        ],
        "no-multiple-empty-lines": [
            "error",
            { max: 3, maxBOF: 1, maxEOF: 1 },
        ],
        "prefer-object-spread": "error",
        "rest-spread-spacing": [
            "error",
            "never",
        ],

        // ---- TypeScript Errors ----
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/ban-types": [
            "error",
            // TODO:
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": [
            "error",
            {
                allowDeclarations: true,
                allowDefinitionFiles: true,
            },
        ],
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            { classes: false, functions: false },
        ],
        "@typescript-eslint/no-var-requires": "error",

        /*
         * seems to be missing
         *'@typescript-eslint/prefer-readonly': 'error',
         */
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/restrict-plus-operands": "error",

        // ---- TypeScript Styles ----
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            "generic",
        ],
        "@typescript-eslint/camelcase": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/func-call-spacing": "error",
        "@typescript-eslint/generic-type-naming": [
            "error",
            "^[A-Z]",
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
            { ignoredNodes: ["ConditionalExpression"], flatTernaryExpressions: true },
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "comma",
                    requireLast: true,
                },
                singleline: {
                    delimiter: "comma",
                    requireLast: false,
                },
                overrides: {
                    interface: {
                        multiline: {
                            delimiter: "semi",
                            requireLast: true,
                        },
                        singleline: {
                            delimiter: "semi",
                            requireLast: false,
                        },
                    },
                },
            },
        ],
        "@typescript-eslint/member-naming": [
            "error",
            { private: "^_" },
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: [
                    "private-static-field",
                    "public-static-field",
                    "static-field",

                    "private-static-method",
                    "public-static-method",
                    "static-method",

                    "private-instance-field",
                    "public-instance-field",
                    "instance-field",

                    "private-field",
                    "public-field",
                    "protected-field",

                    "constructor",
                    "private-constructor",

                    "private-instance-method",
                    "public-instance-method",

                    "private-method",
                    "public-method",
                ],
            },
        ],
        "@typescript-eslint/no-angle-bracket-type-assertion": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-object-literal-type-assertion": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/semi": "error",
        "@typescript-eslint/type-annotation-spacing": [
            "error",
            {
                before: false,
                after: true,
                overrides: {
                    arrow: { before: true, after: true },
                },
            },
        ],
        "@typescript-eslint/unified-signatures": "error",

        // ---- Import errors ----

        "import/no-absolute-path": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/no-self-import": "error",
        "import/no-useless-path-segments": "error",
        "import/no-unused-modules": "error",
        "import/no-cycle": "warn",
        "import/no-named-as-default": "error",
        "import/no-mutable-exports": "error",
        "import/no-deprecated": "error",
        "import/no-extraneous-dependencies": "error",
        "import/unambiguous": "error",
        "import/no-amd": "error",

        // ---- Import styles ----

        "import/no-dynamic-require": "error",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/extensions": [
            "error",
            "always",
            { ignorePackages: true },
        ],
        "import/order": [
            "error",
            { "newlines-between": "never" },
        ],
        "import/newline-after-import": "error",
        "import/prefer-default-export": "error",
        "import/no-named-default": "error",
        "import/no-anonymous-default-export": [
            "error",
            {
                allowObject: true,
                allowArray: false,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: false,
                allowLiteral: false,
            },
        ],

        // ---- Import off ----

        // TODO: Consider using .test.ts files instead
        "import/no-relative-parent-imports": "off",

        "import/no-restricted-paths": "off",
        "import/no-internal-modules": "off",
        "import/no-commonjs": "off",
        "import/no-nodejs-modules": "off",
        "import/exports-last": "off",
        "import/no-namespace": "off",
        "import/max-dependencies": "off",
        "import/no-unassigned-import": "off",
        "import/no-default-export": "off",
        "import/no-named-export": "off",
        "import/group-exports": "off",
        "import/dynamic-import-chunkname": "off",

        // Handled by typescript
        "import/no-unresolved": "off",
        "import/named": "off",
        "import/default": "off",
        "import/namespace": "off",
        "import/export": "off",

        // ---- TypeScript disabled ----
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-parens": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-type-alias": "off",
        "@typescript-eslint/prefer-regexp-exec": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/unbound-method": "off",

        // Disabled
        "no-nested-ternary": "off",
        "no-await-in-loop": "off",
        "valid-jsdoc": "off",
        "class-methods-use-this": "off",
        "no-inner-declarations": "off",
        "guard-for-in": "off",
        "no-eq-null": "off",
        "no-empty-pattern": "off",
        "no-invalid-this": "off",
        "no-iterator": "off",
        "no-loop-func": "off",
        "no-restricted-properties": "off",
        "no-script-url": "off",
        "require-await": "off",
        "init-declarations": "off",
        "no-catch-shadow": "off",
        "no-restricted-globals": "off",
        "no-undef-init": "off",
        "callback-return": "off",
        "global-require": "off",
        "handle-callback-err": "off",
        "no-mixed-require": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-restricted-modules": "off",
        "no-sync": "off",
        "capitalized-comments": "off",
        "consistent-this": "off",
        "func-name-matching": "off",
        "func-names": "off",
        "func-style": "off",
        "id-blacklist": "off",
        "id-match": "off",
        "jsx-quotes": "off",
        "multiline-ternary": "off",
        "no-continue": "off",
        // TODO: Consider groups
        "no-mixed-operators": "off",
        "no-ternary": "off",
        "no-underscore-dangle": "off",
        "object-property-newline": "off",
        "one-var-declaration-per-line": "off",
        "require-jsdoc": "off",
        "sort-keys": "off",
        "wrap-regex": "off",
        "arrow-body-style": "off",
        "no-confusing-arrow": "off",
        "no-restricted-imports": "off",
        "require-yield": "off",
        "wrap-iife": "off",
        "no-sparse-arrays": "off",
        yoda: "off",
        "no-magic-numbers": "off",
        "no-shadow": "off",
        "no-return-await": "off",
        "id-length": "off",
        "no-warning-comments": "off",
        "array-bracket-newline": "off",
        "vars-on-top": "off",
        // TODO: Consider
        "padding-line-between-statements": "off",
        "space-in-parens": "off",
        "space-infix-ops": "off",
        // TODO: Implement
        "operator-linebreak": "off",
        console: "off",
        "max-classes-per-file": "off",
        "no-param-reassign": "off",
        "no-undefined": "off",
        // TODO: Consider
        "max-lines-per-function": "off",
        "no-restricted-syntax": "off",
        "sort-vars": "off",
        // Using eslint-plugin-import instead
        "sort-imports": "off",
    },
};
