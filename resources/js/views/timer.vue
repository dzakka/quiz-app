<template>
<div>
    <p>00:{{ timerCount }}</p>
    <button v-on:click="daniel()">Reset</button>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                timerCount: 60
            }
        },

        watch: {

            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        },
        methods:{
            daniel(){
                this.timerCount =60;
            }
        }
    }

</script>