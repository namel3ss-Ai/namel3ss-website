import { motion } from "motion/react";

export function DocumentationSection() {
  return (
    <section className="min-h-screen bg-white py-32 px-6 md:px-12" data-section="documentation">
      <div className="max-w-[900px] mx-auto w-full">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[56px] md:text-[72px] tracking-[-0.042em] leading-[0.95] mb-8 font-semibold text-black"
        >
          Learning namel3ss 0.1.0
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[20px] md:text-[24px] tracking-[-0.015em] leading-[1.4] text-black/48 mb-20"
        >
          The Definitive Guide
        </motion.p>

        {/* Content */}
        <div className="prose-namel3ss space-y-16">
          
          {/* Preface */}
          <Section title="Preface">
            <p>
              Welcome to Learning namel3ss 0.1.0, your comprehensive guide to namel3ss (pronounced nameless), the world's first English‑first, AI‑native, full‑stack programming language, built from the ground up to support AI. namel3ss lets you build real applications by describing your intent in clear, structured English. Instead of juggling multiple languages, frameworks, prompts and orchestration libraries, you define your entire app in a single .ai file. namel3ss then compiles it into a validated intermediate representation (IR) and runs it in a deterministic runtime where AI boundaries are explicit and inspectable.
            </p>
            <p>
              As you'll see, namel3ss is a fundamentally new way to build software. Throughout this guide you will learn the language grammar, explore its full‑stack capabilities, write flows, define records, create pages, integrate AI, orchestrate multiple agents, and work with the CLI and Studio tools. This book also defines every term used in the language and its runtime.
            </p>
            <p className="text-black/48">
              This book covers namel3ss version 0.1.0. Future versions may introduce new features, but the core concepts you learn here will remain valuable.
            </p>
          </Section>

          {/* Part I */}
          <Section title="Part I: Introduction to namel3ss">
            <h3>What is namel3ss?</h3>
            <p>
              namel3ss is an English‑first DSL (domain‑specific language) designed to build full‑stack, AI‑native applications by describing intent in structured English. The language allows you to define:
            </p>
            <ul>
              <li><strong>Applications</strong> — the overarching programs consisting of flows, records, pages, AI profiles, tools and agents.</li>
              <li><strong>Data models (records)</strong> — declarative schemas for storing data with built‑in validation rules.</li>
              <li><strong>Backend logic (flows)</strong> — procedural sequences of statements that manipulate state, call AI profiles, run agents, save or load records and control program flow.</li>
              <li><strong>User interfaces (pages)</strong> — declarative UIs containing titles, text, forms, tables and buttons that connect to your flows and records.</li>
              <li><strong>AI behaviour</strong> — profiles describing models, memory, tools and system prompts, and statements (ask ai) to call them.</li>
              <li><strong>Multi‑agent orchestration</strong> — structures for running multiple agents sequentially or in parallel, with guardrails and tracing.</li>
              <li><strong>Validation and explainable errors</strong> — comprehensive compile‑time and runtime validation with human‑friendly error messages.</li>
            </ul>
            <p>
              Everything lives in a single .ai file that reads like a well‑structured specification. namel3ss is to the AI era what Python was to the web era — a language that makes building complex systems accessible to many.
            </p>

            <h3>Vision and Philosophy</h3>
            <p>namel3ss is built on a few key principles:</p>
            <ul>
              <li><strong>English‑first</strong> — The language uses plain English keywords and statements. You shouldn't need to learn obscure symbols to express logic.</li>
              <li><strong>AI is explicit, inspectable and bounded</strong> — AI calls, memory and tool usage are never hidden. You always see what's happening, and the system enforces limits on calls to prevent runaway behaviour.</li>
              <li><strong>Deterministic runtime</strong> — The only non‑deterministic component is the AI model itself. Everything else is fully deterministic, so you can reason about state, loops and branches without surprises.</li>
              <li><strong>Full‑stack in one language</strong> — namel3ss covers backend logic, data modelling, user interfaces and AI integration in one coherent DSL. There is no need to switch languages or coordinate between layers.</li>
              <li><strong>Strong validation</strong> — Mistakes are caught early. The compiler checks grammar, naming, references and types; the runtime validates data and returns structured errors; the linter warns about violations of best practices.</li>
              <li><strong>Tooling</strong> — A robust CLI, formatter, linter and Studio provide professional developer workflows. You can parse, validate, run, format, lint, inspect and even visually edit your code safely.</li>
            </ul>

            <h3>How namel3ss differs from other approaches</h3>
            <p>
              Traditional software development uses different languages and frameworks for backend, frontend and AI. Prompt engineering happens in ad‑hoc strings and orchestration is handled by separate libraries. By contrast, namel3ss combines everything into one environment. There is no hidden logic or magic functions. AI profiles, memory, tools and agent calls are just part of your structured program. This eliminates the need for glue code and reduces cognitive load.
            </p>
          </Section>

          {/* Part II */}
          <Section title="Part II: Getting Started">
            <h3>Requirements</h3>
            <p>To run namel3ss, you need Python 3.10 or newer. namel3ss is installed via pip:</p>
            <CodeBlock>pip install namel3ss</CodeBlock>
            <p>After installation, a command‑line tool n3 becomes available. The CLI is English‑ish and file‑centric. It supports actions like checking your code, running flows, inspecting the UI manifest, formatting code, linting, listing available actions, scaffolding new projects and launching the Studio.</p>

            <h3>Your first program</h3>
            <p>Create a file named hello.ai with the following content:</p>
            <CodeBlock>{`record "Greeting":
 field "message" is text present

page "home":
 title is "Hello"
 text is "This is your first namel3ss app"
 form is "Greeting"
 table is "Greeting"
 button "Seed":
  calls flow "seed_greetings"

flow "seed_greetings":
 save Greeting {
  message is "Welcome to namel3ss!"
 }
 return "Seeded"`}</CodeBlock>
            <p>This simple program defines a record Greeting, a page with a form and table for that record, and a flow seed_greetings that populates the store with one record. To run it:</p>
            <CodeBlock>n3 hello.ai</CodeBlock>
            <p>Since there is only one flow, the CLI automatically runs seed_greetings and prints a JSON response including the updated state and traces. You can inspect the user interface with:</p>
            <CodeBlock>n3 hello.ai ui</CodeBlock>
            <p>And see the list of actions with:</p>
            <CodeBlock>n3 hello.ai actions</CodeBlock>
            <p>Finally, to interact visually, launch the Studio:</p>
            <CodeBlock>n3 hello.ai studio</CodeBlock>
            <p>The Studio opens a local web UI where you can view pages, see actions, execute them, inspect state and traces, and make safe edits.</p>

            <h3>Creating new projects with templates</h3>
            <p>To scaffold a new project quickly, use the n3 new command. For example, to create a CRUD dashboard:</p>
            <CodeBlock>{`n3 new crud my_app
cd my_app
n3 app.ai studio`}</CodeBlock>
            <p>The project directory contains an app.ai file and a README.md with instructions. The crud template includes a record with validation and a page with forms and tables. namel3ss also provides templates for an AI assistant over records and a multi‑agent workflow.</p>
          </Section>

          {/* Part III */}
          <Section title="Part III: Project Structure">
            <p>A typical namel3ss project contains:</p>
            <CodeBlock>{`my_app/
 app.ai   # Main program
 .env     # Optional local environment variables (ignored by Git)
 README.md`}</CodeBlock>
            <p>Large codebases may have multiple .ai files, each under 500 LOC. The CI checks line limits and single responsibility. Test files mirror the source structure in a tests/ directory (e.g. tests/lexer/test_tokens.py).</p>

            <h3>Config and Secrets</h3>
            <p>Provider configuration and secrets live outside your .ai file. Use a .env file next to app.ai or export environment variables. For example, to use OpenAI, create .env with:</p>
            <CodeBlock>OPENAI_API_KEY=sk-xxxxxx</CodeBlock>
            <p>The .ai file refers to this key via env "OPENAI_API_KEY" in the AI profile. The runtime loads .env automatically and falls back to ~/.namel3ss/config.json. Real environment variables take precedence over values in .env.</p>
          </Section>

          {/* Part IV */}
          <Section title="Part IV: Language Grammar">
            <h3>Declarations</h3>
            <p>Declarations introduce top‑level entities. They never use the word is.</p>
            <ul>
              <li><code>flow "name":</code> — Defines a backend logic unit.</li>
              <li><code>record "Name":</code> — Declares a data model with fields and constraints.</li>
              <li><code>page "name":</code> — Declares a user interface page.</li>
              <li><code>ai "name":</code> — Defines an AI profile.</li>
              <li><code>agent "name":</code> — Declares an agent for multi‑agent orchestration.</li>
              <li><code>tool "name":</code> — Declares an external tool (rarely used directly).</li>
            </ul>
            <p>Each declaration uses a colon to start its block and is followed by indented properties or statements. For example:</p>
            <CodeBlock>{`record "User":
 field "email" is text present unique pattern "^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$"
 field "name" is text present

flow "create_user":
 save User {
  email is input.email
  name is input.name
 }
 return "User created"`}</CodeBlock>

            <h3>Variables and Constants</h3>
            <p>Variables hold values in flows and are defined with let or set. Constants are immutable after assignment.</p>
            <CodeBlock>{`let count is 0
let VAT is 0.21 constant
set count is count + 1`}</CodeBlock>
            <ul>
              <li><strong>let</strong> — Creates a new variable.</li>
              <li><strong>set</strong> — Mutates an existing variable.</li>
              <li><strong>constant</strong> — Optional keyword that marks the variable as immutable.</li>
            </ul>

            <h3>Control Flow Statements</h3>
            <p>namel3ss provides several control flow constructs:</p>
            <CodeBlock>{`if x is greater than 10:
 set result is "big"
else:
 set result is "small"

repeat up to 5:
 set sum is sum + 1

for each item in list:
 save Record {
  value is item
 }

match status:
 when "pending":
  set message is "Pending"
 when "complete":
  set message is "Done"
 otherwise:
  set message is "Unknown"

try:
 save Record {
  field is value
 }
catch error:
 return error`}</CodeBlock>
          </Section>

          {/* Part V */}
          <Section title="Part V: Data Modelling & Persistence">
            <h3>Declaring a Record</h3>
            <p>Use the record keyword:</p>
            <CodeBlock>{`record "User":
 field "email" is text present unique pattern "^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$"
 field "name" is text present
 field "age" is int gt 0`}</CodeBlock>
            <ul>
              <li><strong>field "name"</strong> — Declares a field with a type and constraints.</li>
              <li><strong>Types</strong> — text, int, float, bool, date, datetime.</li>
              <li><strong>Constraints</strong> — present (required), unique, gt, lt, pattern, length (min/max), etc.</li>
            </ul>

            <h3>Saving and Finding Records</h3>
            <p>In flows, you use the save statement to insert or update records:</p>
            <CodeBlock>{`save User {
 email is input.email
 name is input.name
 age is input.age
}`}</CodeBlock>
            <p>To retrieve records, use the find statement:</p>
            <CodeBlock>{`let users is find User where email is input.email`}</CodeBlock>
          </Section>

          {/* Part VI */}
          <Section title="Part VI: Full‑Stack UI">
            <p>namel3ss generates user interfaces directly from your .ai code. Pages combine forms, tables, text and buttons into a coherent UI.</p>

            <h3>Forms</h3>
            <p>A form bound to a record auto‑generates input fields for each record field:</p>
            <CodeBlock>{`page "signup":
 form is "User"`}</CodeBlock>
            <p>When submitted, the runtime validates each field against the record's constraints and returns structured errors if any exist.</p>

            <h3>Buttons</h3>
            <p>Buttons are blocks that call flows:</p>
            <CodeBlock>{`button "Create":
 calls flow "create_user"`}</CodeBlock>
          </Section>

          {/* Part VII */}
          <Section title="Part VII: Backend Logic (Flows)">
            <p>Flows are the heart of your application logic. A flow processes input, manipulates state, saves or finds records, calls AI profiles, runs agents, loops and branches, and ultimately returns a value.</p>

            <h3>AI Calls</h3>
            <p>The ask ai statement calls an AI profile and captures its reply:</p>
            <CodeBlock>{`flow "chat":
 ask ai "assistant" with input: "Hello" as reply
 set state.reply is reply
 return reply`}</CodeBlock>

            <h3>Memory</h3>
            <p>AI profiles define three memory types:</p>
            <ul>
              <li><strong>short‑term</strong> — Keeps the last n messages of context (user and assistant).</li>
              <li><strong>semantic</strong> — Enables simple retrieval of semantically similar past messages from a vector store.</li>
              <li><strong>profile</strong> — Stores the AI's own profile information (e.g. system prompts and tool schemas) to recall later.</li>
            </ul>
            <CodeBlock>{`ai "assistant":
 provider is "ollama"
 model is "llama3.1"
 memory:
  short_term is 10
  semantic is true
  profile is true`}</CodeBlock>
          </Section>

          {/* Part VIII */}
          <Section title="Part VIII: AI Profiles & Providers">
            <h3>AI Profile Syntax</h3>
            <CodeBlock>{`ai "assistant":
 provider is "openai"
 model is "gpt-4.1"
 system_prompt is "You are a helpful assistant."
 memory:
  short_term is 10
  semantic is true
  profile is true
 tools:
  expose "echo"
 auth:
  api_key is env "OPENAI_API_KEY"`}</CodeBlock>

            <h3>Providers</h3>
            <p>namel3ss includes first‑class support for major providers:</p>
            <ul>
              <li><strong>mock</strong> — Returns fixed responses; used in tests and examples.</li>
              <li><strong>ollama</strong> — Calls a locally running Ollama server (default host http://127.0.0.1:11434); no API keys needed.</li>
              <li><strong>openai</strong> — Calls OpenAI Chat or Responses API using your API key.</li>
              <li><strong>anthropic</strong> — Calls Anthropic's Messages API (e.g. Claude models).</li>
              <li><strong>gemini</strong> — Calls Google Gemini's generateContent API.</li>
              <li><strong>mistral</strong> — Calls Mistral's Chat completions API.</li>
            </ul>
          </Section>

          {/* Part IX */}
          <Section title="Part IX: Multi‑Agent Orchestration">
            <p>Agents encapsulate AI profiles with an optional system prompt override:</p>
            <CodeBlock>{`agent "planner":
 ai is "assistant"
 system_prompt is "You plan tasks."`}</CodeBlock>

            <h3>Running a Single Agent</h3>
            <CodeBlock>{`run agent "planner" with input: task as plan`}</CodeBlock>

            <h3>Running Agents in Parallel</h3>
            <CodeBlock>{`run agents in parallel:
 agent "critic" with input: plan
 agent "researcher" with input: plan
as results`}</CodeBlock>
            <p>This executes each agent sequentially under the hood but wraps their traces in a single parallel_agents trace with a list of child traces.</p>
          </Section>

          {/* Part X */}
          <Section title="Part X: Tooling & CLI">
            <h3>CLI Commands</h3>
            <p>All commands start with <code>n3 &lt;file&gt;.ai</code> and then add subcommands:</p>
            <ul>
              <li><strong>check</strong> — Parse and lower the .ai file. Print OK on success or a formatted error.</li>
              <li><strong>ui</strong> — Print the UI manifest as JSON.</li>
              <li><strong>actions</strong> — List all available action IDs, types and details.</li>
              <li><strong>format</strong> — Format the source code. Use <code>format check</code> to verify if formatting is needed.</li>
              <li><strong>lint</strong> — Run the linter. Use <code>lint check</code> to exit non‑zero if findings exist.</li>
              <li><strong>studio</strong> — Launch the visual Studio.</li>
              <li><strong>new &lt;template&gt; [project_name]</strong> — Scaffold a new project from a template.</li>
            </ul>

            <h3>Studio</h3>
            <p>The Studio is a web interface powered by a lightweight Python HTTP server. When you run <code>n3 &lt;file&gt;.ai studio</code>, the CLI loads your code, builds the manifest, runs lint and sets up state. It serves the UI and API endpoints for summary, actions, lint findings, state, traces and editing.</p>
          </Section>

          {/* Part XI */}
          <Section title="Part XI: Examples & Demos">
            <h3>CRUD Dashboard Example</h3>
            <CodeBlock>{`record "Customer":
 field "email" is text present unique pattern "^[^@\\\\s]+@[^@\\\\s]+\\\\.[^@\\\\s]+$"
 field "name" is text present
 field "age" is int gt 17

page "dashboard":
 title is "Customer Dashboard"
 text is "Manage your customers."
 form is "Customer"
 table is "Customer"
 button "Seed":
  calls flow "seed_customers"

flow "seed_customers":
 repeat up to 2:
  save Customer {
   email is "demo_" + random_int().to_string() + "@example.com"
   name is "Demo User " + random_int().to_string()
   age is 30
  }
 return "Seeded"`}</CodeBlock>
            <p>This defines a Customer record with validation, a page with a form and table, and a seed flow that inserts two demo customers. When run, the table shows these records. Submitting the form adds new customers and triggers validation errors if email is invalid or duplicate.</p>

            <h3>AI Assistant Over Records</h3>
            <CodeBlock>{`record "Note":
 field "title" is text present
 field "body" is text present

ai "assistant":
 provider is "ollama"
 model is "llama3.1"
 memory:
  short_term is 10
  semantic is true
  profile is true

page "notes":
 title is "Notes"
 form is "Note"
 table is "Note"
 button "Ask Assistant":
  calls flow "ask_assistant"

flow "ask_assistant":
 let content is "Summarize the latest note."
 if size(find Note) is greater than 0:
  set content is "Summarize this note: " + (find Note)[-1].body
 ask ai "assistant" with input: content as reply
 set state.reply is reply
 return reply`}</CodeBlock>
            <p>This app lets you create notes and then ask an AI to summarize the most recent note. The flow checks if there are notes and adjusts the prompt. It stores the reply in state.reply and returns it. The Studio trace shows the AI input and output.</p>

            <h3>Multi‑Agent Workflow Example</h3>
            <CodeBlock>{`ai "base":
 provider is "ollama"
 model is "llama3.1"
 memory:
  short_term is 5
  semantic is true
  profile is true

agent "planner":
 ai is "base"
 system_prompt is "You are a project planner."

agent "critic":
 ai is "base"
 system_prompt is "You are a critic that finds flaws."

agent "researcher":
 ai is "base"
 system_prompt is "You are a researcher who looks for supporting facts."

flow "run_workflow":
 let task is "Write a launch plan for namel3ss"
 run agent "planner" with input: task as plan
 run agents in parallel:
  agent "critic" with input: plan
  agent "researcher" with input: plan
 as feedback
 ask ai "base" with input: "Combine the plan and feedback into a final summary" as summary
 set state.plan is plan
 set state.feedback is feedback
 set state.summary is summary
 return summary

page "workflow":
 title is "Launch Workflow"
 button "Run":
  calls flow "run_workflow"
 text is "Plan, critique and research automatically."
 text is "Summary: " + state.summary`}</CodeBlock>
            <p>This example shows how to orchestrate multiple agents. The planner creates a plan; the critic and researcher review it in parallel; then a final AI compiles everything into a summary. The UI displays the summary. Traces expose the plan, feedback and summary, illustrating how multi‑agent conversations unfold.</p>
          </Section>

          {/* Part XII */}
          <Section title="Part XII: Glossary">
            <p>A quick reference to all the key terms in namel3ss:</p>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <GlossaryItem term="app">The entire program or .ai file containing flows, records, pages, AI profiles, tools and agents.</GlossaryItem>
              <GlossaryItem term="flow">A named block of backend logic. Flows process input, manage state, call AI, run agents and return a value.</GlossaryItem>
              <GlossaryItem term="record">A data model with fields and constraints. Records validate and persist data.</GlossaryItem>
              <GlossaryItem term="page">A user interface block containing titles, text, forms, tables and buttons. Pages are declarative.</GlossaryItem>
              <GlossaryItem term="AI profile">A block defining how to call an LLM. Specifies provider, model, system prompt, memory and tools.</GlossaryItem>
              <GlossaryItem term="agent">A wrapper around an AI profile with an optional system prompt override; used for multi‑agent orchestration.</GlossaryItem>
              <GlossaryItem term="ask ai">A statement in flows that calls an AI profile with an input and binds the reply.</GlossaryItem>
              <GlossaryItem term="state">A dictionary holding global state across flows; persists for the lifetime of the program process.</GlossaryItem>
              <GlossaryItem term="Studio">A web interface for viewing pages, executing actions, inspecting state and traces, and making safe edits.</GlossaryItem>
            </div>
          </Section>

          {/* Part XIII */}
          <Section title="Part XIII: Appendices">
            <h3>Appendix A: Error Codes</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full border border-black/[0.08] rounded-lg">
                <thead className="bg-black/[0.02]">
                  <tr>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold border-b border-black/[0.08]">Category</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold border-b border-black/[0.08]">Code</th>
                    <th className="px-4 py-3 text-left text-[14px] font-semibold border-b border-black/[0.08]">Description</th>
                  </tr>
                </thead>
                <tbody className="text-[15px]">
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-3">Parser</td>
                    <td className="px-4 py-3"><code>parser_error</code></td>
                    <td className="px-4 py-3">Raised when .ai source contains invalid syntax or unknown tokens.</td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-3">Lexer</td>
                    <td className="px-4 py-3"><code>lexer_error</code></td>
                    <td className="px-4 py-3">Raised when unexpected characters are encountered.</td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-3">Validation</td>
                    <td className="px-4 py-3"><code>validation_error</code></td>
                    <td className="px-4 py-3">Raised when record constraints fail. Fields include field, code and message.</td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-3">Runtime</td>
                    <td className="px-4 py-3"><code>runtime_error</code></td>
                    <td className="px-4 py-3">Raised for logic errors such as undefined variables or invalid operations.</td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-3">AI</td>
                    <td className="px-4 py-3"><code>ai_error</code></td>
                    <td className="px-4 py-3">Raised when AI calls fail (missing key, unreachable provider, timeout, invalid response).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Tool</td>
                    <td className="px-4 py-3"><code>tool_error</code></td>
                    <td className="px-4 py-3">Raised when a tool call fails.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Appendix B: Config File Format</h3>
            <p>If you prefer not to use .env, you can create ~/.namel3ss/config.json:</p>
            <CodeBlock>{`{
  "openai": {
    "api_key": "sk-...",
    "base_url": "https://api.openai.com"
  },
  "anthropic": {
    "api_key": "sk-..."
  },
  "gemini": {
    "api_key": "sk-..."
  },
  "mistral": {
    "api_key": "sk-..."
  },
  "ollama": {
    "host": "http://127.0.0.1:11434",
    "timeout_seconds": 30
  }
}`}</CodeBlock>
            <p>The runtime merges config from this file with environment variables. Use environment variables to override config values.</p>

            <h3>Appendix C: Studio API Endpoints</h3>
            <p>Studio runs a local HTTP server with these endpoints:</p>
            <ul>
              <li><strong>GET /api/summary</strong> — Returns counts of records, flows, pages, AI profiles, agents and tools.</li>
              <li><strong>GET /api/ui</strong> — Returns the UI manifest with pages and actions.</li>
              <li><strong>GET /api/actions</strong> — Returns a list of action definitions.</li>
              <li><strong>GET /api/lint</strong> — Returns linter findings as JSON.</li>
              <li><strong>POST /api/action</strong> — Executes an action; body includes id and payload.</li>
              <li><strong>POST /api/edit</strong> — Applies a safe edit; body includes operation, target and value.</li>
              <li><strong>POST /api/reset</strong> — Resets state and store.</li>
            </ul>
          </Section>

          {/* Afterword */}
          <Section title="Afterword">
            <p>
              namel3ss 0.1.0 is a revolutionary step towards building AI‑native applications in plain English. By integrating full‑stack development, AI orchestration, deterministic runtime semantics and robust tooling, namel3ss eliminates friction and reduces cognitive load for developers. In this book you learned the grammar, features, tooling and best practices of namel3ss. You should now feel comfortable creating records, flows, pages, AI profiles and agents, exploring the UI and Studio, running and testing applications, and scaffolding new projects with templates.
            </p>
            <p>
              We are just at the beginning of this journey. Future versions of namel3ss will introduce persistent storage backends, user authentication, additional providers and more advanced agent capabilities — but the foundation of structured English for deterministic full‑stack AI development remains. Join the community, build amazing apps, and help shape the future of software development.
            </p>
            <p className="text-black/48">
              Thank you for reading.
            </p>
          </Section>

          {/* GitHub Link */}
          <div className="pt-12 border-t border-black/[0.08]">
            <p className="text-black/48 mb-6">
              For the complete documentation, examples, and source code:
            </p>
            <a
              href="https://github.com/namel3ss-Ai/namel3ss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-black text-white text-[15px] tracking-[-0.015em] rounded-xl hover:bg-black/85 transition-all duration-200"
            >
              View on GitHub →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <h2 className="text-[32px] md:text-[40px] tracking-[-0.032em] leading-[1.1] font-semibold text-black">
        {title}
      </h2>
      <div className="space-y-6 text-[17px] leading-[1.6] tracking-[-0.01em] text-black/72">
        {children}
      </div>
    </motion.div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="my-6 border border-black/[0.06] rounded-lg p-6 bg-black/[0.01]">
      <pre className="font-mono text-[14px] leading-[1.8] tracking-tight text-black/72 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function GlossaryItem({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black/[0.08] pl-4 py-2">
      <code className="text-[15px] font-semibold text-black">{term}</code>
      <p className="text-[15px] leading-[1.6] tracking-[-0.01em] text-black/72 mt-1">{children}</p>
    </div>
  );
}