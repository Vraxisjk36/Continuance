# CONTINUANCE: JANUS PROTOCOL

Psychological horror puzzle game. Android release preparation repository.

## Monetization
- Trials I–IV: free
- Trials V–XII and hidden story content: one-time full-protocol unlock via Google Play Billing
- Proposed South African price: R49.99 (configured later in Play Console)
- No ads

## Build approach
The existing browser alpha will be packaged with Capacitor for Android. Android purchases must be verified through Play Billing; a local browser flag is **not** a payment entitlement.

## Release checklist
1. Import and preserve the tested public-alpha HTML source.
2. Integrate the Trial IV / V purchase boundary without altering Trial IV's permanent choice.
3. Add Google Play Billing integration, purchase restoration and secure entitlement handling.
4. Test all trials, save/resume, keyboard, haptics, audio, navigation and cutouts.
5. Configure signing and release an internal-testing AAB.

**Status:** Initial Android repository scaffold. Not yet Play Store ready.
