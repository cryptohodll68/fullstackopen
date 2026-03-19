const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, item) => {
    return total + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const mostLiked = (blogs) => {
  const likesList = blogs.map(blog => blog.likes)
  const higher = Math.max(...likesList)

  return blogs.find(blog => blog.likes === higher)
}

const mostBlogs = (blogs) => {
  const counts = {}
  blogs.forEach(blog => {
  const author = blog.author

  if (!counts[author]) {
    counts[author] = 0
  }

  counts[author] += 1
})
  const maxPublish = Math.max(...Object.values(counts))
  const topPublisher = Object.keys(counts).find(key => counts[key] === maxPublish)
  return {author: topPublisher, blogs: maxPublish}
}

const mostLikes = (blogs) => {
  const counts = {}

  blogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes

    if(!counts[author]){
      counts[author] = likes
    } else {
      counts[author] += likes
    }
    
  })
  console.log(counts)

  const max = Math.max(...Object.values(counts))
  const target = Object.keys(counts).find(key => counts[key] === max)
  return {author: target, likes: max}
  
}
module.exports = {dummy, totalLikes, mostLiked, mostBlogs, mostLikes}