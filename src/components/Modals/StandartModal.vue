<template>
    <transition name="modal-fade">
        <div v-if="active" class="modal" @click="emit('closeModal')">
            <div class="modal-content" @click.stop>
                <div class="modal-top">
                    <TestImg :icon-name="'rectangle'" />
                    <div class="modal-title">{{ title }}</div>
                </div>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
  
<script setup>
import { defineEmits } from 'vue'
import TestImg from '../img/TestImg.vue';
import MainButton from '../MainButton.vue';
const emit = defineEmits(['closeModal'])
const props = defineProps(['active', 'title'])

</script>
  
<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #2A2A2B;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    max-width: 408px;
    width: 100%;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.modal-buttons {
    display: flex;
    gap: 12px;
}

.modal-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    color: white;
    margin-top: 20px;
}
</style>