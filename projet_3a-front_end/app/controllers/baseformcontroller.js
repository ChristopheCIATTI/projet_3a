class BaseFormController extends BaseController {
    constructor() {
        super()
    }
    validateRequiredField(selector, name) {
        console.log("called")
        const value =  $(selector).value
        console.log("v:" +  value)
        console.log("n:" +  name)
        if ((value == null) || (value === "")) {
            this.toast("Le champs" + name + " est obligatoire")
            $(selector).style.backgroundColor = 'antiquewhite'
            return null
        }
        return value
    }
}
