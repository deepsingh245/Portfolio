import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpokenText from './SpokenText';

describe('SpokenText Component', () => {
  it('renders the complete text correctly', () => {
    const text = 'Hello world, this is a test.';
    render(<SpokenText text={text} currentCharIndex={-1} isSpeaking={false} />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('world,')).toBeInTheDocument();
    expect(screen.getByText('this')).toBeInTheDocument();
    expect(screen.getByText('is')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('test.')).toBeInTheDocument();
  });

  it('highlights the active word when isSpeaking is true', () => {
    const text = 'Hello world';
    // 'Hello' spans from 0 to 5.
    // ' ' is at index 5.
    // 'world' spans from 6 to 11.
    const { container } = render(
      <SpokenText text={text} currentCharIndex={6} isSpeaking={true} />
    );

    // Find the span containing 'world'
    const spans = container.querySelectorAll('span');
    const helloSpan = Array.from(spans).find((s) => s.textContent === 'Hello');
    const worldSpan = Array.from(spans).find((s) => s.textContent === 'world');

    expect(helloSpan).not.toHaveClass('bg-primary/20');
    expect(worldSpan).toHaveClass('bg-primary/20');
  });

  it('does not highlight any words when isSpeaking is false', () => {
    const text = 'Hello world';
    const { container } = render(
      <SpokenText text={text} currentCharIndex={6} isSpeaking={false} />
    );

    const spans = container.querySelectorAll('span');
    spans.forEach((span) => {
      expect(span).not.toHaveClass('bg-primary/20');
    });
  });

  it('does not highlight whitespace tokens', () => {
    const text = 'Hello     world';
    // currentCharIndex = 6 lands in the whitespace '     '
    const { container } = render(
      <SpokenText text={text} currentCharIndex={6} isSpeaking={true} />
    );

    const spans = container.querySelectorAll('span');
    const whitespaceSpan = Array.from(spans).find((s) => s.textContent?.includes('    '));
    
    if (whitespaceSpan) {
      expect(whitespaceSpan).not.toHaveClass('bg-primary/20');
    }
  });
});
