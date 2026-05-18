# Content Audit (Needs Verification)

Date: 2026-04-28

This file marks fields that should be checked for актуальность and consistency.
No factual content was changed yet.

## Program/category mapping

- `Immigration Programs -> Citizenship by Investment`:
  country list includes `Slovenia`, which may not match the category semantics.
  Reference: `src/app/App.tsx` (program card and citizenship list blocks).
- `countries[] -> programType/programTypeRU`:
  country-level tags should be re-checked against the actual offer matrix.
  Reference: `src/app/App.tsx` (`const countries`).

## Address consistency

- `content.RU.address` / `content.EN.address` values should be validated against legal address used in Privacy Policy.
  References:
  - `src/app/App.tsx` (`content` object address fields)
  - `src/app/App.tsx` (`Privacy Policy` legal address block)

## Time-sensitive numbers and claims

The following pages contain numeric/legal claims that are likely time-sensitive and must be verified:

- Mexico program page (e.g. passport access counts, thresholds and timelines)
- Chile program page (e.g. rankings, timelines, migration requirements)
- Uruguay program page (e.g. processing times, visa-free counts, citizenship timelines)
- Panama program page (e.g. threshold amounts, timeline to PR)
- São Tomé and Príncipe program page (thresholds, process durations)
- Vanuatu program page (visa-free countries and current mobility statement)

Reference: country detail sections in `src/app/App.tsx`.

## Footer/legal metadata

- Footer year is hardcoded to `2023`; requires update policy decision.
  Reference: footer blocks in `src/app/App.tsx`.
