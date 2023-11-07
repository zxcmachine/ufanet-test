<template>
  <div class="image">
    <svg
      v-if="iconName == 'auth-welcome'"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="48" height="48" rx="24" fill="#2D2D2D" />
      <path
        d="M23 27V23C23 21.6739 23.5268 20.4021 24.4645 19.4645C25.4021 18.5268 26.6739 18 28 18C29.3261 18 30.5979 18.5268 31.5355 19.4645C32.4732 20.4021 33 21.6739 33 23V27M21 27H35C36.1046 27 37 27.8954 37 29V36C37 37.1046 36.1046 38 35 38H21C19.8954 38 19 37.1046 19 36V29C19 27.8954 19.8954 27 21 27Z"
        stroke="#FCFCFC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="4"
        y="4"
        width="48"
        height="48"
        rx="24"
        stroke="#FCFCFC"
        stroke-width="8"
      />
    </svg>
    <svg
      v-else-if="iconName == 'logout-icon'"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
        stroke="#FCFCFC"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="iconName == 'rectangle'"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="48" height="48" rx="24" fill="#2D2D2D" />
      <rect
        x="4"
        y="4"
        width="48"
        height="48"
        rx="24"
        stroke="#FCFCFC"
        stroke-width="8"
      />
    </svg>
    <svg
      v-else-if="iconName == 'trash'"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15H14.1667M14.1667 15H27.5M14.1667 15V26.6667C14.1667 27.1087 14.3423 27.5326 14.6548 27.8452C14.9674 28.1577 15.3913 28.3333 15.8333 28.3333H24.1667C24.6087 28.3333 25.0326 28.1577 25.3452 27.8452C25.6577 27.5326 25.8333 27.1087 25.8333 26.6667V15H14.1667ZM16.6667 15V13.3333C16.6667 12.8913 16.8423 12.4674 17.1548 12.1548C17.4674 11.8423 17.8913 11.6667 18.3333 11.6667H21.6667C22.1087 11.6667 22.5326 11.8423 22.8452 12.1548C23.1577 12.4674 23.3333 12.8913 23.3333 13.3333V15M18.3333 19.1667V24.1667M21.6667 19.1667V24.1667"
        stroke="#FCFCFC"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="iconName == 'edit'"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_216_464)">
        <path
          d="M24.167 12.5C24.3859 12.2811 24.6457 12.1075 24.9317 11.9891C25.2176 11.8706 25.5241 11.8096 25.8337 11.8096C26.1432 11.8096 26.4497 11.8706 26.7357 11.9891C27.0216 12.1075 27.2815 12.2811 27.5003 12.5C27.7192 12.7189 27.8928 12.9787 28.0113 13.2647C28.1297 13.5506 28.1907 13.8571 28.1907 14.1667C28.1907 14.4762 28.1297 14.7827 28.0113 15.0687C27.8928 15.3546 27.7192 15.6145 27.5003 15.8333L16.2503 27.0833L11.667 28.3333L12.917 23.75L24.167 12.5Z"
          stroke="#FCFCFC"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_216_464">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(10 10)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps(["iconName"]);
</script>
<style scoped>
.image {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
