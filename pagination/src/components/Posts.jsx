const Posts = ({ postData }) => {
    return (
        <div className="post-container">
            {
                postData?.map((data) => (
                    <img src={data.download_url} key={data.id} alt={data.author}/>
                ))
            }
        </div>
    )
}

export default Posts;