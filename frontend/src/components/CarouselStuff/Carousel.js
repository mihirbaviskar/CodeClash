import React, { useState } from 'react';
import right_arrow from '../../images/arrow_forward_ios.svg'
import left_arrow from '../../images/arrow_back_ios.svg'
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
        title: "Intro",
        description: "Welcome! Create your own private room or join one of your friend's rooms",
        icon: require('../../images/CodeClashDemo/landingpage.png')
    },
    {
      title: "Create Room",
      description: "Specify the difficulty of problems, number of players, and your name when you create a room.",
      icon: require('../../images/CodeClashDemo/createroomcloseup.png')
    },
    {
        title: "Waiting Room",
        description: "When you create/join a room you enter a waiting room. Invite your friends to the room name.",
        icon: require('../../images/CodeClashDemo/waitingroom.png')
    },
    {
        title: "Join Room",
        description: "Join your friend's private room",
        icon: require('../../images/CodeClashDemo/joinroom_closeup.png')
    },
    {
        title: "Problem",
        description: 
        `Once everyone has joined, you will get a series of 3 problems. The problem description is provided on the left and you can code your response in the editor on the right.
        the bottom left displays the 'arcade' section where you can see the leaderboard, your money, and the powerups.`,
        icon: require('../../images/CodeClashDemo/problem.png')
    },
    {
        title: "Comp error",
        description: 
        `Get detailed compilation errors.`,
        icon: require('../../images/CodeClashDemo/compilation_error.png')
    },
    {
        title: "Runtime error",
        description: 
        `Along with failed testcases and your stdout`,
        icon: require('../../images/CodeClashDemo/runtime_error.png')
    },
    {
        title: "Accepted",
        description: 
        `Get detailed responses on your accepted code. Earn points based on your run time, memory usage, and solve time.`,
        icon: require('../../images/CodeClashDemo/accepted.png')
    },
    {
        title: "Drop Bomb",
        description: 
        `Use powerups by holding the icon and dragging and dropping over the recipient in the leaderboard. Make sure you have enough money though.
        You get money as time goes on and is relative to your place. If you're 4th place you get more money/sec than someone in 1st place to make the game a bit more competitive.`,
        icon: require('../../images/CodeClashDemo/drop_bomb.png')
    },
    {
        title: "Bomb Display",
        description: 
        `Bomb deletes 3 random lines of code from the recipient. The outline color changes to indicate they've been bombed.`,
        icon: require('../../images/CodeClashDemo/bomb_display.png')
    },
    {
        title: "Freeze Display",
        description: 
        `Freeze prevents the recipient from typing for 30 seconds. The outline color changes on the recipients side to indicate they've been frozen.`,
        icon: require('../../images/CodeClashDemo/freeze_display.png')
    },
    {
        title: "Leaderboard",
        description: 
        `Once the game ends the leaderboard will be displayed along with your place(ft. fireworks)`,
        icon: require('../../images/CodeClashDemo/leaderboard.png')
    },
    // ... add more items as needed
  ];
  const prevSlide = () => {
    const newIndex = activeIndex - 1;
    setActiveIndex(newIndex < 0 ? items.length - 1 : newIndex);
  };

  const nextSlide = () => {
    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex === items.length ? 0 : newIndex);
  };

  return (
    <div className="carousel">
        {items.map((item, index) => (
            <div
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            >
            <img src={item.icon} alt={item.title} />
            <p className='item-description'>{item.description}</p>
            </div>
        ))}
        <div className='carousel-nav'>
            <button onClick={prevSlide}><img className="learn-more-arrow" src={left_arrow} alt="left-arrow"/>
                
</button>
            <button onClick={nextSlide}><img className="learn-more-arrow" src={right_arrow} alt="right-arrow"/>
</button>
        </div>
    </div>
  );
};

export default Carousel;
