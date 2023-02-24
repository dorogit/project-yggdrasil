import React from "react";
import mapImage from '../../assets/test-map.png'
import characterImage from '../../assets/Character/character-1.png'
class Game extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.mapX = -585
    this.mapY = -50
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case "w":
          this.mapY +=20
          break;
        case "a":
          this.mapX -=20
          break;
        case "s":
          this.mapY -=20
          break; 
        case "d":
          this.mapX +=20
          break;
        default:
          break
      }
    })
  }

  render() {
    setInterval(() => {

      const drawImage = (ctx) => {
        const map = new Image();
        const player_1 = new Image();
        map.src = mapImage
        player_1.src = characterImage
        map.onload = () => {
          ctx.drawImage(map, this.mapX, this.mapY)
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
          }
          }
        }
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d');
        drawImage(ctx)
      
    }, 1000);
    return (
      <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        <canvas ref= {this.canvasRef} width={1800} height={986} />
      </div>
    );
  }
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