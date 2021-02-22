import React from 'react'

class Floor extends React.Component{
  render(){
    return(
      <div className='floor' style={{top:`${this.props.y}px`,left:`${this.props.x}px`}}>
      </div>
    )
  }
}

//{this.props.x} {this.props.y}
export default Floor
