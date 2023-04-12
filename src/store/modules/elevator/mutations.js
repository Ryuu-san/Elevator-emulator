export const setElevatorsStatus = (state, data) => {
    state.elevatorsStatus = data;
}

export const setFloorsStatus = (state, data) => {
    state.floorsStatus = data;
}

export const setElevatorStatusChange = (state, data) => {
    const elevator = state.elevatorsStatus.find(elevator => elevator.id === data[0].id);
    elevator.active = !data[0].active;
    if(data[1]) elevator.targetFloor = data[1];
    if(data[2]) elevator.currentFloor = data[2];
}

export const setFloorStatusChagne = (state, data) => {
    const floor = state.floorsStatus.find(floor => floor.id === data);
    floor.active = !floor.active;
}

export const setElevatorRound = (state, data) => {
    state.elevatorRound.push(data);
}

export const removeElevatorRound = (state, data) => {
    state.elevatorRound = state.elevatorRound.filter((round) => round !== data);
}
