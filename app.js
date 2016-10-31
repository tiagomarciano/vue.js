Vue.filter('doneLabel', function(value) {
    if (value == 0) {
        return "Não";
    } else {
        return "Sim";
    }
});

var app = new Vue({
    el: "#app",
    data: {
        test: '',
        title: "Contas à pagar",
        menus: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        activedView: 0,
        formType: 'insert',
        hasDebts: false,
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de Crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/10/2016', name: 'Conta de luz', value: 120.00, done:1},
            {date_due: '21/10/2016', name: 'Conta de água', value: 40.00, done:1},
            {date_due: '22/10/2016', name: 'Conta de telefone', value: 50.00, done:1},
            {date_due: '23/10/2016', name: 'Supermercado', value: 825.99, done:1},
            {date_due: '24/10/2016', name: 'Cartão de Crédito', value: 500.99, done:1},
            {date_due: '25/10/2016', name: 'Empréstimo', value: 380.28, done:1},
            {date_due: '26/10/2016', name: 'Gasolina', value: 200.00, done:1}
        ]
    },
    computed: {
        status: function() {
            this.hasDebts = false;

            if (this.bills.length > 0) {
                var count = 0;

                for (var i in this.bills) {
                    if(!this.bills[i].done)
                        count++;
                }

                this.hasDebts = true;
                return count;
            }

            return false;
        }
    },
    methods: {
        showView: function(id) {
            this.activedView = id;
            if(id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function() {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.activedView = 0;
        },
        loadBill: function(bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        removeBill: function(index) {
            if (confirm('Deseja remover o registro?'))
                this.bills.splice(index,1);
        },
        changeStatusBill: function(bill) {
            console.log(bill.done);

            bill.done = bill.done ? 0 : 1;
        }
    },
    filters: {
        'statusLabel': function (value) {
            if (value == 0 && this.hasDebts) {
                return "Nenhuma conta para pagar";
            } else if (value > 0) {
                return "Existe(m) " + value + " conta(s) a pagar";
            } else {
                return "Nenhuma conta cadastrada";
            }
        }
    }
});

/*app.$watch('test', function(newValue, oldValue) {
    console.log('oldValue: ' + oldValue + ' newValue: ' + newValue)
})*/
