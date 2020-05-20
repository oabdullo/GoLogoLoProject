import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import * as html2canvas from 'html2canvas';
import TextEditWorkspace from './TextEditWorkspace.js';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text{
                text
                fontSize
                color
                x
                y
            }
            height
            width
            color
            fontSize
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $height: Int!,
        $width: Int!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                height: $height,
                width: $width,
                color: $color,
                fontSize: $fontSize
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;
const LogoDefaults = {
    TEXT : [{
        text: "text",
        fontSize: 12,
        color : "#AA0000",
        x: 12,
        y: 12
    }],
    TEXT_COLOR : "#FF0000",
    FONT_SIZE : 24,
    BORDER_RADIUS: 12,
    BACKGROUND_COLOR:"#AA0000",
    MARGIN: 12,
    BORDER_COLOR: "#AA00FF",
    BORDER_THICKNESS: 2,
    PADDING: 2,
    HEIGHT: 100,
    WIDTH: 400
  
  }
class EditLogoScreen extends Component {

        flag= false;
        handleTextChange=(event)=>{
            this.state.text[0].text = event.target.value
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleBackgroundChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: event.target.value, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleColorChange=(event)=>{
            this.setState({text: this.state.text, color: event.target.value, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleBorderColorChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: event.target.value, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleFontSizeChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: event.target.value, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleHeightChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: event.target.value, width: this.state.width})
            this.flag= true;
        }
        handleWidthChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: event.target.value})
            this.flag= true;
        }
        handleBorderWidthChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:event.target.value, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleBorderRadiusChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:event.target.value, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handlePaddingChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:this.state.margin, padding:event.target.value, height: this.state.height, width: this.state.width})
            this.flag= true;
        }
        handleMarginChange=(event)=>{
            this.setState({text: this.state.text, color: this.state.color, backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, fontSize: this.state.fontSize, borderRadius:this.state.borderRadius, borderWidth:this.state.borderWidth, margin:event.target.value, padding:this.state.padding, height: this.state.height, width: this.state.width})
            this.flag= true;
        }

    constructor(props){
        super(props)
    
        
    }

    render() {
        let text, height, width, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin;
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(!this.flag){
                        this.state= {
                            text:data.logo.text,
                            color: data.logo.color,
                            backgroundColor:data.logo.backgroundColor,
                            borderColor:data.logo.borderColor,
                            fontSize:data.logo.fontSize,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            margin : data.logo.margin,
                            padding : data.logo.padding
                        }
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, height: parseInt(height.value), width: parseInt(width.value) ,color: color.value, fontSize: parseInt(fontSize.value),
                                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                                            padding: parseInt(padding.value), margin: parseInt(margin.value)  } });
                                                text.value = "";
                                                height.vaule= "";
                                                width.value = "";
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
                                        }} onChange={this.handleMarginChange} defaultValue={this.state.margin} placeholder="Margin" />
                                    </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {/* <div className="col-6" >
                                                <span style={{
                                                    display: "inline-block",
                                                    overflow: "auto",
                                                    height: (this.state.renderHeight ? this.state.renderHeight : data.logo.height) + "px",
                                                    width: (this.state.renderWidth ? this.state.renderWidth : data.logo.width) + "px",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px"
                                                }}>{this.state.renderText ? this.state.renderText :  data.logo.text}</span>
                                            </div> */}
                                            <div className="col 6 overflow- auto" > <TextEditWorkspace logo={this.state} /> </div>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;