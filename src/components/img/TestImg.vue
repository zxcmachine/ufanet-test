<template>
    <div class="image">
        <svg v-if="iconName == 'auth-welcome'" width="56" height="56" viewBox="0 0 56 56" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#2D2D2D" />
            <path
                d="M23 27V23C23 21.6739 23.5268 20.4021 24.4645 19.4645C25.4021 18.5268 26.6739 18 28 18C29.3261 18 30.5979 18.5268 31.5355 19.4645C32.4732 20.4021 33 21.6739 33 23V27M21 27H35C36.1046 27 37 27.8954 37 29V36C37 37.1046 36.1046 38 35 38H21C19.8954 38 19 37.1046 19 36V29C19 27.8954 19.8954 27 21 27Z"
                stroke="#FCFCFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FCFCFC" stroke-width="8" />
        </svg>
        <svg v-else-if="iconName == 'logout-icon'" width="20" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
                stroke="#FCFCFC" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else-if="iconName == 'rectangle'" width="56" height="56" viewBox="0 0 56 56" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#2D2D2D" />
            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FCFCFC" stroke-width="8" />
        </svg>

    </div>
</template>

<script setup>

const props = defineProps(['iconName'])

</script>
<style scoped>
.image {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>