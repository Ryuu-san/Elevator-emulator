<template>
    <div class="container-list-shaft">
        <Shaft
            v-for="shaft in elevatorsStatus" 
            :key="shaft.id" 
            :shaft = 'shaft'
            :totalwidth = 'totalwidth'
            @autoRunFloor = 'autoRunFloor'
        />
    </div>
</template>

<script setup>
    import { computed, watch, onMounted} from 'vue';
    import { useStore } from 'vuex';
    
    import Shaft from '@/components/shaft/shaft.vue';

    const store = useStore();

    const { elevators } = store.state.elevator;

    const totalwidth = computed(() => store.getters['elevator/elevatorWidth']);
   
    const elevatorsStatus = computed(() => store.state.elevator.elevatorsStatus);
   
    const elevatorRound = computed(() => store.state.elevator.elevatorRound);
    
    watch(elevatorRound, () =>{
        if(document.readyState !== 'complete') return;
        autoRunFloor();
    }, {deep: true})

    watch(elevatorsStatus, () =>{
        localStorage.setItem('elevatorsStatus', JSON.stringify(elevatorsStatus.value));
    }, {deep:true})


    const nearElevator = ((floor) =>{
        const localStorageElevatorsStatus = JSON.parse(localStorage.getItem('elevatorsStatus'));

        const filterElevators = [];
        elevatorsStatus.value.forEach(element =>{
            if(!element.active && element.currentFloor !== floor){
                filterElevators.push(
                    {
                        id: element.id,
                        currentFloor: Math.abs(element.currentFloor - floor),
                    }
                )
            }
        })
        if(!filterElevators.length) return;
        const continueDrivingElevator = elevatorsStatus.value.find(element =>{
            if(localStorageElevatorsStatus && element.targetFloor === floor) return element;
        })
        let nearestElevator = filterElevators.reduce((prev,cur) => cur.currentFloor < prev.currentFloor ? cur : prev);
        if(continueDrivingElevator) nearestElevator = continueDrivingElevator;
        const shaft = elevatorsStatus.value.find(element => element.id === nearestElevator.id);

        return shaft;
    })

    const autoRunFloor = (()=>{
        let activeElevators = 0;

        if(!elevatorsStatus.value) return;
        elevatorsStatus.value.forEach(element =>{
            if(element.active) activeElevators++;
        });
        const elevatorsRoundAvailable = elevatorRound.value.slice(activeElevators);
        if(elevatorsRoundAvailable[0]){
            searchShaft(elevatorsRoundAvailable[0], nearElevator(elevatorsRoundAvailable[0]));
        }
    })

    const searchShaft = (floor, storey) =>{
        let shaft = nearElevator(floor);
        if(storey) shaft = storey;
        if(!shaft) return;
        startElevator(shaft, floor);
        endElevator(shaft, floor);
    }

    const startElevator = (shaft, floor) =>{
        store.commit('elevator/setElevatorStatusChange', [shaft, floor]);
    }

    const endElevator = (shaft, floor) =>{
        const elevator = document.querySelector('.elevator[data-id="'+ shaft.id +'"]');
        if(!elevator) return;
        const endAnimation = () => {
            elevator.classList.add('elevator__relaxation');
            setTimeout(() =>{
                elevator.classList.remove('elevator__relaxation');
                store.commit('elevator/removeElevatorRound', floor);
                store.commit('elevator/setFloorStatusChagne', floor);
                store.commit('elevator/setElevatorStatusChange', [shaft, null, floor]);
            }, 3000)
            elevator.removeEventListener('transitionend', endAnimation);
        }
        elevator.addEventListener('transitionend', endAnimation);
    }

    onMounted(() =>{
        const localStorageElevatorsStatus = JSON.parse(localStorage.getItem('elevatorsStatus'));
        let defaultElevators = [];
        if(localStorageElevatorsStatus && localStorageElevatorsStatus.length === elevators){
            localStorageElevatorsStatus.forEach(element =>{
                element.active = false;
            });
            defaultElevators = localStorageElevatorsStatus;
        }else{
            for(let i = 1; i <= elevators; i++){
                defaultElevators.push({
                    id: i,
                    active: false,
                    currentFloor: 1,
                    targetFloor: 1
                })
            }
        }

        store.commit('elevator/setElevatorsStatus', defaultElevators);
    })
</script>

<style lang="scss" scoped>
    .container-list-shaft{
        width: 100%;
        max-width: 460px;
        display: contents;
    }
</style>
