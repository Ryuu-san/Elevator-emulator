<template>
    <div class="floor">
        <input 
            :id="floor.id" 
            :checked="floor.active"
            :disabled="floor.active"
            class="floor-select" 
            type="checkbox"
        >
        <label 
            :for="floor.id" 
            class="floor-header" 
        >{{ floor.id }}</label>
    </div>
</template>

<script setup>
    const props = defineProps({
        floor: {
            type: Object,
            default: null,
            require: true
        }
    })
</script>

<style lang="scss" scoped>
    .floor{
        width: max-content;
        display: flex;
        flex-direction: column-reverse;
        position: relative;
        &-select{
            position: absolute;
            z-index: -1;
            opacity: 0;
            &+label {
                position: absolute;
                display: inline-flex;
                align-items: center;
                user-select: none;
                cursor: pointer;

                &::before {
                    content: '';
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    border: 1px solid #95d5e6;
                    border-radius: 4px;
                    margin-right: 10px;
                }
                &::after {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    left: 12px;
                    background-color: #44a2bb;
                    outline: 2px solid #66b2c7;
                    outline-offset: 2px;
                    border-radius: 20px;
                }
                &:hover{
                    &::before {
                        border: 1px solid #48c0e1;
                    }
                    &::after {
                        background-color: #2099bb;
                    }
                }
                &:active{
                    &::before {
                        background-color: #f3f3f3;
                    }
                }
            }
            &:disabled+label{
                &::before {
                    border: 1px solid #f8ddcb;
                }
                &::after{
                    background-color: #f3721a;
                    outline: 2px solid #daa080;
                }
                &:hover{
                    &::before{
                        border: 1px solid #f9c7a5;
                    }
                    &::after{
                        background-color: #dc6516;
                    }
                }

            }
        }
        &-header{
            position: absolute;
            top: -20px;
            font-weight: 600;
        }
    }
</style>
