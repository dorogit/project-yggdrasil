import React from "react";
import characterImageRight from '../../assets/Character/character-1.png'
import characterImageLeft from '../../assets/Character/character-1-flip.png'
import collisionBox from '../../assets//testing.png'
import array from '../../assets/collision.json'
import mapConfig from '../../assets/maps/mapConfigs.json'
class Game extends React.Component {

  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.collisionArray = []

    this.player = {
      inCollision : false,
      lastKeyPressed : null, 
      currentFrame : 0,
      state : 'idle', 
      direction : 'right',
    }

    this.maps = {
      start : mapConfig.starting_map,
      current : mapConfig.starting_map
    }

    this.movables = {
      map: {
        x:this.maps.current.movables.map.x,
        y:this.maps.current.movables.map.y
      },
      collision: {
        x: this.maps.current.movables.collision.x,
        y: this.maps.current.movables.collision.y
      }
    }

  }

  componentDidMount() {
    console.log(this.maps.current.movables.map.x)
    window.addEventListener('keydown', (e) => {

      if (["w","a","s","d"].includes(e.key)) {
        if (this.player.state!=='moving') {this.player.state = 'moving'}
      }
      switch (e.key) {
        case "w":
          if (this.player.inCollision === false || (this.player.inCollision === true && this.player.lastKeyPressed !== "w")) {
            this.movePlayer(1)
          }
          this.player.lastKeyPressed = "w"
          break;
        case "a":
          if (this.player.inCollision === false || (this.player.inCollision === true && this.player.lastKeyPressed !== "a")) {
            if (this.player.direction === 'right') {this.player.direction = 'left'}
            this.movePlayer(2)
          }
          this.player.lastKeyPressed = "a"
          break;
        case "s":
          if (this.player.inCollision === false || (this.player.inCollision === true && this.player.lastKeyPressed !== "s")) {
            this.movePlayer(3)
          }
          this.player.lastKeyPressed = "s"
          break; 
        case "d":
          if (this.player.inCollision === false || (this.player.inCollision === true && this.player.lastKeyPressed !== "d")) {
            if (this.player.direction === 'left') {this.player.direction = 'right'}
            this.movePlayer(4)
          }
          this.player.lastKeyPressed = "d"
          break;
        default:
      }
    })

    window.addEventListener('keyup', (e) => {
      if (this.player.state === 'moving' && ["w","a","s","d"].includes(e.key) ) {
        this.player.currentFrame = 0
        this.player.state = 'idle'
      }
    })

    window.addEventListener('click', (event) => {
      console.log(event)
    })
  
    for(let i=0; i<array.collision.length;i+=50) {
      this.collisionArray.push(array.collision.slice(i,50+i))
    }
    
  }

  movePlayer(direction) {
    this.player.inCollision = false //if the player moves, he must be out of collision
    if (this.player.state === 'moving') {
      switch (direction) {
        case 1:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y += 30
          })
          break;
        case 2:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x += 30
          })
          break;
        case 3:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y -= 30
          })
          break;
        case 4:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x -= 30
          })
          break;
        default:
          break;
      }
    }
  }

  checkCollision(collisionX, collisionY) {
    //900 and 493 are player's coordinates in the middle of the screen 
    if (920 >= collisionX && collisionX>= 810 && 490>=collisionY && collisionY>=360) {
      this.player.inCollision = true
      return true;
    } 
  }

  render() {

    setInterval(() => {
      if (this.player.state === 'moving') {
        if (this.player.currentFrame < 8) {
          this.player.currentFrame+=1
        } else if (this.player.currentFrame === 8) {
          this.player.currentFrame = 0
        }
      }
    }, 100);
    console.log(this.maps.current)
    setInterval(() => {

      const drawImage = (ctx) => {
        const map = new Image();
        const player_1 = new Image();
        const collision = new Image();
        map.src = this.maps.current.source
        if (this.player.direction === 'right') {
          player_1.src = characterImageRight
        } else if (this.player.direction === 'left') {
          player_1.src = characterImageLeft
        }
        collision.src = collisionBox
        map.onload = () => {
          ctx.drawImage(map, this.movables.map.x, this.movables.map.y)
          player_1.onload = () => {
            switch (this.player.state) {
              case 'moving':
                ctx.drawImage(player_1,
                  player_1.width/8 * this.player.currentFrame,
                  player_1.height/11 * 2,
                  player_1.width/8,
                  player_1.height/11,
                  1800 / 2 - player_1.width/8 / 2,
                  986 / 2 - player_1.height/11,
                  player_1.width/8,
                  player_1.height/11
                )
                break;
              case 'idle':
                ctx.drawImage(player_1,
                  0,
                  0,
                  player_1.width/8,
                  player_1.height/11,
                  1800 / 2 - player_1.width/8 / 2,
                  986 / 2 - player_1.height/11,
                  player_1.width/8,
                  player_1.height/11
                )
                break
              default:
                break;
            }
            this.collisionArray.forEach((row,index)=>{
              row.forEach((coords, index2) => {
                if (coords === 1645) {
                  ctx.drawImage(
                    collision,
                    (index2 * 56) + this.movables.collision.x,
                    (index * 56) + this.movables.collision.y
                  )
                  if (this.checkCollision((index2 * 56) + this.movables.collision.x, (index * 56) + this.movables.collision.y)) {
                    console.log("in collision")
                  }
                }
              })
            })
          }
          }
        }
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d');
        drawImage(ctx)
      
    }, 10)
    
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        <canvas ref= {this.canvasRef} width={1800} height={986} />
      </div>
    );
  }
}

export default Game;
