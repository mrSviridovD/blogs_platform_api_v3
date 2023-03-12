export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export let bdBlogs: Array <Blog> = [ {
    "id": "1",
    "name": "IT Kamasutra",
    "description": "Tut vse ili net",
    "websiteUrl": "http://test.test"
}]

export let bdPosts: Array <Post> = [
    {
        id: "1",
        title: "Post 666 IT",
        shortDescription: "Satanisti IT 666",
        content: "666 666 666 666 999 666 666 666",
        blogId: "1",
        blogName: "NameBlog"
    }
];
