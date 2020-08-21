<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="counter">Counter: {{ counter }}</div>
    <div>
      {{ book }}
    </div>
    <div>
      {{ book1 }}
    </div>
    <div>
      <button @click="add">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from "vue";

interface Book {
  title: string;
  author: string;
  year: number;
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: "Vue 3 Guide",
        author: "Vue Team",
        year: 2020
      } as Book
    };
  },
  setup() {
    // const book1 = reactive<Book>({ title: 'Vue 3 Guide  from setup', author: "abelit", year: 2019 });
    // // or
    const book1: Book = reactive({
      title: "Vue 3 Guide setup",
      author: "abelit",
      year: 2019
    });
    // // or
    // const book = reactive({ title: 'Vue 3 Guide setup', author: "abelit", year: 2019 }) as Book

    const counter = ref(0);
    watch(counter, (newValue, oldValue) => {
      console.log("The new counter value is: " + counter.value);
    });

    const add = () => {
      counter.value++;
      book1.year++;
    };

    return {
      book1,
      counter,
      add
    };
  }
});

export default Component;
</script>
