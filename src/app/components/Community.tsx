import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Github, MessageSquare, Users } from 'lucide-react';

export function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const channels = [
    {
      icon: Github,
      title: "GitHub Issues",
      description: "report bugs, share friction",
      href: "https://github.com/namel3ss-Ai/namel3ss"
    },
    {
      icon: MessageSquare,
      title: "Discussions",
      description: "design decisions, proposals",
      href: "https://github.com/namel3ss-Ai/namel3ss/discussions"
    },
    {
      icon: Users,
      title: "Discord",
      description: "early adopters and builders",
      href: "https://discord.gg/x8s6aEwdU"
    }
  ];

  return (
    <section id="community" ref={ref} className="py-32 px-6 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-16 text-center"
        >
          Community
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {channels.map((channel, index) => (
            <motion.a
              key={index}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer"
            >
              <channel.icon className="size-12 mx-auto mb-4" />
              <h3 className="text-xl mb-2">{channel.title}</h3>
              <p className="text-gray-400">{channel.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl mb-4">One request:</p>
          <p className="text-xl md:text-2xl text-gray-400 italic">
            Tell us what confused you in the first 3 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}