import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            
            container: {
                overflow: "auto",
                color: this.props.logo.color,
                fontSize: this.props.logo.fontSize + "pt",
                borderStyle: "solid",
                borderRadius: this.props.logo.borderRadius + "pt",
                background: this.props.logo.backgroundColor,
                padding: this.props.logo.padding + "pt",
                margin: this.props.logo.margin + "pt",
                borderColor: this.props.logo.borderColor ,
                borderWidth: this.props.logo.borderWidth + "pt",
                text: this.props.logo.text[0].text,
                height: this.props.logo.height + "px",
                width: this.props.logo.width + "px",
                

            }
        }
        return (
            <div className="center-align col "
            
                style={ styles.container }>
                {this.props.logo.text.map(texts => (<div style={{fontSize: texts.fontSize, color: texts.color}}> {texts.text} </div>))}
            </div>
            
        )
    }
}

export default TextEditWorkspace