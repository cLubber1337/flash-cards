const baseConfig = require('@it-incubator/stylelint-config');

module.exports = {
    ...baseConfig,
    rules: {
        "selector-combinator-space-after": null,
        ...baseConfig.rules,
        "no-descending-specificity": null
    }
};
