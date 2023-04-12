<template>
    <div class="container-floors__floor">
        <Checkbox
            :floor = "floor"
            @click = 'emit("selectFloor", floor.id)'
        />
    </div>
</template>

<script setup>
    import Checkbox from '@/UI/checkbox/checkbox.vue'

    const props = defineProps({
        floor: {
            type: Object,
            default: null,
            require: true
        }
    })

    const emit = defineEmits(['selectFloor'])
</script>

<style lang="scss" scoped>
    .container-floors{
        &__floor{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 99px;
            border-top:1px solid #f2f1f3;
            padding-left: 15px;

            &:first-child{
                border-bottom:1px solid #f2f1f3;
            }
        }
    }
</style>
