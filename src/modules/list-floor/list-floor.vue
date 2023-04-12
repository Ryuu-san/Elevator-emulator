<template>
    <div class="container-floors">
        <Floor
            v-for="floor in floorsStatus" 
            :key="floor.id" 
            :floor = "floor"
            @selectFloor = 'selectFloor'
        />
    </div>
</template>

<script setup>
    import { computed, watch, onMounted } from 'vue';
    import { useStore } from 'vuex';

    import Floor from '@/components/floor/floor.vue';

    const store = useStore();

    const { floors } = store.state.elevator;
    
    const elevatorRound = computed(() => store.state.elevator.elevatorRound);

    const elevatorsStatus = computed(() => store.state.elevator.elevatorsStatus);

    const floorsStatus = computed(() => store.state.elevator.floorsStatus);

    watch(elevatorRound, () =>{
        localStorage.setItem('elevatorRound', JSON.stringify(elevatorRound.value));
    }, {deep: true})

    watch(floorsStatus, () =>{
        localStorage.setItem('floorsStatus', JSON.stringify(floorsStatus.value));
    }, {deep:true})

    const selectFloor = ((id) =>{
        if(elevatorRound.value.includes(id) || elevatorsStatus.value.find(element => element.currentFloor === id && !element.active)) return;
        store.commit('elevator/setFloorStatusChagne', id);
        store.commit('elevator/setElevatorRound', id);
    })

    onMounted(() => {
        const localStorageRound = JSON.parse(localStorage.getItem('elevatorRound'));
        const localStorageFloorsStatus = JSON.parse(localStorage.getItem('floorsStatus'));

        let defaultFloors = [];

        if(localStorageFloorsStatus && localStorageFloorsStatus.length === floors){
            defaultFloors = localStorageFloorsStatus;
        }else{
            for(let i = 1; i <= floors; i++){
                defaultFloors.push({
                    id: i,
                    active: false,
                })
            }
        }

        store.commit('elevator/setFloorsStatus', defaultFloors);

        if(localStorageRound){
            localStorageRound.forEach((element) =>{
                store.commit('elevator/setElevatorRound', element);
            })
        }
    })
</script>

<style lang="scss" scoped>
    .container-floors{
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
    }
</style>
