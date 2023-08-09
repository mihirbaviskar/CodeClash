import React from 'react';
import Carousel from './Carousel';

const App = () => {
  const items = [
    {
      title: "Create Room",
      description: "Specify the difficulty of problems, num players, and your name",
      icon: 'path_to_image1.png'
    },
    {
      title: "Intro",
      description: "Welcome! Create your own private room or join one of your friend's rooms",
      icon: 'path_to_image2.png'
    }
    // ... add more items as needed
  ];

  return (
    <div>
      <Carousel items={items} />
    </div>
  );
};

export default App;
