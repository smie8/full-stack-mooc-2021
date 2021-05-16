const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let mostLikesIndex = 0

    for(let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > blogs[mostLikesIndex].likes) {
            mostLikesIndex = i
        }
    }

    if (blogs.length === 0) {
        return 0
    }

    return blogs[mostLikesIndex]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    let authors = blogs.map(blog => blog.author)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(authorname => ({ author: authorname, blogs: 0 }))

    for(let i = 0; i < blogs.length; i++) {
        for(let j = 0; j < authors.length; j++) {
            if (blogs[i].author === authors[j].author) {
                authors[j].blogs += 1
            }
        }
    }

    let mostBlogs = authors[0]
    for(let i = 0; i < authors.length; i++) {
        if (authors[i].blogs > mostBlogs.blogs) {
            mostBlogs = authors[i]
        }
    }

    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    let authors = blogs.map(blog => blog.author)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(authorname => ({ author: authorname, likes: 0 }))

    for(let i = 0; i < blogs.length; i++) {
        for(let j = 0; j < authors.length; j++) {
            if (blogs[i].author === authors[j].author) {
                authors[j].likes += blogs[i].likes
            }
        }
    }

    let mostLikes = authors[0]
    for(let i = 0; i < authors.length; i++) {
        if (authors[i].likes > mostLikes.likes) {
            mostLikes = authors[i]
        }
    }

    return mostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}