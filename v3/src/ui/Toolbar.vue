<script setup lang="ts">
const props = defineProps<{
  previewMode: boolean;
  editMode: boolean;
}>();

const emit = defineEmits<{
  (event: 'undo'): void;
  (event: 'redo'): void;
  (event: 'togglePreview'): void;
  (event: 'toggleEdit'): void;
  (event: 'openStructure'): void;
}>();
</script>

<template>
  <div class="top-tools-bar">
    <div class="tools-row">
      <div class="tools-cell">
        <button type="button" class="link" title="ctrl + z" @click="emit('undo')">Undo</button>
        <button type="button" class="link" @click="emit('redo')">Redo</button>
      </div>

      <div class="tools-cell">
        <button type="button" class="link" @click="emit('togglePreview')">
          {{ props.previewMode ? 'Desktop' : 'Mobile' }} Mode
        </button>
      </div>

      <div class="tools-cell">
        <button
          type="button"
          class="link"
          :class="{ 'link--danger': !props.editMode }"
          @click="emit('toggleEdit')"
        >
          {{ props.editMode ? 'View' : 'Edit' }} Mode
        </button>
      </div>

      <div class="tools-cell tools-cell--wide">
        <button type="button" class="link" @click="emit('openStructure')">
          Inspect Components Structure
        </button>
      </div>

      <div class="tools-cell tools-cell--end">
        <a
          class="star"
          href="https://github.com/sahadev/vue-component-creater-ui"
          target="_blank"
          rel="noreferrer"
        >
          ★ Star
        </a>
      </div>
    </div>

    <a
      class="github-corner"
      href="https://github.com/sahadev/vue-component-creater-ui"
      target="_blank"
      rel="noreferrer"
      aria-label="View source on GitHub"
    >
      <svg width="40" height="40" viewBox="0 0 250 250" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" class="corner-fill" />
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          class="octo-arm"
        />
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          class="octo-body"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.top-tools-bar {
  position: relative;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
}

.tools-row {
  display: flex;
  align-items: center;
  gap: 22px;
}

.tools-cell {
  display: flex;
  gap: 6px;
  white-space: nowrap;
}

.tools-cell--wide {
  flex: 1;
}

.tools-cell--end {
  margin-right: 48px;
}

.link {
  border: 0;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: #409eff;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.link--danger {
  color: #f56c6c;
}

.star {
  font-size: 13px;
  color: #606266;
  text-decoration: none;
  border: 1px solid var(--vcc-border);
  border-radius: 4px;
  padding: 2px 8px;
}

.star:hover {
  border-color: #4dba87;
  color: #4dba87;
}

.github-corner {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
}

.corner-fill {
  fill: #151513;
}

.octo-arm,
.octo-body {
  fill: #fff;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}
</style>
