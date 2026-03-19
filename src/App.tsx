import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Approach from './components/Approach';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useConfig } from './context/ConfigContext';

function App() {
  const { loading } = useConfig();

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-primary)]">Loading configuration...</div>;
  }

  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[var(--color-surface)]">Loading...</div>}>
      <div className="font-sans text-[var(--color-primary)] bg-[var(--color-surface)] selection:bg-[var(--color-accent)] selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Approach />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;