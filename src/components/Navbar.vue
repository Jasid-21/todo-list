<template>
  <nav>
    <h1>My Tasks</h1>
    <ul>
        <li v-for="(o, idx) of options" :key="idx">
            {{ o }}
        </li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
    setup() {
        const options = ['All', 'Pending', 'Done', 'Calendar'];

        return {options}
    }
}
</script>

<style scoped>
nav {
    height: 80px;
    margin: 0px;
    padding: 0px;
    background-color: #6096B4;

    display: flex;
    align-items: center;
}

nav > h1 {
    margin: 0px;
    margin-left: 50px;
}

nav > ul {
    width: 50%;
    margin: 0px;
    padding: 0px;
    list-style: none;
    display: flex;
    justify-content: space-around;
}

nav > ul > li {
    margin-right: 20px;
}
</style>