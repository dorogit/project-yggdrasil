import React from "react";
import { useRef, useEffect } from 'react';
const Game = () => {
  const canvasRef = useRef(null);
  const drawImage = (ctx) => {
    const img = new Image();
    img.src = 'https://media.discordapp.net/attachments/1012398048745373697/1077916410833022976/test-map.png?width=1026&height=1026'
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawImage(ctx);
  }, []);
  
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
      <canvas ref={canvasRef} width={800} height={800} />
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