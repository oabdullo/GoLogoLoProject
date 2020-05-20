import React, { Component } from 'react'
import {Rnd} from "react-rnd";
// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    handleCoordinates=(e, data, index)=>{
        this.props.logo.text[index].x = data.x;
        this.props.logo.text[index].y = data.y;

    }
    handleUrlCoordinates=(e, data, index)=>{
        this.props.logo.url[index].x = data.x;
        this.props.logo.url[index].y = data.y;
    }
    render() {
        const styles = {
            
            container: {
                overflow: "auto",
                color: this.props.logo.text[0].color,
                fontSize: this.props.logo.text[0].fontSize + "pt",
                borderStyle: "solid",
                borderRadius: this.props.logo.borderRadius + "pt",
                background: this.props.logo.backgroundColor,
                padding: this.props.logo.padding + "pt",
                margin: this.props.logo.margin + "pt",
                borderColor: this.props.logo.borderColor ,
                borderWidth: this.props.logo.borderWidth + "pt",
                
                height: this.props.logo.height + "px",
                width: this.props.logo.width + "px",
                

            }
        }
        return (
            <div className="center-align col "
            
                style={ styles.container }>
                {this.props.logo.text.map((texts, index) => (<Rnd position={{ x: texts.x, y: texts.y }} 
  onDragStop={(e, data) => {this.handleCoordinates(e,data,index)}} key={index} style={{fontSize: texts.fontSize, color: texts.color}}> {texts.text}  </Rnd>))}
              {this.props.logo.url.map((url, index) => (<Rnd position={{ x: url.x, y: url.y }} 
  onDragStop={(e, data) => {this.handleUrlCoordinates(e,data,index)}} key={index} > <img src={url.url} />  </Rnd>))}
            </div>
            
        )
    }
}

export default TextEditWorkspace