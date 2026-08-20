export type Slide = {
  id: string;
  section: string;
  title: string;
  body: string;
  accent: string;
  note: string;
};

export const demoSlides: readonly Slide[] = [
  { id: 'signal', section: '01 / Signal', title: 'Make the first idea feel inevitable.', body: 'A single visual thought, paced with clarity and enough room to land.', accent: '#a78bfa', note: 'A quiet opening frame' },
  { id: 'system', section: '02 / System', title: 'Turn a narrative into a visual system.', body: 'Type, rhythm, contrast, and motion align around one simple story.', accent: '#2dd4bf', note: 'Structure without clutter' },
  { id: 'impact', section: '03 / Impact', title: 'Give the important moment a stage.', body: 'Use scale and restraint to make the audience remember what matters.', accent: '#fb7185', note: 'The point of view' },
  { id: 'close', section: '04 / Close', title: 'Leave a next step, not a loose end.', body: 'A confident close turns attention into a conversation worth continuing.', accent: '#fbbf24', note: 'A clear invitation' }
];

export const fallbackState = {
  status: 'Local demo only',
  message: 'Live SlideFusion integrations are unavailable in this static showcase.',
  actions: ['Export is unavailable in this static showcase.', 'Sign-in is unavailable in this static showcase.']
} as const;

export const getNextSlide = (current: number) => (current + 1) % demoSlides.length;
export const getPreviousSlide = (current: number) => (current - 1 + demoSlides.length) % demoSlides.length;
