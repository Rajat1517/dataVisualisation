import React from 'react'
import DummyDoughnut from './DummyDoughnut'
import DummyLine from './DummyLine'
import DummyPolar from './DummyPolar'


export default function DummyCarousel() {
  return (
    // Carousel of dummy chart components
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <DummyLine />
        </div>
        <div className="carousel-item">
          <DummyDoughnut />
        </div>
        <div className="carousel-item">
          <DummyPolar />
        </div>
      </div>
    </div>
  )
}
