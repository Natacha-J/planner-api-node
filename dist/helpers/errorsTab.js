"use strict";
const collectErrors = (errors) => {
    let errorsTab = [];
    errors.errors.map((e) => {
        errorsTab.push(e.message);
    });
    return errorsTab;
};
module.exports = { collectErrors };
