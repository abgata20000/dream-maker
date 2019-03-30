<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal__window">
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
