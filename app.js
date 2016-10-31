var app = new Vue({
    el: "#app",
    data: {
        title: "Contas à pagar",
        bills: [
            {date_due: '20/10/2016', name: 'Conta de luz', value: 120.00, done:1},
            {date_due: '21/10/2016', name: 'Conta de água', value: 40.00, done:0},
            {date_due: '22/10/2016', name: 'Conta de telefone', value: 50.00, done:0},
            {date_due: '23/10/2016', name: 'Supermercado', value: 825.99, done:0},
            {date_due: '24/10/2016', name: 'Cartão de Crédito', value: 500.99, done:0},
            {date_due: '25/10/2016', name: 'Empréstimo', value: 380.28, done:0},
            {date_due: '26/10/2016', name: 'Gasolina', value: 200.00, done:0}
        ]
    },
    computed: {
        status: function() {
            var count = 0;

            for (var i in this.bills) {
                if(!this.bills[i].done)
                    count++;
            }

            return !count ? "Nenhuma conta a pagar." : "Existem " + count + " contas a serem pagas."
        }
    }
})