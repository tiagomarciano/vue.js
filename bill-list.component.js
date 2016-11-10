window.billListComponent = Vue.extend({
    template: `
        <style>
            .pago {
                color: green;
            }
            .nao-pago {
                color: red;
            }
        </style>
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Pago?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{ index + 1 }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'pago': o.done, 'nao-pago': !o.done}">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="removeBill(o)">Remover</a> |
                    <span v-if="o.done == 0">
                        <a href="#" @click.prevent="changeStatusBill(o)">Baixar</a>
                    </span>
                    <span v-else>
                        <a href="#" @click.prevent="changeStatusBill(o)">Não Pago</a>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function() {
        return {
            bills: [
                {date_due: '20/10/2016', name: 'Conta de luz', value: 120.00, done: 0},
                {date_due: '21/10/2016', name: 'Conta de água', value: 40.00, done: 1},
                {date_due: '22/10/2016', name: 'Conta de telefone', value: 50.00, done: 1},
                {date_due: '23/10/2016', name: 'Supermercado', value: 825.99, done: 1},
                {date_due: '24/10/2016', name: 'Cartão de Crédito', value: 500.99, done: 1},
                {date_due: '25/10/2016', name: 'Empréstimo', value: 380.28, done: 1},
                {date_due: '26/10/2016', name: 'Gasolina', value: 200.00, done: 1}
            ]
        }
    },
    methods: {
        loadBill: function(bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype','update');
        },
        removeBill: function(bill) {
            if (confirm('Deseja remover o registro?'))
                this.bills.$remove(bill);
        },
        changeStatusBill: function(bill) {
            bill.done = bill.done ? 0 : 1;
        }
    },
    events: {
        'new-bill': function(bill) {
            this.bills.push(bill);
        }
    }
});