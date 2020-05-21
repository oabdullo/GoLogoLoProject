import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import TextEditWorkspace from './TextEditWorkspace.js';
const ADD_LOGO = gql`
    mutation AddLogo(
        $text: [textInput]!,
        $url: [urlInput]!,
        $height: Int!,
        $width: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            url: $url,
            height: $height,
            width: $width,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;
const LogoDefaults = {
    TEXT : [{
        text: "text",
        fontSize: 12,
        color : "#000000",
        x: 12,
        y: 12
    }],
    URL :[{
        url: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        height: 45,
        width: 45,
        x: 12, 
        y: 40
    }],
    TEXT_COLOR : "#FF0000",
    FONT_SIZE : 24,
    BORDER_RADIUS: 12,
    BACKGROUND_COLOR:"#AA0000",
    MARGIN: 12,
    BORDER_COLOR: "#AA00FF",
    BORDER_THICKNESS: 2,
    PADDING: 2,
    HEIGHT: 400,
    WIDTH: 400
  
  }
class CreateLogoScreen extends Component {
    flag= false;
    handleUrlCoordinates=(e, data, index)=>{
        this.state.url[index].x = data.x;
        this.state.url[index].y = data.y;
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }

    handleCoordinates=(e, data, index)=>{
        this.state.text[index].x = data.x;
        this.state.text[index].y = data.y;
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleAddText=(event)=>{
        let temp ={

            text: this.state.text[0].text,
            fontSize: this.state.fontSize,
            color: this.state.color,
            height: 45,
            width: 45,
            x: 12,
            y: 12
        }
        this.state.text.push(temp)
        this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleAddImage=(event)=>{
        let temp ={
            url: this.state.url[0].url,
            height:45,
            width: 45,
            x: 12,
            y: 12
        }
        this.state.url.push(temp)
        this.setState({text: this.state.text,  url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }     
    handleTextChange=(event)=>{
        this.state.text[0].text = event.target.value
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleURLChange=(event)=>{
        this.state.url[0].url = event.target.value
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleBackgroundChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: event.target.value, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleColorChange=(event)=>{
        this.state.text[0].color = event.target.value
        this.setState({text: this.state.text, url: this.state.url, color: event.target.value, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleBorderColorChange=(event)=>{
        this.setState({text: this.state.text,url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: event.target.value, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleFontSizeChange=(event)=>{
        this.state.text[0].fontSize = event.target.value
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: event.target.value, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleHeightChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: event.target.value, width: this.state.width})
        this.flag= true;
    }
    handleWidthChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: event.target.value})
        this.flag= true;
    }
    handleBorderWidthChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:event.target.value, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleBorderRadiusChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:event.target.value, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handlePaddingChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:event.target.value, height: this.state.height, width: this.state.width})
        this.flag= true;
    }
    handleMarginChange=(event)=>{
        this.setState({text: this.state.text, url: this.state.url, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:event.target.value, padding:this.state.padding, height: this.state.height, width: this.state.width})
        this.flag= true;
    }

    constructor(props){
        super(props)
        
        
    }

    render() {
        let text, url,  width, height,  color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin;
        if(!this.flag){
            this.state= {
                text:LogoDefaults.TEXT,
                url: LogoDefaults.URL,
                color: LogoDefaults.TEXT_COLOR,
                backgroundColor: LogoDefaults.BACKGROUND_COLOR,
                borderColor: LogoDefaults.BORDER_COLOR,
                fontSize: LogoDefaults.FONT_SIZE,
                borderRadius: LogoDefaults.BORDER_RADIUS,
                borderWidth: LogoDefaults.BORDER_THICKNESS,
                padding: LogoDefaults.PADDING,
                margin:LogoDefaults.MARGIN,
                height: LogoDefaults.HEIGHT,
                width: LogoDefaults.WIDTH
            }
        }
        
        return (
            
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            <button type="button" onClick={this.handleAddText} className="btn btn-success">Add Text</button>
                            <button type="button" onClick={this.handleAddImage} className="btn btn-primary">Add Image</button>

                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: this.state.text, url: this.state.url, height : parseInt(this.state.height), width: parseInt(this.state.width) , 
                                                            backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor,
                                                            borderWidth: parseInt(this.state.borderWidth), borderRadius: parseInt(this.state.borderRadius),
                                                            padding: parseInt(this.state.padding), margin: parseInt(this.state.margin)} });
                                    text.value= "";
                                    url.value= "";
                                    width.value = "";
                                    height.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderWidth.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} onChange={this.handleTextChange} placeholder="Text" defaultValue={LogoDefaults.TEXT[0].text} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={this.handleFontSizeChange} defaultValue={this.state.fontSize} placeholder="Font Size" />
                                    </div>
                                    
                                    
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={this.handleColorChange} defaultValue={this.state.color} placeholder="Color" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="url"> URL:</label>
                                        <input type="text" className="form-control" name="url" ref={node => {
                                            url = node;
                                        }} onChange={this.handleURLChange} placeholder="Url" defaultValue={LogoDefaults.URL[0].url} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={this.handleBackgroundChange} defaultValue={this.state.backgroundColor} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={this.handleBorderColorChange} defaultValue={this.state.borderColor} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group col-8">
                                                    <label htmlFor="height">Height :</label>
                                                    <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 1400);}} className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} onChange={this.handleHeightChange}  defaultValue={LogoDefaults.HEIGHT} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="width">Width :</label>
                                                    <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 1400);}} className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} onChange={this.handleWidthChange} defaultValue={LogoDefaults.WIDTH} />
                                                </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={this.handleBorderWidthChange} defaultValue={this.state.borderWidth} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={this.handleBorderRadiusChange} defaultValue={this.state.borderRadius} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={this.handlePaddingChange} defaultValue={this.state.padding} placeholder="Padding" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={this.handleMarginChange} defaultValue={LogoDefaults.MARGIN} placeholder="Margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                   
                                </form>
                                {/* <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        overflow: "auto",
                                        height: (this.state.renderHeight ? this.state.renderHeight : 100) + "px",
                                        width: (this.state.renderWidth ? this.state.renderWidth : 100) + "px",
                                        color: this.state.renderColor ? this.state.renderColor : "#000000",
                                        backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#FFFFFF",
                                        borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#000000",
                                        borderStyle: "solid",
                                        fontSize: (this.state.renderFontSize ? this.state.renderFontSize : 12) + "pt",
                                        borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 5) + "px",
                                        borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 5) + "px",
                                        padding: (this.state.renderPadding ? this.state.renderPadding : 0) + "px",
                                        margin: (this.state.renderMargin ? this.state.renderMargin : 0) + "px"
                                    }}>{this.state.renderText.text ? this.state.renderText[0].text: "New Logo"}</span>
                                </div> */}
                                <div className="col 6 overflow- auto" > <TextEditWorkspace handleCoordinates={this.handleCoordinates} handleUrlCoordinates={this.handleUrlCoordinates} logo={this.state} /> </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;