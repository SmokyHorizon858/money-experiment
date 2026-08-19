<script setup>
import { computed } from 'vue'
import { projectStats } from '../data/projectStats.js'
import { isPaymentReady, stripePaymentLink } from '../config/payment.js'

const numberFormatter = new Intl.NumberFormat('en-US')
const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: projectStats.currency,
  maximumFractionDigits: 0,
})

const formattedSupporterCount = computed(() => numberFormatter.format(projectStats.supporterCount))
const formattedSupporterGoal = computed(() => numberFormatter.format(projectStats.supporterGoal))
const formattedAmountRaised = computed(() => moneyFormatter.format(projectStats.amountRaised))
const formattedAmountGoal = computed(() => moneyFormatter.format(projectStats.amountGoal))
const progressPercent = computed(() => {
  if (projectStats.supporterGoal <= 0) return 0
  return Math.min((projectStats.supporterCount / projectStats.supporterGoal) * 100, 100)
})
const progressLabel = computed(() =>
  projectStats.supporterCount === 0 ? 'Starting from zero' : `${progressPercent.value.toFixed(2)}% complete`,
)

const steps = [
  { number: '01', icon: '⌁', title: 'I build in public', text: 'I document the experiments, decisions, results, and lessons—including what does not work.' },
  { number: '02', icon: '$', title: 'You choose to support', text: 'If the question interests you, you can voluntarily contribute a one-time US$10 payment.' },
  { number: '03', icon: '↗', title: 'The experiment continues', text: 'Support helps fund the tools, learning, and time needed to keep building and testing ideas.' },
]

const fundUses = ['Hosting & domains', 'AI APIs & software', 'Development & experiments', 'Learning resources', 'Future technology projects', 'Time spent building']

const demoSupporters = [
  { id: '#001', name: 'Your name', place: 'Your country', symbol: '↗' },
  { id: '#002', name: 'Anonymous', place: 'Somewhere online', symbol: '◎' },
  { id: '#003', name: 'Future supporter', place: 'Around the world', symbol: '✦' },
]

const wallEntries = computed(() => {
  if (projectStats.showDemoSupporters) return demoSupporters

  return projectStats.publicSupporters.map((supporter, index) => ({
    id: `#${String(supporter.id ?? index + 1).padStart(3, '0')}`,
    name: supporter.name || 'Anonymous',
    place: supporter.country || 'Location private',
    symbol: supporter.symbol || '✦',
  }))
})

