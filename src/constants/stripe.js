const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_hNgdH0fbZayRf2mTwFlW5nH300ksPDl1YQ'

export default STRIPE_PUBLISHABLE
