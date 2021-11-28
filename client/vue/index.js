new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            userName: ''
        }
    },
    methods: {
        onValidate(type) {
            onBoatSelection(type, this.userName)
        }
    }
})
