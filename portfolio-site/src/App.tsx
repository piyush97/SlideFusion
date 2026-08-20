import { useEffect, useState } from 'react';
import { demoSlides, fallbackState, getNextSlide, getPreviousSlide } from './demo';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const active = demoSlides[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActiveIndex(getNextSlide);
      if (event.key === 'ArrowLeft') setActiveIndex(getPreviousSlide);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const unavailable = (action: string) => setNotice(`${action} is unavailable in this static showcase.`);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="./" aria-label="SlideFusion showcase home">slide<span>fusion</span></a>
        <p>Static presentation study</p>
        <button className="ghost-button" onClick={() => unavailable('Sign-in')}>Sign in</button>
      </header>

      <section className="hero" aria-labelledby="showcase-title">
        <div className="intro">
          <p className="eyebrow">A local, static experience</p>
          <h1 id="showcase-title">A presentation should feel like a point of view.</h1>
          <p className="lede">This compact showcase simulates a four-slide story entirely in your browser. No application data is sent, saved, or fetched; there are no backend requests.</p>
          <div className="intro-actions">
            <button className="primary-button" onClick={() => setActiveIndex(0)}>Replay the story</button>
            <button className="text-button" onClick={() => unavailable('Export')}>Try export <span aria-hidden="true">↗</span></button>
          </div>
        </div>

        <article className="deck" aria-label="Interactive four-slide showcase">
          <div className="deck-topline">
            <span>{active.section}</span>
            <span>{activeIndex + 1} / {demoSlides.length}</span>
          </div>
          <div className="slide" style={{ '--accent': active.accent } as React.CSSProperties}>
            <span className="slide-orb" aria-hidden="true" />
            <p>{active.note}</p>
            <h2>{active.title}</h2>
            <p className="slide-body">{active.body}</p>
          </div>
          <div className="deck-controls">
            <button aria-label="Previous slide" onClick={() => setActiveIndex(getPreviousSlide)}>←</button>
            <div className="progress" aria-label={`Slide ${activeIndex + 1} of ${demoSlides.length}`}>
              {demoSlides.map((slide, index) => <button key={slide.id} className={index === activeIndex ? 'active' : ''} aria-label={`Go to slide ${index + 1}`} onClick={() => setActiveIndex(index)} />)}
            </div>
            <button aria-label="Next slide" onClick={() => setActiveIndex(getNextSlide)}>→</button>
          </div>
        </article>
      </section>

      <section className="fallback" aria-labelledby="fallback-title">
        <div><p className="eyebrow">{fallbackState.status}</p><h2 id="fallback-title">Built to show, not to connect.</h2></div>
        <div><p>{fallbackState.message}</p><ul>{fallbackState.actions.map((action) => <li key={action}>{action}</li>)}</ul></div>
      </section>
      {notice && <p className="toast" role="status">{notice}</p>}
    </main>
  );
}
