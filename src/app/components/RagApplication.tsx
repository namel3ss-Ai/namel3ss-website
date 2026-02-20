import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const ragAppCode = `spec is "1.0"

use preset "rag_chat":
  title is "Assistant"
  model is "gpt-4o-mini"
  answer_template is "summary_keypoints_recommendation_with_citations"`;

const runCommands = [
  "cd apps/rag-application",
  "n3 check app.ai",
  "n3 run app.ai --port 7360 --no-open",
];

export function RagApplication() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rag-application" ref={ref} className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl mb-6">RAG Application</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            End-to-end RAG with uploads, indexing, grounded answers, and citations.
            Built in a compact `app.ai`.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-8"
          >
            <h3 className="text-2xl md:text-3xl mb-5">app.ai</h3>
            <pre className="bg-black text-white rounded-xl p-5 overflow-x-auto text-sm md:text-base leading-relaxed">
              <code>{ragAppCode}</code>
            </pre>
            <a
              href="https://github.com/namel3ss-Ai/namel3ss/blob/main/apps/rag-application/app.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-base text-gray-700 hover:text-black underline"
            >
              View full example in repository
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-8"
          >
            <h3 className="text-2xl md:text-3xl mb-5">Run</h3>
            <div className="space-y-4 mb-8">
              {runCommands.map((command) => (
                <code
                  key={command}
                  className="block bg-black text-white rounded-xl px-4 py-3 text-sm md:text-base"
                >
                  {command}
                </code>
              ))}
            </div>

            <h4 className="text-xl mb-4">Flow</h4>
            <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700 leading-relaxed">
              <li>Upload PDF or text files.</li>
              <li>Run ingestion/indexing.</li>
              <li>Ask a question in chat.</li>
              <li>Open inline citations and source snippets.</li>
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
