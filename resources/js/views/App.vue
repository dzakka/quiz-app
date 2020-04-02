<template>
    <div>        
        <!-- <p>
            <router-link :to="{ name: 'categories' }">Cat</router-link> |
            <router-link :to="{ name: 'hello' }">Hello World</router-link>
        </p>
         -->
        <div class="container mt-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',

    }
</script>