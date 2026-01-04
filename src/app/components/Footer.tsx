import { Github, Linkedin, MessageSquare } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/namel3ss-Ai/namel3ss", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/namel3ss/", label: "LinkedIn" },
    { icon: MessageSquare, href: "https://discord.gg/x8s6aEwdU", label: "Discord" },
  ];

  return (
    <footer className="py-16 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl mb-3">namel3ss</h3>
        <p className="text-lg text-gray-600">
          If you can not understand it in 3 minutes, we redesign it.
        </p>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mt-8 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="size-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <social.icon className="size-5" />
            </a>
          ))}
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} namel3ss. All rights reserved.
        </p>
      </div>
    </footer>
  );
}