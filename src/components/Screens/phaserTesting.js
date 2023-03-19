import React from "react";
import Phaser from "phaser";

const PhaserTest = () => {
  const config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 968,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  };

  const Game = new Phaser.Game(config);

  function preload () {
    this.load.setBaseURL('http://localhost:8000')
    this.load.image('map','maps/map_2.png')
    this.load.spritesheet('player-right','Character/character-1.png',{
      frameWidth:56, frameHeight:56
    })
    this.load.spritesheet('player-left','Character/character-1-flip.png',{
      frameWidth:56, frameHeight:56
    })
  }
  function create () {
    this.add.image(900,200,'map')
    this.add.image(500,200,'player-right')
  }

  function update ()
  {
  }

  return (
    <div>
    </div>
  )
}

//npx http-server assets --cors -p 8000

export default PhaserTest;