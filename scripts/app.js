var app = new Vue({
    // The dom element for the Vue instance
    el: '#vue',
    // Datas used by the vue Instance
    data: {
        message: 'Hello Vue!',
        list : false,
        projects: null,
    },
    methods: {
        test: function (slug) {
            console.log(slug);
        }
    },
    template: `

<div uk-filter="target: .js-filter">

    <ul class="filters uk-subnav uk-subnav-pill">
        <li class="uk-active all" uk-filter-control><a href="#">Tous</a></li>
        <li uk-filter-control="[data-category='web']"><a href="#">Web</a></li>
        <li uk-filter-control="[data-category='print']"><a href="#">Print</a></li>
    </ul>

    <ul v-if="list" class="js-filter uk-child-width-1-2 uk-child-width-1-3@m uk-text-center" id="project-grid"
        uk-grid="masonry: true">

        <li v-if="project.public" v-for="project in projects" v-on:click="test(project.slug)" class="uk-card uk-card-default uk-card-body"
            v-bind:slug="project.slug" v-bind:data-category="project.category">
            <img v-bind:src="project.images.logo" v-bind:alt="project.slug">
        </li>

    </ul>

</div>
          
    `,
    // Method that run after the creation of the Vue instance
    created: function () {
        // Request the projects data
        axios.get('https://api.myjson.com/bins/1gu750')
            .then(function (response) {
                // handle success
                app.projects = response.data
                app.list = true
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
})