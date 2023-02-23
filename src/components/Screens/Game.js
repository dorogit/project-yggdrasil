import React from "react";
import { useRef, useEffect } from 'react';
const Game = () => {
  const canvasRef = useRef(null);
  const drawImage = (ctx) => {
    const map = new Image();
    const player_1 = new Image();
    map.src = require('../../assets/test-map.png')
    player_1.src = require('../../assets/Character/character-1.png')
    map.onload = () => {
      ctx.drawImage(map, -600, -50)
      ctx.drawImage(player_1,
        0,
        0,
        player_1.width/8,
        player_1.height/11,
        810,
        60,
        player_1.width/8,
        player_1.height/11
        )
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawImage(ctx);
  }, []);
  
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
  
}

export default Game;

//backgroundImage: `url('https://media.discordapp.net/attachments/1012398048745373697/1076917548639059988/FirstMap.png')`,
/*
<div style={{
    backgroundImage:`url('https://media.discordapp.net/attachments/1012398048745373697/1076917548639059988/FirstMap.png')`,
    height:'100vh',
    width:'100vw',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    }}>
    </div>
*/