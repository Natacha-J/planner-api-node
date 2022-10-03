import { ForeignKeyConstraintError, ValidationError } from "sequelize";

const collectErrors = (errors: ValidationError | ForeignKeyConstraintError, type: string = '') => {
    let errorsTab: string[] = [];
    if(errors instanceof ForeignKeyConstraintError){
            errorsTab.push(`La valeur n'est pas valide pour le champ ${ errors.fields }`)
    }
    if(errors instanceof ValidationError){
        errors.errors.map((e: any) => {
                errorsTab.push(e.message);
        })
    }
    return errorsTab
}

module.exports = { collectErrors }