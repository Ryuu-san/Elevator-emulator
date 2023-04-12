<template>
    <div 
        class="elevator" 
        :data-id="shaft.id"
    >
        <div 
            class="elevator__status" 
            v-if="shaft.active"
        >
            <span>{{ shaft.currentFloor > shaft.targetFloor ? '&#8595;' : '&#8593;' }}</span>
            <span>{{ shaft.targetFloor }}</span>
        </div>    
    </div>
</template>

<script setup>
    const props = defineProps({
        shaft: {
            type: Object,
            default: null,
            required: true
        },
    })
</script>

<style lang="scss" scoped>
    .elevator{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-width: 20px;
        height: 100px;
        background-color: #03feff;
        transform: translateY(0%);
        transition-timing-function: linear;
        
        &.elevator__relaxation{
            animation: relaxation 1s infinite linear;
        }

        &__status{
            width: 100%;
            max-width: 26px;
            min-width: 10px;
            display: flex;
            justify-content: space-between;
            padding: 6% 14%;
            margin-top: 10px;
            background-color: rgba(0, 0, 0, 0.431);
            border-radius: 5px;

            span{
                color:white;
            }
        }
    }

    @keyframes relaxation {
        0% {
            opacity: 0.2;
        }
        50%{
            opacity: 0.7;
        }
        100% {
            opacity: 1;
        }
    }
</style>
