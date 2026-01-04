import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { UnderstandingFirst } from './components/UnderstandingFirst';
import { TheMoment } from './components/TheMoment';
import { WhatMakesItDifferent } from './components/WhatMakesItDifferent';
import { HowItFeels } from './components/HowItFeels';
import { Studio } from './components/Studio';
import { WhatItIs } from './components/WhatItIs';
import { GetStarted } from './components/GetStarted';
import { Community } from './components/Community';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero />
      <TheMoment />
      <UnderstandingFirst />
      <WhatMakesItDifferent />
      <HowItFeels />
      <Studio />
      <WhatItIs />
      <GetStarted />
      <Community />
      <Footer />
    </div>
  );
}