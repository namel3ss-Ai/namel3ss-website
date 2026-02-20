import { Hero } from './components/Hero';
import { MarketingSlides } from './components/MarketingSlides';
import { Navigation } from './components/Navigation';
import { RagApplication } from './components/RagApplication';
import { WhatMakesItDifferent } from './components/WhatMakesItDifferent';
import { Studio } from './components/Studio';
import { GetStarted } from './components/GetStarted';
import { Community } from './components/Community';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero />
      <MarketingSlides />
      <RagApplication />
      <WhatMakesItDifferent />
      <Studio />
      <GetStarted />
      <Community />
      <Footer />
    </div>
  );
}
