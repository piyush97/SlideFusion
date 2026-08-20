import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('showcase interaction smoke test', () => {
  it('moves through local slides and communicates static integration fallbacks', () => {
    render(<App />);
    expect(screen.getByText(/No application data is sent, saved, or fetched; there are no backend requests\./i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Make the first idea feel inevitable.' })).toBeTruthy();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('heading', { name: 'Turn a narrative into a visual system.' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /try export/i }));
    expect(screen.getByRole('status').textContent).toContain('Export is unavailable in this static showcase.');
  });
});
