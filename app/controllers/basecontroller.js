class BaseController {
    constructor() {
        this.setBackButtonView('index')
        //const itemUse = ["Se deconnecter"]
    }
    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    jsonDateToString(JsonDate) {
        const date = new Date(JsonDate)
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()) 
    }

    ifLogged(tokenStatus) {

        tokenStatus.then(status => {
            if(status == false) {
                console.log(status)
                popUp.popUpError("Session expiré veuillez \nvous authentifier à nouveaux");
                return false
            }
            if(status == true) {
                this.navBarLogged()
                return true
            }
        })
    }

    logout() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        localStorage.clear()
        this.restoreNavBar()
        navigate('login')
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    navBarLogged() {
        document.getElementById("navbarProfile").hidden = true;
        document.getElementById("monCompte").hidden = false;
        document.getElementById("logoutButton").hidden = false;
        document.getElementById("articleMenu").hidden = false;
    }

    restoreNavBar() {
        document.getElementById("navbarProfile").hidden = false;
        document.getElementById("monCompte").hidden = true;
        document.getElementById("logoutButton").hidden = true;
        document.getElementById("articleMenu").hidden = true;
    }

    parentfunction() {
        console.log("parentfunction")
    }


    /*
    wordCount(value) {
        var wom = value.match(/\S+/g);
        return {
            charactersNoSpace: value.replace(/\s+/g, '').length,
            characters:  value.length,
            words: wom ? wom.length : 0,
            lines: value.split(/\r*\n/).length
        }
    }
    */
}

window.baseController = new BaseController()