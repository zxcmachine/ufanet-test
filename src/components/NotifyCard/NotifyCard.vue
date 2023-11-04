<template>
    <div class="card">
        <div class="title">{{ item.todo }}</div>
        <div class="subtitle">{{ item.todo }}</div>
        <div class="bottom">
            <div class="card-delete" @click="emit('deleteNotyModal', item.id)">Удалить</div>
            <div class="card-edit" @click="emit('editNoty', item.id)">Изменить</div>
        </div>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['editNoty', 'deleteNotyModal'])
const props = defineProps(['item'])
</script>

<style scoped>
.card {
    max-width: 384px;
    width: 100%;
    background: #2A2A2B;
    box-shadow: 0px 12px 16px -4px #10182814;
    padding: 24px;
    border-radius: 12px;
}

.title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
}

.subtitle {
    color: #9A9A9A;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 12px;
}

.bottom {
    display: flex;
    gap: 20px;
    margin-top: 24px;
}

.card-delete {
    color: #F61F39;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.card-edit {
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}
</style>