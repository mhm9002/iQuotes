import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { Topic } from "../components";

import { connect } from "react-redux";
import topicGetStream from "../../actions/topicActions";

class TopicContainer extends Component {
  _renderTopic(item) {
    //console.log(item);
    return <Topic item={item} navigation={this.props.navigation} />;
  }

  componentDidMount() {
    if (this.props.qType == "Main") {
      this.props.topicGetStream(null);
    }
  }

  filterTopics(){
    return this.props.mainTopics.filter((item)=>{
        return item.topic.indexOf(this.props.filter)>-1
    })
  }

  render() {
    //revise after adding more qTypes
    var renderedTopics = this.filterTopics( this.props.mainTopics);
        

    if (!renderedTopics || renderedTopics == []) {
      return <Text>Loading</Text>;
    }

    return (
      <FlatList
        data={renderedTopics}
        keyExtractor={item => {
          return item.tID;
        }}
        renderItem={item => {
          return this._renderTopic(item);
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    mainTopics: state.mainTopics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    topicGetStream: param => {
      dispatch(topicGetStream(param));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicContainer);
