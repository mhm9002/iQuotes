import React, { Component } from 'react';
import { FlatList, Text } from "react-native";
import { Source } from '../components';

import { connect } from 'react-redux';
import sourceGetStream from '../../actions/sourceActions';

class SourceContainer extends Component{
    _renderSource(item){
        //console.log(item);
        return (<Source item={item} navigation={this.props.navigation} />);
    }

    componentDidMount(){
        if (this.props.qType=="Main"){
            this.props.sourceGetStream(null);
        }
    }

    loadMoreSources(){
        if (this.props.qType=="Main"){
            this.props.sourceGetStream({'page':this.props.mainSources.length});
        }
    }

    filterSouces(){
        return this.props.mainSources.filter((item)=>{
            return item.source.indexOf(this.props.filter)>-1
        })
    }

    render(){
        //need futher review when more qTypes introduced
        var renderedSources = this.filterSouces();
        
        if (!renderedSources || renderedSources==[]){
            return (<Text>Loading</Text>);
        } 



        return (
            <FlatList
                data={renderedSources}
                keyExtractor={(item)=>{return item.sID}}
                renderItem={(item)=>{return this._renderSource(item)}}
            />
        );

        // and this for drag down.
        //onScrollEndDrag={()=>this.loadMoreSources()}

    }
}

function mapStateToProps(state) {
    return {
        mainSources: state.mainSources,
    };
}

function mapDispatchToProps(dispatch) {
    return{
        sourceGetStream: (param) => {
            dispatch(sourceGetStream(param))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceContainer);