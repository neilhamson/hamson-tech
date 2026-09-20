import { ArticleBody, PageShell, pageMetadata } from "../_components/SubpageShell";

export const metadata = pageMetadata(
  "The AI Lie: Are LLMs Artificial Intelligence?",
  "Are LLMs artificial intelligence? Explore how ChatGPT, Claude, Gemini and Grok differ from complete machine intelligence—and why the definition matters.",
  "/articles",
);

export default function ArticlesPage() {
  return (
    <PageShell
      eyebrow="THE AI LIE • 30.08.2026"
      title="ARE LLMS ARTIFICIAL INTELLIGENCE—OR JUST LANGUAGE MODELS?"
      lede={<><p>Dr Neil Hamson</p><p>ChatGPT is called AI. Claude is called AI. Gemini is called AI. Grok is called AI. What exactly is intelligence?</p></>}
      accent="blue"
    >
      <ArticleBody>
        <p>Every technology company now appears to have an “AI.” Every software product is suddenly “AI-powered.” Every investor presentation contains the letters AI. Every corporation wants an AI strategy. Governments are writing AI legislation. Schools are teaching children about AI.</p>
        <p>There is just one question society seems remarkably reluctant to ask: Are LLMs artificial intelligence? That is the question this article examines.</p>
        <p>Because if we ask what intelligence is before asking what products should be allowed to wear the label, something uncomfortable happens. The marketing starts to look considerably less impressive.</p>
        <p>Today’s large language models are extraordinary machines. They can write, translate, summarise, generate software, analyse documents, recognise patterns and increasingly interact with external tools.</p>
        <p>But impressive is not the same thing as intelligent.</p>
        <p>A calculator is impressive compared with mental arithmetic. A search engine is impressive compared with a library catalogue. A jet aircraft is impressive compared with a bird. None of those facts mean that we should deliberately confuse one thing with another.</p>
        <p>And yet that is effectively what we have done with artificial intelligence. We have taken machines that reproduce some outputs associated with intelligence, put the word intelligence on the box, and then gradually rewritten the definition until the product qualifies.</p>
        <p>That should concern us—not because today’s technology is worthless, but because words matter. When words cease to describe reality accurately, technology marketing starts becoming mythology.</p>

        <h2>WHAT DID “ARTIFICIAL INTELLIGENCE” ORIGINALLY MEAN?</h2>
        <p>Go back to the beginning. John McCarthy, one of the founders of the field and the person credited with coining the term artificial intelligence, defined AI as:</p>
        <blockquote>“The science and engineering of making intelligent machines.”</blockquote>
        <p>Not machines that merely produce intelligent-looking sentences. Not prediction engines with convincing interfaces. Intelligent machines.</p>
        <p>McCarthy went further when discussing intelligence itself. He described intelligence in terms of the ability to achieve goals in the world. That distinction is enormously important.</p>
        <p>In 1955, the proposal that led to the Dartmouth research project argued that aspects of learning and intelligence could theoretically be described precisely enough for a machine to simulate them. The project became one of the foundational moments of AI research.</p>
        <p>The ambition was enormous: machines that could learn, reason, solve problems and exhibit genuine aspects of intelligence.</p>
        <p>Somehow, decades later, we have reached a point where generating statistically plausible content can itself satisfy many institutional definitions of an “AI system.” That is not technological progress alone. That is also definition drift.</p>

        <h2>WATCH WHAT HAPPENED TO THE DEFINITION</h2>
        <p>Consider the modern OECD definition. An AI system is now defined as a machine-based system that, for explicit or implicit objectives, infers from its input how to generate outputs including predictions, content, recommendations or decisions.</p>
        <p>Read that carefully: predictions, content, recommendations, decisions.</p>
        <p>Where is understanding required? It isn’t. Where is persistent learning from lived operational experience required? It isn’t. Where is independent verification of reality required? It isn’t.</p>
        <p>Where is an internal model that can reliably distinguish what is true from what merely appears plausible? Where is long-term autonomous goal pursuit? Where is genuine self-correction? None is required.</p>
        <p>NIST provides several definitions under the AI umbrella, some demanding considerably more intelligence-like behaviour than others. One describes systems involving perception, cognition, planning, learning and action. Another encompasses techniques designed merely to approximate a cognitive task. Another covers machine systems making predictions, recommendations or decisions.</p>
        <p>Think about the linguistic trick that creates. At the demanding end: an intelligent machine. At the permissive end: a system approximating a task associated with cognition. Those are not remotely the same technological achievement, yet both can live underneath the same two-letter label.</p>

        <h2>DOING SOMETHING INTELLIGENT IS NOT NECESSARILY BEING INTELLIGENT</h2>
        <p>This should be obvious. A thermostat makes a decision; that does not make it intelligent in the ordinary meaning of intelligence. A GPS system calculates a route vastly faster than a human; that does not make it an artificial mind.</p>
        <p>A chess engine can defeat almost every human alive at chess; that does not mean it understands politics, mathematics, hunger, humour, engineering or why anyone invented chess.</p>
        <p>Specialised competence is not automatically intelligence. Simulation of intelligent behaviour is not automatically intelligence, and producing the linguistic artefacts of reasoning is not necessarily equivalent to possessing the complete machinery of reasoning.</p>
        <p>The most dangerous feature of the modern LLM is also its most impressive: language models can sound extremely intelligent, sometimes more articulate than the humans using them.</p>

        <h2>THE REAL TEST: CAN IT CLOSE THE LOOP?</h2>
        <p>A serious artificial intelligence should operate through a continuous loop:</p>
        <blockquote>Observe → Understand → Reason → Verify → Decide → Act → Measure → Learn → Remember → Adapt</blockquote>
        <p>Now compare that with the conventional chatbot interaction: Prompt → Generate → Response.</p>
        <p>Modern systems are rapidly becoming more sophisticated than that simple description. They increasingly have reasoning mechanisms, browsing, code execution, memory systems, agents and external tools. That is precisely why the next phase is so important. We are beginning to assemble the missing pieces.</p>
        <p>The real achievement of the current era may not be that we finished artificial intelligence. It may be that we finally created several of the components necessary to build it.</p>
        <p>Imagine an artificial system given a difficult objective. It does not simply generate a proposal. It begins by determining what it knows, what it does not know and which uncertainties matter.</p>
        <p>It searches for evidence, evaluates source reliability, creates hypotheses and tries to falsify them. It uses specialised tools, conducts simulations and interacts with external systems where authorised. It observes results.</p>
        <p>If evidence contradicts its original assumption, it changes its conclusion. If an action fails, it analyses why and remembers the failure. The next time it encounters the same situation, its behaviour changes. It can work for hours, days, months or years without losing operational context.</p>
        <p>It understands the difference between: I know. I infer. I suspect. I don’t know. And: I need more evidence before acting.</p>
        <p>ChatGPT is extraordinary. Claude is extraordinary. Gemini is extraordinary. Grok is extraordinary. Calling them language models does not insult them. But machinery capable of producing fragments of intelligent behaviour is not automatically equivalent to a complete intelligence.</p>
        <p>Until then, perhaps the most intelligent thing society can do is stop confusing the label with the achievement.</p>

        <h3>AUTHOR</h3>
        <p>This article was written by Dr Neil Hamson.</p>
      </ArticleBody>
    </PageShell>
  );
}
