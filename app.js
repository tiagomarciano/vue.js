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

var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
            </li>
        </ul>
    </nav>`,
    data: function() {
        return {
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ]
        };
    },
    methods: {
        showView: function(id) {
            this.$root.$children[0].activedView = id;
            if(id == 1) {
                this.$parent.formType = 'insert';
            }
        }
    }
})

var billListComponent = Vue.extend({
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
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update';
        },
        removeBill: function(bill) {
            if (confirm('Deseja remover o registro?'))
                this.bills.$remove(bill);
        },
        changeStatusBill: function(bill) {
            bill.done = bill.done ? 0 : 1;
        }
    }
});

var billCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due">
            <br><br>

            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o">{{ o }}</option>
            </select>
            <br><br>

            <label>Valor:</label>
            <input type="text" v-model="bill.value">
            <br><br>

            <label>Pago?</label>
            <input type="checkbox" v-model="bill.done">
            <br><br>

            <input type="submit" value="Salvar">
        </form>
    `,
    props: ['bill','formType'],
    data: function() {
        return {
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ]
        };
    },
    methods: {
        submit: function() {
            if (this.formType == 'insert') {
                this.$parent.$refs.billListComponent.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.$parent.activedView = 0;
        }
    }
});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
        <style type="text/css">
            .red {
                color: darkred;
            }
            .green {
                color: darkgreen;
            }
            .gray {
                color: gray;
            }
            a {
                color: dodgerblue;
            }
        </style>
        
        <h1>{{ title }}</h1>
        <h3 :class="{'green': !status, 'red': status, 'gray': status === false}">{{ status | statusGeneral }}</h3>
        
        <menu-component></menu-component>
    
        <div v-show="activedView == 0">
            <bill-list-component v-ref:bill-list-component></bill-list-component>    
        </div>
    
        <div v-show="activedView == 1">
            <bill-create-component :bill.sync="bill" v-bind:form-type="formType"></bill-create-component>    
        </div>`,
    data: function(){
        return {
            title: "Contas à pagar",

            activedView: 0,
            formType: 'insert',
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            },


        };
    },
    computed: {
        status: function() {
            var billListComponent = this.$refs.billListComponent;

            if (billListComponent.bills.length > 0) {
                var count = 0;

                for (var i in billListComponent.bills) {
                    if(!billListComponent.bills[i].done)
                        count++;
                }

                return count;
            }

            return false;
        }
    },
    methods: {


    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: "#app",
});