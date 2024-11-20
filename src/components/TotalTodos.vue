<template>
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3 items-center">
      <div class="col text-grey-7 text-h6">Total:</div>
      <div class="col text-h6 text-right">{{ storeTodos.total }}</div>
    </div>
  </template>
  
  <script setup>
  import { useStoreTodos } from "src/stores/storeTodos";
  
  const storeTodos = useStoreTodos();
  </script>
  