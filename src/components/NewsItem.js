import React, { Component } from "react"

export class NewsItem extends Component {
    render() {
        let {title, description,imageUrl,url} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl?"https://cdn.cssauthor.com/wp-content/uploads/2018/06/Simple-Loader.gif?strip=all&lossy=1&resize=800%2C600&ssl=1":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem