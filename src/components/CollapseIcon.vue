<template>
    <div class="collapse-icon-container">
        <div class="collapse-icon" @click="() => display = !display">
            <div class="icon"></div>
        </div>
        <ul class="collapse-list" :class="{displayed: display}">
            <li v-for="(o, idx) of options" :key="idx">
                {{ o.name }}
            </li>
            <li>
                <router-link to="/login">Logout</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    name: 'CollapseIcon',
    props: ['options'],
    setup() {
        const display = ref(false);

        return {display}
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
}
.collapse-icon-container {
    position: absolute;
    right: 10px;
}

.collapse-icon {
    width: 50px;
    height: 50px;
    background-color: rgb(199, 237, 238);
    border-radius: 5px;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon {
    width: 40px;
    height: 6px;
    background-color: rgb(3, 28, 83);
    border-radius: 10px;
}

.icon::before, .icon::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 6px;
    left: 5px;
    background-color: rgb(3, 28, 83);
    border-radius: 10px;
}

.icon::before {
    transform: translateY(-10px);
}

.icon::after {
    transform: translateY(10px);
}

.collapse-list {
    height: 0px;

    background-color: white;
    box-shadow: 2px 2px 5px black;
    border-radius: 10px;

    list-style: none;
    margin: 0px;
    margin-top: 10px;

    position: absolute;
    right: 0px;

    overflow: hidden;
    z-index: 100;

    transition-property: height;
    transition-duration: 200ms;
}

.collapse-list > li:hover {
    cursor: pointer;
    font-weight: 700;
}

.collapse-list.displayed {
    height: 80px;
    padding: 5px;
}
</style>
