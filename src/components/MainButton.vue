<template>
    <div class="btn" :class="{ 'dark': isDark, 'red': isRed }">
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps(['isDark', 'isRed'])
</script>

<style scoped>
.btn {
    color: white;
    background: #005FF9;
    padding: 10px 18px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    cursor: pointer;
    transition: .4s;
}

.btn:hover {
    opacity: 0.7;
}

.btn.dark {
    background: #181819;
}

.btn.red {
    background: #BA0117;
}
</style>

