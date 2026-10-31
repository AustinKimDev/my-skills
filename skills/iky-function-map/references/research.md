# Research notes

Checked 2026-10-31. Practitioner guidance unless stated; none of it measures this skill.

- Capability and process are separate views. A capability says what and has no sequence; a process says how, in order. They link many to many, and detailed process mapping goes where improvement is funded. Sources are vendor and practitioner glossaries.
- Feature parity is a named failure pattern. Martin Fowler's legacy displacement patterns list it as a common cause of failure, and its steps are: understand outcomes, break the problem into parts, deliver in parts. https://martinfowler.com/articles/patterns-legacy-displacement/
- Gradual replacement lowers the risk of a long effort that delivers little until the end. https://martinfowler.com/bliki/StranglerFigApplication.html
- Thoughtworks calls feature parity an antipattern and uses usage data to decide what to keep, weighed with cost and value. https://www.thoughtworks.com/en-us/insights/blog/breaking-out-of-legacy-nine-lessons-for-business-leaders-part-3
- No authoritative method for internal-tool redesign turned up. Case studies repeat one pattern: map workflows and workarounds, talk to operators, quantify friction, redesign around real paths.
- Reports lead with the answer, then 2 to 4 supporting arguments, then evidence (Minto pyramid). https://untools.co/minto-pyramid/ and https://nesslabs.com/?p=9829
- Capability heat maps show one attribute per view, state what each color means, and keep the underlying value. https://if4it.org/best-practices/designing-building-and-maintaining-comprehensive-and-usable-enterprise-capability-models/use-enterprise-capability-models-for-assessment-health-checks-and-heatmaps/
- Service blueprints tie each step to its evidence and look for root causes in the gaps between departments. https://www.nngroup.com/articles/service-blueprints-definition/
- Swimlane maps stay readable at about five or six lanes and show every crossing. The difference between the current and future maps is the action plan. https://www.guidejar.com/blog/10-process-mapping-best-practices
- Review panels: independent answers plus aggregation give most of the gain, and debate risks conformity. Persona detail adds little to factual accuracy and can hurt. https://arxiv.org/pdf/2508.17536 and https://arxiv.org/pdf/2508.19764
- Skill structure follows Anthropic's authoring guide: third-person description with triggers, body under 500 lines, references one level deep, checklists, validators, evaluations. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
