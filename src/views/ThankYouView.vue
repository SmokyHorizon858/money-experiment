<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const shareStatus = ref('')

async function shareExperiment() {
  const shareData = {
    title: 'The $10 Experiment',
    text: 'Can 10,000 strangers each support one student-run internet experiment with $10?',
    url: window.location.origin,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      shareStatus.value = 'Thanks for sharing the experiment.'
      return
    }

    await navigator.clipboard.writeText(shareData.url)
    shareStatus.value = 'Homepage link copied.'
  } catch (error) {
    if (error?.name !== 'AbortError') {
      shareStatus.value = 'Sharing is unavailable. You can copy the homepage URL instead.'
    }
  }
}
</script>

<template>
  <main class="thank-you-page">
    <div class="thank-you-orbit orbit-one" aria-hidden="true"></div>
    <div class="thank-you-orbit orbit-two" aria-hidden="true"></div>

    <RouterLink class="thank-you-brand" to="/" aria-label="The $10 Experiment home">
      <span class="brand-mark">10</span>
      <span>The $10 Experiment</span>
    </RouterLink>

    <section class="thank-you-card">
      <div class="thank-you-mark" aria-hidden="true">✓</div>
      <p class="eyebrow centered"><span></span>Thank you<span></span></p>
      <h1>You’re part of<br /><em>the experiment.</em></h1>
      <p class="thank-you-intro">
        Thank you for choosing to support The $10 Experiment. This only works
        because real people decide the question is worth exploring.
      </p>

      <div class="thank-you-note">
        <span>What happens next?</span>
        <p>
          I’ll keep building publicly and documenting the results—including what
          works, what fails, and what I learn along the way.
        </p>
      </div>

      <div class="thank-you-actions">
        <RouterLink class="button button-primary" to="/">Return to homepage</RouterLink>
        <button class="button button-quiet" type="button" @click="shareExperiment">
          Share the experiment <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p class="share-status" role="status" aria-live="polite">{{ shareStatus }}</p>
    </section>

    <p class="thank-you-disclosure">
      Voluntary support · Not a charitable donation · Not an investment
    </p>
  </main>
</template>
