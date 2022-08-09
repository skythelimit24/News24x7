import React, { Component } from "react"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner";
import propTypes from 'prop-types'


export class News extends Component {
    static defaultProps ={
        country:'in',
        pageSize:5,
        category:'Entertainment'
    }
    static propTypes ={
        country:propTypes.string,
        pageSize:propTypes.number,
        category:propTypes.string,
    }
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles:[],
            loading: false,
            page:1
        }
    }
  async  componentDidMount(){
console.log("render out")
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ba8eeb31c4bc088043d9a17858986&page=1&pageSize=${this.props.pageSize}`;
this.setState({loading:true});
let data= await fetch(url);
let pardsedData= await data.json();
console.log(pardsedData);
this.setState({articles:pardsedData.articles,totalResults: pardsedData.totalResults,loading:false})

    }
    handlePreviousclick=async()=>{
console.log('prev');
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ba8eeb31c4bc088043d9a17858986&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
this.setState({loading:true});
let data= await fetch(url);
let pardsedData= await data.json();
console.log(pardsedData);
this.setState({
    page: this.state.page - 1,
    articles:pardsedData.articles,
    loading:false
    })
    }
    handleNextclick = async ()=>{
console.log('next');
if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ba8eeb31c4bc088043d9a17858986&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
this.setState({loading:true});
let data= await fetch(url);
let pardsedData= await data.json();
this.setState({
    page: this.state.page + 1,
    articles:pardsedData.articles,
    loading:false
    })
}
}
    render() {
      console.log("render")
        return (
            <div className="container my-3" >
                <h1>News24x7-Top Headlines </h1>
               {this.state.loading && <Spinner/>}
                <div className="row">
             {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}/>
             </div>
               })} 
            </div> 
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark"onClick={this.handlePreviousclick}>&larr; <b>Previous</b></button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextclick}><b>Next </b>&rarr;</button>
            </div>
            </div>
        )
    }
}

export default News