import React from 'react'

class Doodler extends React.Component{
  constructor(){
    super()
    this.state={
      'left':false,
      'right':false,
      'transform':'scaleX(-1)'
    }
  }
  render(){
    if(this.props.left===this.state.left&&this.props.right===this.state.right){}
    else {
      let t=''
      if(this.props.right===false&&this.props.left===false)t=this.state.trnsform
      else t=`scaleX(${this.props.left?-1:1})`
      this.setState({'right':this.props.right,'left':this.props.left,'transform':`${t}`})
    }
    return(
      <div className='doodler' style={{top:`${this.props.y}px`,left:`${this.props.x}px`,transform:`${this.state.transform}`}}>
      </div>

    )
  }


}

export default Doodler
