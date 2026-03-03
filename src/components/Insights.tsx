const articles = [
  {
    tag: 'System 1',
    title: "Women's Wellbeing: The Heuristic Trap",
    body: "Society's System 1 assigns women a default role\u2014caretaker, mediator, emotional regulator. The cognitive cost of overriding that heuristic is real, measurable, and systematically ignored.",
  },
  {
    tag: 'Systemic Bias',
    title: 'Equality: A Bias Audit',
    body: 'The belief in a just world is itself a cognitive bias. Systemic inequality persists not despite our thinking, but because of it.',
  },
  {
    tag: 'The Remembering Self',
    title: 'PTSD: Two Selves at War',
    body: 'Trauma splits the experiencing self from the remembering self. Recovery is the slow work of reintegrating what your mind was forced to separate.',
  },
  {
    tag: 'System 1 / System 2',
    title: 'When Survival Thinks for You',
    body: "Your survival brain doesn't deliberate\u2014it reacts. Understanding that your triggers are System 1 errors, not character flaws, changes the equation entirely.",
  },
  {
    tag: 'Loss Aversion',
    title: 'Cognitive Reframing: Correcting the Ledger',
    body: "We feel losses twice as intensely as equivalent gains. Reframing isn't positive thinking\u2014it's correcting a predictable error in your mental accounting.",
  },
  {
    tag: 'Predictive Coding',
    title: 'Attachment: Updating the Model',
    body: 'Your brain builds a model of relationships from the earliest data it receives. Insecure attachment is not damage\u2014it is a prediction that can be updated.',
  },
  {
    tag: 'System 2',
    title: 'Emotional Regulation: The Override Function',
    body: 'System 2 can override System 1, but the process is slow and effortful. Regulation is not suppression\u2014it is learning when to engage the slower system.',
  },
  {
    tag: 'Decision Architecture',
    title: 'Boundaries: Pre-Commitment Devices',
    body: 'A boundary is a pre-commitment device. It removes the need for in-the-moment deliberation, where System 1 will almost always concede.',
  },
  {
    tag: 'The Focus Illusion',
    title: 'Burnout: The Illusion of Importance',
    body: 'Nothing in life is as important as you think it is while you are thinking about it. Burnout is the neurological cost of a focus illusion left uncorrected.',
  },
  {
    tag: 'Neuroplasticity',
    title: 'Your Brain Rewrites Its Own Code',
    body: "Your brain is a prediction machine that updates its own wiring. The question was never whether you can change\u2014it's whether you'll direct the process.",
  },
]

export default function Insights() {
  return (
    <section id="insights" className="py-28 md:py-36 px-6 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-medium text-cool-grey tracking-widest uppercase mb-4">
            Insights
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-blue font-medium mb-4">
            The Kahneman Library
          </h2>
          <p className="text-slate-blue/60 max-w-lg mx-auto">
            Where cognitive science meets clinical practice. System 1 reacts. System 2 reads.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {articles.map((a, i) => (
            <article
              key={i}
              className="group bg-cream border border-slate-blue/6 rounded-2xl p-7 md:p-8 hover:shadow-lg hover:shadow-slate-blue/5 transition-all duration-300 flex flex-col"
            >
              <span className="inline-block self-start text-xs font-medium tracking-wide text-cool-grey bg-peach/60 px-3 py-1 rounded-full mb-5">
                {a.tag}
              </span>

              <h3 className="font-serif text-lg md:text-xl text-slate-blue font-medium leading-snug mb-3">
                {a.title}
              </h3>

              <p className="text-sm text-slate-blue/60 leading-relaxed">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
