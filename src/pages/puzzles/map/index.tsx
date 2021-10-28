import React from 'react';
import { MapRenderer } from '../../../components/Global';

const PuzzleMap = () => {
  return (
    <>
      <div>Puzzle Map</div>
      <MapRenderer markers={[{
        anchor: [49.805, -119.4778],
        zoom: 13
      }, {
        anchor: [49.8, -119.4778],
        zoom: 13
      }, {
        anchor: [49.81, -119.47784],
        zoom: 13
      }, {
        anchor: [50.88, -119.477829],
        zoom: 8
      }]} />
    </>
  );
};

export default PuzzleMap;
