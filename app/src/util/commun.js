// Format la chaine de caractères
String.prototype.format = function () {
    let formatted = this;

    for (let arg in arguments)
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);

    return formatted;

};
