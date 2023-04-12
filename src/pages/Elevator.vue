<template>
    <main>
        <section class="container-elevators">
            <LiftShaft/>
            <ListFloor/>
        </section>
    </main>
</template>

<script setup>
    import ListFloor from '@/modules/list-floor/list-floor.vue'
    import LiftShaft from '@/modules/list-shaft/list-shaft.vue'
</script>

<style lang="scss" scoped>
    .container-elevators{
        display: flex;
        margin: 10px 0px;
    }
</style>
