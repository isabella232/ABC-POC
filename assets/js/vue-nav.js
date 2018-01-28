Vue.component('nav-item', {
    props: ['index'],
    template: '<li ><a>{{ index.text }}</a></li>'
})

new Vue({
    el: '#app',
    data: {
        currentIndex: '',
        indices: [
            { id: 0, text: 'news' },
            { id: 1, text: 'iview' },
            { id: 2, text: 'radio' },
            { id: 3, text: 'television' },
        ]
    },
    computed: {
        indexSelected: function () {
            return this.currentIndex !== ''
        },
        newsSelected: function () {
            return this.currentIndex === 'news'
        },
    },
    methods: {
        selectIndex: function (event) {
            this.currentIndex = $(event.target).text()
            $(event.target).parent().toggleClass('active').siblings().removeClass('active');
            if ($(event.target).parent().hasClass("active")) this.currentIndex = $(event.target).text()
            else this.currentIndex = ''
            console.log('currentIndex', this.currentIndex);
        }
    },
})
