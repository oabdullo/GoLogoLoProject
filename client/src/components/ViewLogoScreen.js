import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {filter} from "graphql-anywhere"
import TextEditWorkspace from './TextEditWorkspace.js';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text{
                text
                color
                fontSize
                x
                y
            }
            url{
                url
                height
                width
                x
                y
            }
            height
            width
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
    
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let fill = filter(GET_LOGO, data);
                        this.state= {
                            text:fill.logo.text,
                            url: fill.logo.url,
                            color: fill.logo.text[0].color,
                            backgroundColor:fill.logo.backgroundColor,
                            borderColor:fill.logo.borderColor,
                            fontSize:fill.logo.text[0].fontSize,
                            borderRadius: fill.logo.borderRadius,
                            borderWidth: fill.logo.borderWidth,
                            margin : fill.logo.margin,
                            padding : fill.logo.padding,
                            height: fill.logo.height,
                            width: fill.logo.width
                        }
                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-6">
                                        <dl>
                                            <dt>Text:</dt>
                                            <dd>{data.logo.text[0].text}</dd>
                                            <dt>Height:</dt>
                                            <dd>{data.logo.height}</dd>
                                            <dt>width:</dt>
                                            <dd>{data.logo.width}</dd>
                                            <dt>Color:</dt>
                                            <dd>{data.logo.text[0].fontSize}</dd>
                                            <dt>URL</dt>
                                            <dd>{data.logo.url[0].url}</dd>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{data.logo.text[0].fontSize}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>

                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                    {/* <div className="col-6">
                                        <span style={{
                                            overflow: "auto",
                                            display: "inline-block",
                                            color: data.logo.text[0].color,
                                            height: data.logo.height,
                                            width:  data.logo.width,
                                            backgroundColor: data.logo.backgroundColor,
                                            borderColor: data.logo.borderColor,
                                            borderStyle: "solid",
                                            fontSize: data.logo.text[0].fontSize + "pt",
                                            borderWidth: data.logo.borderWidth + "px",
                                            borderRadius: data.logo.borderRadius + "px",
                                            padding: data.logo.padding + "px",
                                            margin: data.logo.margin + "px"
                                        }}>{data.logo.text[0].text}</span>
                                    </div> */}
                                    <div className="col 6 overflow- auto" > <TextEditWorkspace logo={this.state} /> </div>

                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;