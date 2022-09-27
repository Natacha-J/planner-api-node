const collectErrors = (errors: any) => {
    let errorsTab: string[] = [];
    errors.errors.map( (e: any) => {
    errorsTab.push(e.message);
    })
    return errorsTab
}

module.exports = { collectErrors }