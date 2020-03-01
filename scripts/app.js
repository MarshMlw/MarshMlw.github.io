var app = new Vue({
    // The dom element for the Vue instance
    el: '#vue',
    // Datas used by the vue Instance
    data: {
        message: 'Hello Vue!',
        list : false,
        single : false,
        projects: null,
        project: null
    },
    methods: {
        getProject: function (slug) {
            if (app.projects[slug] != null)
            {
                app.project = app.projects[slug];
                app.single = true;
                setTimeout(function () 
                { 
                    UIkit.modal($('#modal-project')).show();
                }, 500);
            }
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

        <li v-if="project.public" v-for="project in projects" v-on:click="getProject(project.slug)"
            class="uk-card uk-card-default uk-card-body" v-bind:slug="project.slug"
            v-bind:data-category="project.category">
            <img v-bind:src="project.images.logo" v-bind:alt="project.slug">
        </li>

    </ul>

    <div v-if="single" id="modal-project" class="uk-modal-container" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">

            <div class="top">

                <div class="left">
                    <div class="visual">
                    
                        <img v-bind:src="project.images.top" v-bind:alt="this.project.title">

                    </div>
                </div>

                <div class="right">

                    <h2 class="uk-modal-title">
                        {{ this.project.title }}
                    </h2>

                    <div class="context">
                        {{ this.project.type }} | {{ this.project.date }}
                    </div>

                    <div class="content">
                        {{ this.project.content }}
                    </div>
                </div>
            </div>

            <div class="bottom">

                <div class="left">

                    <div class="visual">

                        <img v-bind:src="project.images.left" v-bind:alt="this.project.title">
                    </div>

                </div>

                <div class="middle">

                    <div class="colors">

                        <h3>
                            Colors
                        </h3>

                        <div class="line">

                            <div v-for="color in project.colors" class="unit">
                                <div class="square"></div>
                                <div class="ref">
                                    <span>
                                        {{ color }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="fonts">
                        <h3>
                            Fonts
                        </h3>

                        <div class="line">
                            <p>
                                {{ this.project.fonts.main.name }}
                            </p>
                            <span>
                                ABCDEFGHIJKLMNOPQRSTUVWYYZ<br>
                                abcdefghijklmnopqrstuvwxyz<br>
                                0123456789
                            </span>
                        </div>

                        <div v-if="project.fonts.secondary != null" class="line">
                            <p>
                                {{ this.project.fonts.secondary.name }}
                            </p>
                            <span>
                                ABCDEFGHIJKLMNOPQRSTUVWYYZ<br>
                                abcdefghijklmnopqrstuvwxyz<br>
                                0123456789
                            </span>
                        </div>
                    </div>

                </div>

                <div class="right">

                    <div class="visual">
                    
                        <img v-bind:src="project.images.right" v-bind:alt="this.project.title">

                    </div>


                </div>
            </div>
        </div>
    </div>

</div>
          
    `,
    // Method that run after the creation of the Vue instance
    created: function () {
        // Request the projects data
        axios.get('https://api.myjson.com/bins/ltxyc')
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