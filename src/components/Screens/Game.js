import React from "react";
import mapImage from '../../assets/test-map.png'
import characterImage from '../../assets/Character/character-1.png'
import collisionBox from '../../assets/collision.png'
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
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case "w":
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y += 20
          })
          console.log(e)
          break;
        case "a":
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x += 20
          })
          break;
        case "s":
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.y -= 20
          })
          break; 
        case "d":
          Object.entries(this.movables).forEach(([key, entry])=> {
            entry.x -= 20
          })
          break;
        default:
          break
      }
    })
    for(let i=0; i<array.collision.length;i+=50) {
      this.collisionArray.push(array.collision.slice(i,50+i))
    }
    
  }

  render() {
    setInterval(() => {

      const drawImage = (ctx) => {
        const map = new Image();
        const player_1 = new Image();
        const collision = new Image();
        map.src = mapImage
        player_1.src = characterImage
        collision.src = collisionBox
        map.onload = () => {
          ctx.drawImage(map, this.movables.map.x, this.movables.map.y)
          player_1.onload = () => {
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
            this.collisionArray.forEach((row,index)=>{
              row.forEach((coords, index2) => {
                if (coords === 1645) {
                  ctx.drawImage(
                    collision,
                    (index2 * 56) + this.movables.collision.x,
                    (index * 56) + this.movables.collision.y
                  )
                }
              })
            })
          }
          }
        }
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d');
        drawImage(ctx)
      
    }, 5);
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        <canvas ref= {this.canvasRef} width={1800} height={986} />
      </div>
    );
  }
}

export default Game;
