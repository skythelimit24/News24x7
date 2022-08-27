import React from "react"
const NewsItem =(props)=> {
        let { title,description,imageUrl,url, author,date,source} = props;
        return (
            <div className="my-3" >
                <div className="card">
                <div style={
                    {display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}
                }>
                <span className=" badge rounded-pill bg-danger">{source}
                        </span>
                        </div>
                    <img src={!imageUrl ? "https://cdn.cssauthor.com/wp-content/uploads/2018/06/Simple-Loader.gif?strip=all&lossy=1&resize=800%2C600&ssl=1":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Published By : <b>{!author ? "unknown" : author}</b> on =<b>{new Date(date).toGMTString()}</b></small></p>
                        <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem