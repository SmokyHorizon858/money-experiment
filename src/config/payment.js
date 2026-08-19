const configuredLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK?.trim()

function isStripePaymentLink(value) {
  if (!value) return false

  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'buy.stripe.com'
  } catch {
    return false
  }
}

export const stripePaymentLink = isStripePaymentLink(configuredLink) ? configuredLink : null
export const isPaymentReady = Boolean(stripePaymentLink)
