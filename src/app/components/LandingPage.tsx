import { Hero } from './Hero';
import { LastScreen } from './LastScreen';
import { MagicalCursor } from './MagicalCursor';
import { ScrollEffects } from './ScrollEffects';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'];

export function LandingPage() {
  const activeSection: SectionId = 'home';
  const setHomeRef = (_node: HTMLElement | null) => {};

  return (
    <div className="site">
      <ScrollEffects />
      <MagicalCursor />
      <nav className="site-nav">
        <a href="#home" className="site-brand" aria-label="namel3ss home">
          <img src="/namel3ss_horizontal_logo.svg" alt="namel3ss logo" className="site-brand-logo" />
        </a>
        <div className="site-nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <Hero isActive={activeSection === 'home'} sectionRef={setHomeRef} />
      <LastScreen />
    </div>
  );
}
