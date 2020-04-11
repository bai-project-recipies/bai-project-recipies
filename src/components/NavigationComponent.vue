<template>
  <div class="NavigationComponent">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <router-link to="/"><b-navbar-brand>Recipies App</b-navbar-brand></router-link>
        <b-navbar-toggle target="nav-collapse"/>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="left">
            <b-nav-item-dropdown text="Search recipies" right>
              <b-dropdown-item v-for="item in items">
                <router-link :to="item.path">{{item.title}}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav>
            <b-nav-item href="#">Generate meal plan</b-nav-item>
            <b-nav-item href="#">Map ingredient to grocery products</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

  </div>
</template>

<script>
  export default {
    props: {},
    data () {
      return {
        items: [
          { title: 'Fast simple search', icon: '', path: '/' },
          { title: 'By ingredients', icon: '', path: '/by-ingredients' },
          { title: 'By nutrients', icon: '', path: '/by-nutrients' },
          { title: 'Complex search', icon: '', path: '/complex' },
        ],
      }
    },
    computed: {
    },
  }
</script>
