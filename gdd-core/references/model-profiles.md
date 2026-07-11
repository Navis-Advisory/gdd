# Model profiles

<!-- TODO(post-MVP): tiered model routing per agent (GSD pattern:
profile → agent → model tier → runtime-native id, stored in
.diligence/config.json). For the MVP every agent inherits the session
model; commands omit the model parameter. This file exists so the
indirection point is fixed and referenced from day one. -->

MVP behavior: all agents inherit the invoking session's model. Do not pass
a `model` argument when spawning agents.
