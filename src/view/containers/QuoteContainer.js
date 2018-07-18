import React, { Component } from "react";
import { AsyncStorage, FlatList, Text, ImageBackground } from "react-native";
import { Quote } from "../components";
import assets from "../../assets/assets"

import { connect } from "react-redux";
import { 
	quoteGetStream, 
	quoteGetBySource, 
	quoteGetByTopic, 
	quoteGetLikes, 
	quoteLike
} from "@actions/quoteActions";

class QuoteContainer extends Component {
	constructor(param){
		super(param);
		this.props.quoteGetLikes();
		//this.onLikeQuote = this.onLikeQuote.bind(this);
	}
	
	_renderQuote(item) {
		//console.log(item);
		var isLiked=false;

		if (this.props.likes){
			isLiked = this.props.likes.indexOf(item.item.qID)>-1;
		}
			
		//console.log('is liked equals '+isLiked);

		return <Quote 
			item={item} 
			contentStyle={(parseInt(Math.random()*6)+1).toString()} 
			postPhotoNo={(parseInt(Math.random() * 27) + 1).toString()}
			liked = {isLiked}
			navigation={this.props.navigation}
			onLike={async ()=>{await this.onLikeQuote(item.item.qID)}}
			/>;
	}

	onLikeQuote= (qID) =>{
		this.props.quoteLike(qID);
	}

	componentDidMount() {
		switch (this.props.qType){
			case "Feed":
				this.props.quoteGetStream(null);
				break;
			case "Source":
				this.props.quoteGetBySource(this.props.qSID);
				break;
			case "Topic":
				this.props.quoteGetByTopic(this.props.qTID);
				break;
		}
	}

	render() {
		
		if (!this.props.quotes || this.props.quotes == []) {
			return <Text>Loading</Text>;
		}

		return (
			
			<ImageBackground
                source={assets.images.pattern}
				style={{width:null, height:null, backgroundColor:"rgba(255,255,255,0.6)"}}
				imageStyle={{flex:1, resizeMode: "stretch"}}
            >
				
				<FlatList
					data={this.props.quotes}
					keyExtractor={item => {
						return item.date;
					}}
					renderItem={item => {
						return this._renderQuote(item);
					}}
					onEndReached={()=>this.props.quoteGetStream({lastDate:this.props.quotes[this.props.quotes.length-1].date})}
				/>
			</ImageBackground>
		);
	}
}

function mapStateToProps(state, ownProps) {
	
	var renderedQuotes=[];

	switch (ownProps.qType){
		case 'Feed':
			renderedQuotes = state.feedQuotes
			break;
		case 'Search':
			renderedQuotes = state.searchQuotes;
			break;
		case 'Source':
			renderedQuotes = state.sourceQuotes;
			break;
		case 'Topic':
			renderedQuotes = state.topicQuotes;
			break;
	}
	
	return {
		quotes: renderedQuotes,
		likes: state.likes
	};
}

function mapDispatchToProps(dispatch) {
	return {
		quoteGetStream: param => {
			dispatch(quoteGetStream(param));
		},
		quoteGetBySource: sID => {
			dispatch(quoteGetBySource(sID));
		},
		quoteGetByTopic: tID => {
			dispatch(quoteGetByTopic(tID));
		},
		quoteGetLikes: () =>{
			dispatch(quoteGetLikes());
		},
		quoteLike: total =>{
			//alert(total);
			dispatch(quoteLike(total));
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuoteContainer);
