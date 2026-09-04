import React from 'react';
import '@testing-library/jest-dom';

// Mock Next.js Image component for clean JSDOM rendering and testing
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    fill,
    priority,
    unoptimized,
    sizes,
    onError,
    ...props
  }: any) {
    return React.createElement('img', {
      src,
      alt,
      onError,
      ...props,
    });
  };
});

// Mock framer-motion to simplify DOM animations in JSDOM unit tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  const createMotionComponent = (tag: string) => {
    return ({ children, ...props }: any) => React.createElement(tag, props, children);
  };

  return {
    ...actual,
    motion: {
      div: createMotionComponent('div'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      p: createMotionComponent('p'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      section: createMotionComponent('section'),
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
  };
});
