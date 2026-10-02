<script setup lang="ts">
import { ref } from 'vue'
import qz from 'qz-tray'

import imgConsole from '@/images/lna-library-error.png'

const isConnected = ref<boolean>(false)

qz.api.showDebug(true)

function doConnection () {
  qz.websocket.connect().then(function() {
     isConnected.value = true
  })
}
</script>

<template>
  <h1>
    QZ-Tray: <a href="https://github.com/qzind/tray/issues/1526" target="_blank">Issue #1526</a> Demonstration
  </h1>
  <p>
    This project is used to illiterate the issues with introducing qz-lna in a Vite build system for Vue + TypeScript.
  </p>
  <h2>
    Project Setup
  </h2>
  <ul>
    <li>
      Used <a href="https://vuejs.org/guide/quick-start.html" target="_blank">Vue's <code>create-vue</code> scaffolding tool</a>.
      <ul>
        <li>
          Options enabled: TypeScript, Router (SPA development), Linter (error prevention)
        </li>
        <li>
          No experimental options were enabled.
        </li>
      </ul>
    </li>
    <li>
      Installed package <code>qz-tray</code>, version 2.3.0, via NPM.
    </li>
    <li>
      Custom <code>qz-tray</code> module definitions, originally based on <a href="https://github.com/qzind/tray/issues/890#issuecomment-1747395720" target="_blank">issue #890</a>
      <ul>
        <li>
          Located: <code>src/@types/qztray.d.ts</code>
        </li>
        <li>
          I've expanded the definitions as new versions came up, but it is not comprehensive.
        </li>
      </ul>
    </li>
  </ul>
  <h2>
    Demonstration of Issue
  </h2>
  <ol>
    <li>
      Open your browser's development console.
    </li>
    <li>
      Click the "Establish Connection" button below.
    </li>
    <li>
      Observe the console warning.
    </li>
  </ol>
  <p>
    <button
      type="button"
      @click="doConnection"
    >
      Establish Connection
    </button>
  </p>
  <p>
    Is Connected: {{ isConnected }}
  </p>
  <h3>
    Error Example
  </h3>
  <p>
    Unable to load LNA library Error: Calling 'require' for "lna" in an environment that doesn't expose the 'require' function. See <a href="https://rolldown.rs/in-depth/bundling-cjs#require-external-modules" target="_blank">https://rolldown.rs/in-depth/bundling-cjs#require-external-modules</a> for more details.
  </p>
  <p>
    <img
      :src="imgConsole"
      class="image-console"
    >
  </p>
</template>

<style scoped lang="css">
.image-console {
  max-height: 200px;
  width: auto;
}
</style>
