import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {blogsRouter} from "./routes/blogs-router";
import {blogsRepository} from "./repositories/blogs-repository";
import {postsRouter} from "./routes/post-router";
import {postsRepository} from "./repositories/posts-repository";

export const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/blogs',blogsRouter)
app.use('/posts', postsRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server starting - ${port} port`)
})


//TESTING - DELETE ALL DATA
app.delete('/testing/all-data', (req: Request,res: Response) => {
   // postsRepository.deleteAllData();
    blogsRepository.deleteAllData();
    postsRepository.deleteAllData();
    res.sendStatus(204)
});



