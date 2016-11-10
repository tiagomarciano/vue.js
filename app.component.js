window.appComponent = Vue.extend({
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
        <router-view></router-view>
        <!--<div v-show="activedView == 0">
            <bill-list-component v-ref:bill-list-component></bill-list-component>    
        </div>
    
        <div v-show="activedView == 1">
            <bill-create-component :bill.sync="bill"></bill-create-component>    
        </div>-->`,
    data: function(){
        return {
            title: "Contas à pagar",
            activedView: 0
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
    methods: {},
    events: {
        'change-activedview': function(activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function(formType) {
            this.$broadcast('change-formtype',formType);
        },
        'change-bill': function(bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function(bill) {
            this.$broadcast('new-bill', bill);
        }
    }
});