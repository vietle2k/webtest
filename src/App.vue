<template>
  <div id="app">
    <Header/>
    <Navbar/>
    <Content/>
  </div>
</template>

<script>
import Header from './components/layout/header.vue'
import Navbar from './components/layout/navbar.vue'
import Content from './components/layout/content.vue'
export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Content
  }
}
</script>

<style>
@import './style/base/table.css';
@import './style/base/button.css';
@import './style/base/input.css';
body {
  font-family: GoogleSans-Regular;
  font-size: 13px;
}

@font-face {
  font-family: "GoogleSans-Regular";
  src: url("./assets/font/GoogleSans-Regular.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Bold";
  src: url("./assets/font/GoogleSans-Bold.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Italic";
  src: url("./assets/font/GoogleSans-Italic.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-BoldItalic";
  src: url("./assets/font/GoogleSans-BoldItalic.otf") format("opentype");
}
</style>
