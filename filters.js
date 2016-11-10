Vue.filter('doneLabel', function(value) {
    if (value == 0) {
        return "Não";
    } else {
        return "Sim";
    }
});

Vue.filter('statusGeneral', function (value) {
    if (value === false){
        return "Nenhuma conta cadastrada.";
    }

    if (!value) {
        return "Nenhuma conta a pagar.";
    } else {
        return "Existem "+ value +" conta(s) a serem paga(s)";
    }
});
