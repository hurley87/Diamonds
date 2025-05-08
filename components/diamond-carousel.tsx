'use client';

import { useState } from 'react';
import { DiamondCard } from './diamond-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const diamonds = [
  {
    gradient:
      'linear-gradient(0deg, rgba(166, 175, 177, 0.3), rgba(166, 175, 177, 0.3)), linear-gradient(180deg, rgba(1, 72, 76, 0) 47.4%, rgba(0, 21, 181, 0.18) 94.4%)',
    karat: '0,3',
    clarity: 'IF/FL',
    color: 'D',
    cut: 'excellent',
    symmetry: 'excellent',
    polish: 'excellent',
  },
  {
    gradient:
      'linear-gradient(0deg, rgba(166, 175, 177, 0.3), rgba(166, 175, 177, 0.3)), linear-gradient(180deg, rgba(1, 72, 76, 0) 47.4%, rgba(1, 72, 76, 0.18) 94.4%)',
    karat: '0,5',
    clarity: 'IF/FL',
    color: 'D',
    cut: 'excellent',
    symmetry: 'excellent',
    polish: 'excellent',
  },
  {
    gradient:
      'linear-gradient(0deg, rgba(166, 175, 177, 0.3), rgba(166, 175, 177, 0.3)), linear-gradient(180deg, rgba(93, 83, 0, 0) 47.4%, rgba(93, 83, 0, 0.18) 94.4%)',
    karat: '1,01',
    clarity: 'IF/FL',
    color: 'D',
    cut: 'excellent',
    symmetry: 'excellent',
    polish: 'excellent',
  },
  {
    gradient:
      'linear-gradient(0deg, rgba(166, 175, 177, 0.3), rgba(166, 175, 177, 0.3)), linear-gradient(180deg, rgba(93, 83, 0, 0) 47.4%, rgba(177, 68, 0, 0.18) 94.4%)',
    karat: '3,01',
    clarity: 'IF/FL',
    color: 'D',
    cut: 'excellent',
    symmetry: 'excellent',
    polish: 'excellent',
  },
  {
    gradient:
      'linear-gradient(0deg, rgba(166, 175, 177, 0.3), rgba(166, 175, 177, 0.3)), linear-gradient(180deg, rgba(91, 20, 76, 0) 47.4%, rgba(91, 20, 76, 0.18) 94.4%)',
    karat: '5,01',
    clarity: 'IF/FL',
    color: 'D',
    cut: 'excellent',
    symmetry: 'excellent',
    polish: 'excellent',
  },
];

export function DiamondCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % diamonds.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + diamonds.length) % diamonds.length
    );
  };

  const getVisibleDiamonds = () => {
    const visibleDiamonds = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % diamonds.length;
      visibleDiamonds.push(diamonds[index]);
    }
    return visibleDiamonds;
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-6 justify-between w-full p-2 pt-60 lg:pt-40 pb-10">
        {getVisibleDiamonds().map((diamond, index) => (
          <div
            key={index}
            className={`w-full ${index === 0 ? 'block' : 'hidden lg:block'}`}
          >
            <DiamondCard {...diamond} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
