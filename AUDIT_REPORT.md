# Learn Arabic — Full Matrix Audit (2026-11-05)

## Scope
Single-page Riyadh/Najdi Arabic teaching application, index.html.
8 persons × 12 conditions × 2 constructions × 4 aspects × 3 tenses = **2,304 generated examples**.

## Executed checks
1. **JavaScript compilation and initialization:** inline script compiled and executed with a mocked DOM, no initialization errors.
2. **Complete generator audit:** window.auditNajdiExamples() executed on all 2,304 examples; **0 issues** reported after corrections.
3. **Semantic regression checks across the complete matrix:** Urdu pronoun oblique-case agreement, ability/desire/permission/probability conjugations, conditional markers and outcomes, future not-yet completion, negative-duration gender agreement, and tense-specific time expressions.
4. **Render smoke tests:** all 8 persons × 13 condition selector values (all + 12 individual conditions) = **104 render invocations**, no exceptions with a simulated DOM.
5. **UI event wiring:** person, condition, language, and close handlers registered.

## Corrections made during this audit
- Fixed ungrammatical Urdu modal phrases such as “تم کے لیے” → “تمہارے لیے”, including all eight persons.
- Fixed Urdu probability agreement such as “شاید تم ... کرے” → “شاید تم ... کرو”.
- Distinguished past “گزشتہ روز” from future “کل” in modal translations.
- Added regression checks for these classes of errors.

## Not yet verified
- **Actual mobile/browser layout and tap behavior** (mock DOM is not a browser).
- **Arabic speech playback**, device voice availability, audio pronunciation, or speech-synthesis engine behavior.
- **Native Najdi speaker review** of all generated combinations. Automated checks cannot certify that all 2,304 sentences sound natural.
- **GitHub Pages deployment** after the latest commits.

## Important pedagogical caveat
The four English-style aspects do not always map to distinct natural Najdi constructions. Some generated cells intentionally collapse into the same everyday phrasing. “Nonagent” includes resultative forms and unspecified-agent active clauses; it is not a formal passive-voice paradigm.

Status: **Automated structural and selected semantic checks passed; human linguistic and real-device testing outstanding.**
