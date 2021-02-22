import React from 'react'
import Floor from './Floor'
import Doodler from './Doodler'
const WIDTH=400, HEIGHT=800, FLOOR_W=80,FLOOR_H=15,DOODLER_W=64,DOODLER_H=64
let movePlatforms=false,left=false,right=false,jumping=false,interval=null,result=0
window.onkeyup=function(e){
  if(e.key==='ArrowLeft')left=false
  if(e.key==='ArrowRight')right=false
}
window.onkeydown=function(e){
  if(e.key==='ArrowLeft')left=true
  if(e.key==='ArrowRight')right=true
}
class Grid extends React.Component{
  constructor(){
    super()
    this.state={
      'pos':[],
      'doodler':{},
      'doodler_speed':{'vel':0,'acc':10}
    }
    /*setInterval(()=>{
      this.setState((prev)=>{'doodler':{'x':prev.doodler.x,'y':prev.doodler.y+prev.doodler_speed.acc},'doodler_speed':{'vel':prev.doodler_speed.vel+prev.doodler_speed.acc,'acc',prev.doodler_speed.acc+1}})
    },1000)*/
  }
  jump(){
    console.log(++result)
    this.setState(prev=>{
      let tab=[]
      let x=Math.floor(Math.random()*(WIDTH-FLOOR_W))
      let y=20;
      tab.push({'x':x,'y':y})
      prev.pos.forEach((item, i) => {
        tab.push({'x':item.x,'y':item.y})
      });
      movePlatforms=true
      //console.log(tab)
      return {'pos':tab}
    })
  }
  colide(){
    let tak=false
    this.state.pos.forEach((platform, i) => {
      let takx=false
      let taky=false
      let doodler=this.state.doodler
      if(platform.x<doodler.x&&doodler.x<platform.x+FLOOR_W){takx=true}
      if(platform.x<doodler.x+DOODLER_W&&doodler.x+DOODLER_W<platform.x+FLOOR_W){takx=true}
      if(platform.y<=doodler.y+DOODLER_H&&doodler.y+DOODLER_H<=platform.y+FLOOR_H)taky=true
      if(this.state.doodler_speed.acc<0)takx=false
      if(!tak)tak=takx&&taky
      if(tak&&i!=this.state.pos.length-1&&jumping===false){
        jumping=true
        this.jump()
      }
    });
    return tak
  }


  control(){
    //1console.log(this.state.doodler_speed.acc)
    this.setState(prev=>({
      'doodler':{'x':prev.doodler.x+(right-left)*10,'y':prev.doodler.y+prev.doodler_speed.acc},
      'doodler_speed':{'vel':prev.doodler_speed.vel+prev.doodler_speed.acc,'acc':prev.doodler_speed.acc+1}
    }))
    if(movePlatforms){
      let gap=7
      this.setState(prev=>{
        let tab=[]
        prev.pos.forEach((item, i) => {
          if(item.y+gap>=HEIGHT){
            movePlatforms=false
            jumping=false
          }
          else tab.push({'x':item.x,'y':item.y+gap})
        });
        return {'pos':tab,'doodler':{'x':prev.doodler.x,'y':prev.doodler.y+gap}}
      })
    }
    if(this.state.doodler.y+DOODLER_H>HEIGHT){
      clearInterval(interval)
      this.setState((prev)=>({'doodler':{'x':prev.doodler.x,'y':HEIGHT-DOODLER_H}}))
    }
    if(this.colide()){
      this.setState((prev)=>{
        return {'doodler_speed':{'acc':-17,'vel':-prev.doodler_speed.vel}}
      })
    }
  }


  componentDidMount(){
    let tab=[]
    for(let i=1;i<=5;i++){
      let x=Math.floor(Math.random()*(WIDTH-FLOOR_W))
      let y=130*i+20;
      tab.push({'x':x,'y':y})
    }
    let doodler={'x':tab[tab.length-1].x+FLOOR_W/2-DOODLER_W/2,'y':tab[tab.length-1].y-170}
    this.setState({'pos':tab,'doodler':doodler})
    interval=setInterval(()=>{
      this.control()
    },50)
  }
  render(){
    const floors=this.state.pos.map(item => {
      return <Floor x={item.x} y={item.y} />
    });
    return(
      <div className='grid'>
        {floors}
        <Doodler left={left} right={right} x={this.state.doodler.x} y={this.state.doodler.y} />
      </div>
    )
  }
}


export default Grid
