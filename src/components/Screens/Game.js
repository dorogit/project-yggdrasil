import React from "react";
import mapImage from '../../assets/maps/test-map.png'
import characterImageRight from '../../assets/Character/character-1.png'
import characterImageLeft from '../../assets/Character/character-1-flip.png'
import collisionBox from '../../assets//testing.png'
import array from '../../assets/collision.json'
class Game extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.movables = {
      map: {
        x:-585,
        y:-50
      },
      collision: {
        x:-585,
        y:-50
      }
    }
    this.collisionArray = []
    this.inCollision = false
    this.lastKeyPressed = null
    this.playerFrames = 0
    this.moving = false
    this.direction = 'right'
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {

      if (["w","a","s","d"].includes(e.key)) {
        if (this.moving!==true) {this.moving = true}
      }
      switch (e.key) {
        case "w":
          if (this.inCollision === false || (this.inCollision === true && this.lastKeyPressed !== "w")) {
            this.movePlayer(1)
          }
          this.lastKeyPressed = "w"
          break;
        case "a":
          if (this.inCollision === false || (this.inCollision === true && this.lastKeyPressed !== "a")) {
            if (this.direction === 'right') {this.direction = 'left'}
            this.movePlayer(2)
          }
          this.lastKeyPressed = "a"
          break;
        case "s":
          if (this.inCollision === false || (this.inCollision === true && this.lastKeyPressed !== "s")) {
            this.movePlayer(3)
          }
          this.lastKeyPressed = "s"
          break; 
        case "d":
          if (this.inCollision === false || (this.inCollision === true && this.lastKeyPressed !== "d")) {
            if (this.direction === 'left') {this.direction = 'right'}
            this.movePlayer(4)
          }
          this.lastKeyPressed = "d"
          break;
        default:
      }
    })

    window.addEventListener('keyup', (e) => {
      if (this.moving === true && ["w","a","s","d"].includes(e.key) ) {
        this.playerFrames = 0
        this.moving = false
      }
    })
  
    for(let i=0; i<array.collision.length;i+=50) {
      this.collisionArray.push(array.collision.slice(i,50+i))
    }
    
  }

  movePlayer(direction) {
    this.inCollision = false //if the player moves, he must be out of collision
    if (this.moving) {
      switch (direction) {
        case 1:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y += 10
          })
          break;
        case 2:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x += 10
          })
          break;
        case 3:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y -= 10
          })
          break;
        case 4:
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x -= 10
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
      this.inCollision = true
      return true;
    } 
  }

  render() {

    setInterval(() => {
      if (this.moving) {
        if (this.playerFrames < 8) {
          this.playerFrames+=1
        } else if (this.playerFrames === 8) {
          this.playerFrames = 0
        }
      }
    }, 100);

    setInterval(() => {

      const drawImage = (ctx) => {
        const map = new Image();
        const player_1 = new Image();
        const collision = new Image();
        map.src = mapImage
        if (this.direction === 'right') {
          player_1.src = characterImageRight
        } else if (this.direction === 'left') {
          player_1.src = characterImageLeft
        }
        collision.src = collisionBox
        map.onload = () => {
          ctx.drawImage(map, this.movables.map.x, this.movables.map.y)
          player_1.onload = () => {
            if (this.moving) {
              ctx.drawImage(player_1,
                player_1.width/8 * this.playerFrames,
                player_1.height/11 * 2,
                player_1.width/8,
                player_1.height/11,
                1800 / 2 - player_1.width/8 / 2,
                986 / 2 - player_1.height/11,
                player_1.width/8,
                player_1.height/11
              )
            } else {
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
      
    }, 5)
    
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        <canvas ref= {this.canvasRef} width={1800} height={986} />
      </div>
    );
  }
}

export default Game;
