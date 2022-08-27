import React, { Component } from "react"
import NewsItem from "./NewsItem"
import Spinner from "./Spinner";
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
   static propTypes ={
        pageSize:propTypes.number,
        category:propTypes.string,
    }
 capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
    constructor(props){
        super(props);
        this.state = {
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
    document.title=`News24X7-${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});    
    let data= await fetch(url);
    this.props.setProgress(30);
        let pardsedData= await data.json();
        this.props.setProgress(50);
        this.setState({articles:pardsedData.articles,totalResults: pardsedData.totalResults,loading:false})
        this.props.setProgress(100);
    }
    
  async  componentDidMount(){
    this.updateNews();
    }
    handlePreviousclick=async()=>{
this.setState({page:this.state.page - 1})
this.updateNews();
    }
    handleNextclick = async ()=>{
this.setState({page:this.state.page + 1});
this.updateNews();
    }
    fetchMoreData = async () => {
       this.setState({page:this.state.page + 1})
       const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d51ba8eeb31c4bc088043d9a17858986&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let pardsedData= await data.json();
        this.setState({articles:this.state.articles.concat(pardsedData.articles),totalResults: pardsedData.totalResults,loading:false})
       };

    render() {
        return (
            <>
            <h1>News24x7-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner/>} 
               <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >  
        <div className="container">
         <div className="row">
             { this.state.articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title?element.title :""} description={element.description?element.description:""} imageUrl={element.urlToImage} url={element.url} author={element.author?element.author:""} date={element.publishedAt} source={element.source.name}/>
             </div>
               })} 
            </div> 
            </div>
            </InfiniteScroll>
            </>
        )
            }
        }


export default News