const faqs = [
  { question: 'Is this a charity?', answer: 'No. This is an independent, student-run internet and technology experiment. Payments are voluntary support and are not tax-deductible charitable donations.' },
  { question: 'Is my $10 an investment?', answer: 'No. Supporting the experiment does not give you ownership, equity, financial returns, or a claim on future projects.' },
  { question: 'What happens to the money?', answer: 'It supports me and the experiment: technology costs, project expenses, learning, development, reasonable time spent building, and future technology projects.' },
  { question: 'What if it never reaches 10,000 people?', answer: 'Then that result becomes part of the experiment. It may stop at ten supporters—or one. There is no guarantee the target will be reached.' },
  { question: 'Can I support anonymously?', answer: 'Your payment details will remain private. Public recognition will only happen with explicit permission; appearing on the wall will always be optional.' },
]
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="The $10 Experiment home"><span class="brand-mark">10</span><span>The $10 Experiment</span></a>
      <nav aria-label="Main navigation"><a href="#experiment">The experiment</a><a href="#transparency">Transparency</a><a href="#faq">FAQ</a></nav>
      <a class="header-cta" :href="isPaymentReady ? stripePaymentLink : '#support'">Support · $10</a>
    </header>

    <main id="top">
      <section class="hero section-pad">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-copy reveal">
          <p class="eyebrow"><span></span>A public student experiment</p>
          <h1>Can {{ formattedSupporterGoal }} strangers back one idea with <em>${{ projectStats.contributionAmount }} each?</em></h1>
          <p class="hero-intro">I’m a university IT student testing whether software, AI, storytelling, and the internet can turn thousands of small, voluntary acts of support into something much bigger.</p>
          <div class="hero-actions">
            <a class="button button-primary" :href="isPaymentReady ? stripePaymentLink : '#support'">Become a supporter — ${{ projectStats.contributionAmount }} <span aria-hidden="true">↗</span></a>
            <a class="button button-quiet" href="#experiment">Read the experiment ↓</a>
          </div>
          <p class="hero-note">One-time voluntary support · Not a charity or investment</p>
        </div>

        <aside id="support" class="progress-card reveal reveal-delay" aria-label="Experiment progress">
          <div class="progress-topline"><span>Live progress</span><span class="live-pill"><i></i>{{ progressLabel }}</span></div>
          <div class="supporter-total"><strong>{{ formattedSupporterCount }}</strong><span>/ {{ formattedSupporterGoal }}<br />supporters</span></div>
          <div class="progress-track" role="progressbar" aria-label="Supporter goal progress" aria-valuemin="0" :aria-valuemax="projectStats.supporterGoal" :aria-valuenow="projectStats.supporterCount"><span :style="{ width: `${progressPercent}%` }"></span></div>
          <div class="money-row">
            <div><span>Raised so far</span><strong>{{ formattedAmountRaised }}</strong></div>
            <div class="goal-figure"><span>Theoretical goal</span><strong>{{ formattedAmountGoal }}</strong></div>
          </div>
          <div class="equation"><span>{{ formattedSupporterGoal }} people</span><b>×</b><span>US${{ projectStats.contributionAmount }}</span><b>=</b><span>one unlikely experiment</span></div>
          <a v-if="isPaymentReady" class="button button-card button-card-ready" :href="stripePaymentLink">Become a supporter — ${{ projectStats.contributionAmount }}</a>
          <button v-else class="button button-card" type="button" disabled title="Add a valid Stripe Payment Link to .env">Become a supporter — ${{ projectStats.contributionAmount }}</button>
          <p class="setup-note">{{ isPaymentReady ? 'Secure one-time checkout hosted by Stripe.' : 'Checkout remains disabled until your Stripe link is configured.' }}</p>
        </aside>
      </section>

      <section id="experiment" class="question section-pad">
        <div class="section-label">01 · The question</div>
        <div class="question-grid">
          <h2>It started with a slightly strange question.</h2>
          <div class="story-copy">
            <p>We live in a moment when one person can build software, communicate globally, and reach people who were once impossible to contact.</p>
            <p>Could an ordinary student start at zero and convince 10,000 strangers to voluntarily support a technology experiment with $10 each? Instead of only wondering, I decided to test it in public.</p>
            <blockquote>“There is no guarantee this works. That uncertainty is the point.”</blockquote>
          </div>
        </div>
      </section>

      <section class="how section-pad">
        <div class="section-heading">
          <div><div class="section-label">02 · How it works</div><h2>Simple by design.</h2></div>
          <p>No complicated reward tiers. No financial promises. Just a public question and an honest attempt to answer it.</p>
        </div>
        <div class="step-grid">
          <article v-for="step in steps" :key="step.number" class="step-card">
            <span>{{ step.number }}</span><div class="step-icon" aria-hidden="true">{{ step.icon }}</div><h3>{{ step.title }}</h3><p>{{ step.text }}</p>
          </article>
        </div>
      </section>

      <section id="transparency" class="transparency section-pad">
        <div class="transparency-panel">
          <div class="transparency-copy">
            <div class="section-label light">03 · Where the money goes</div>
            <h2>Support for the experiment—and the person building it.</h2>
            <p>Contributions are not locked to a rigid budget. They help fund the practical costs of this project, my continued learning, and future technology work.</p>
            <ul class="use-list"><li v-for="item in fundUses" :key="item"><span>✓</span>{{ item }}</li></ul>
          </div>
          <div class="truth-card">
            <span class="truth-icon">!</span><p class="truth-kicker">Plain-English disclosure</p><h3>This is not a registered charity.</h3>
            <p>Payments are voluntary support for an independent student-run internet experiment. They are not charitable donations and are not tax-deductible.</p>
            <p>Supporters receive no equity, ownership, financial return, or guarantee of future value.</p>
          </div>
        </div>
      </section>

      <section class="wall section-pad">
        <div class="section-heading wall-heading">
          <div><div class="section-label">04 · The wall of 10,000</div><h2>A record of everyone who chooses to take part.</h2></div>
          <div v-if="projectStats.showDemoSupporters" class="demo-badge">Design preview · Not real supporters</div>
          <div v-else class="demo-badge">{{ projectStats.publicSupporters.length }} public supporters</div>
        </div>
        <div v-if="wallEntries.length" class="supporter-grid">
          <article v-for="supporter in wallEntries" :key="supporter.id" class="supporter-card">
            <span class="supporter-symbol">{{ supporter.symbol }}</span><div><span>{{ supporter.id }}</span><h3>{{ supporter.name }}</h3><p>{{ supporter.place }}</p></div>
          </article>
        </div>
        <div v-else class="empty-wall">The wall is waiting for its first public supporter.</div>
        <p class="wall-note">Nobody will be named publicly without explicit permission.</p>
      </section>

      <section id="faq" class="faq section-pad">
        <div class="faq-intro"><div class="section-label">05 · Honest answers</div><h2>Questions you should ask.</h2><p>Transparency is not a footnote—it is the foundation of the experiment.</p></div>
        <div class="faq-list">
          <details v-for="(faq, index) in faqs" :key="faq.question" :open="index === 0"><summary>{{ faq.question }}<span aria-hidden="true">+</span></summary><p>{{ faq.answer }}</p></details>
        </div>
      </section>

      <section class="closing section-pad">
        <p class="eyebrow centered"><span></span>Start with the first ten</p><h2>Maybe it fails.<br /><em>Let’s find out.</em></h2>
        <p>The immediate goal is not 10,000 people. It is ten genuine strangers who think the question is worth $10.</p>
        <a class="button button-primary" href="#support">See current progress ↑</a>
      </section>
    </main>

    <footer>
      <a class="brand" href="#top"><span class="brand-mark">10</span><span>The $10 Experiment</span></a>
      <p>Built in public by one curious student in Australia.</p><p>© {{ new Date().getFullYear() }} · Not a charity · Not an investment</p>
    </footer>
  </div>
</template>
