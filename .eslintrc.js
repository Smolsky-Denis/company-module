module.exports = {
    "extends": "plugin:angular/johnpapa",
    "plugins": [
        "import",
        "angular",
    ],
    "parser": "babel-eslint",
    "rules": {
        "angular/file-name": "off",
        "semi": ["error", "always"], // http://eslint.org/docs/rules/semi#always

        "indent": ["error", 4, {"SwitchCase": 1}], //4 spaces
        "linebreak-style": 0,
        "max-len": ["error", 150, {"ignoreTrailingComments": true}],
        "default-case": "error",

        "comma-dangle": ["error", "never"], // http://eslint.org/docs/rules/comma-dangle#always-multiline
        "consistent-return": ["error", {"treatUndefinedAsUnspecified": true}], // https://eslint.org/docs/rules/consistent-return
        "space-before-function-paren": ["error", {"anonymous": "always", "named": "never"}], // http://eslint.org/docs/rules/space-before-function-paren
        "radix": ["error", "as-needed"], // http://eslint.org/docs/rules/radix#as-needed
        "no-bitwise": "off",

        "no-cond-assign": ["error", "always"], // http://eslint.org/docs/rules/no-cond-assign
        "no-console": ["error", {allow: ["warn", "error"]}],
        "no-debugger": "error",
        "prefer-template": "error", // disable template concationation
        "class-methods-use-this": [0],
        "no-plusplus": "off", // http://eslint.org/docs/rules/no-plusplus
        "no-confusing-arrow": "off",
        "no-multi-spaces": ["error", {"ignoreEOLComments": true}], // https://eslint.org/docs/rules/no-multi-spaces
        "import/prefer-default-export": "off",
        "eol-last": ["error", "always"],
    },
    "env": {
        "browser": true,    // makes `window` and `document` variables defined for parser
        "jquery": true,
    },
};