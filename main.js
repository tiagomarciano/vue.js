var router = new VueRouter();

router.map({
    '/bills' : {
        component: billListComponent
    },
    'bill/create': {
        component: billCreateComponent
    }
});

router.start({
    components: {
        'app-component': appComponent
    }
},'#app')