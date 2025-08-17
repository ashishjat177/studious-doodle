const Post = ({ list }) => {
    return (
        <>
            {list?.map((item, index) => (
                <div key={`${item.id}-${index}`} style={{height: '400px'}}>
                    <img src={item.download_url} alt={item.author} height={400} width={300}/>
                </div>
            ))}
        </>
    )
}

export default Post;