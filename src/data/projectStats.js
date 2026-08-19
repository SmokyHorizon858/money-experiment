// This is the single source of truth for the public experiment numbers.
// Only enter verified payments and supporters who explicitly agreed to be public.
export const projectStats = {
  supporterCount: 0,
  amountRaised: 0,
  supporterGoal: 10_000,
  amountGoal: 100_000,
  contributionAmount: 10,
  currency: 'USD',

  // Keep demo entries hidden on the public site.
  showDemoSupporters: false,

  // Example entry (do not add anyone without their explicit permission):
  // { id: 1, name: 'Alex', country: 'Australia', symbol: 'AU' }
  publicSupporters: [],
}
