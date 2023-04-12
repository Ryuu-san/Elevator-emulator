<template>
    <div 
        class="container-list-shaft__elevator" 
        :style="'height:' + totalwidth"
    >
        <Elevator
            :shaft = 'shaft'
            :style = "styleShaft"
        />
    </div>
</template>

<script setup>
    import { onMounted, watch, ref } from 'vue';

    import Elevator from '@/UI/elevator/elevator.vue';

    const props = defineProps({
        shaft: {
            type: Object,
            default: null,
            require: true
        },
        totalwidth: {
            type: String,
            default: '',
            require: true
        }
    })

    const emit = defineEmits(['autoRunFloor'])

    let styleShaft = ref('transform: translateY(-' + (props.shaft.currentFloor - 1) * 100 + "px");

    const changeStyleShaft = ()=>{
        if(!props.shaft.active){
            styleShaft.value = 'transform: translateY(-' + (props.shaft.currentFloor - 1) * 100 + "px";
        }else{
            styleShaft.value = ['transform: translateY(-' + (props.shaft.targetFloor - 1) * 100 + "px", 'transition-duration:' + Math.abs(props.shaft.targetFloor - props.shaft.currentFloor) + 's'];
        }
    }

    watch(props.shaft, ()=>{
        setTimeout(()=>{
            changeStyleShaft();
        }, 10)
    })

    onMounted(()=>{
        emit('autoRunFloor');
    })
</script>

<style lang="scss" scoped>
    .container-list-shaft{
        .container-list-shaft__elevator{
            width: 100%;
            min-width: 40px;
            max-width: 100px;
            display: flex;
            flex-direction: column-reverse;
            margin: 0 5px;
            border-top:1px solid #f2f1f3;
            border-bottom: 1px solid #f2f1f3;
            border-left: 3px solid #c5cbcd;
            border-right: 3px solid #c5cbcd;

            &:last-child{
                margin-right: 0px;
            }
        }
    }
</style>
