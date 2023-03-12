import {Router, Request, Response} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {
    blogIdValidation,
    contentValidation, inputValidation,
    shortDescriptionValidation,
    titleValidation
} from "../middlewares/input-validation-middleware";
import {auth} from "../middlewares/basic-auth";

export const postsRouter = Router({});


postsRouter.get('/', (req:Request,res:Response) => {
    res.send(postsRepository.returnAllPost());
})

postsRouter.get('/:id', (req:Request,res:Response) => {
    const foundPost = postsRepository.findPost(req.params.id)
    if(!foundPost){
        res.sendStatus(404)
    }
    res.send(foundPost)
})

postsRouter.delete('/:id',auth, (req:Request,res:Response) => {
    const deletePost = postsRepository.deletePost(req.params.id)
    if(!deletePost){
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

postsRouter.post('/',auth,titleValidation,shortDescriptionValidation,contentValidation,blogIdValidation,inputValidation,(req:Request,res:Response) => {
    const newBlog = postsRepository.createPost(req.body)
    if(!newBlog){
        res.sendStatus(404);
    }
    res.status(201).send(newBlog)
})

postsRouter.put('/:id',auth,titleValidation,shortDescriptionValidation,contentValidation,blogIdValidation,inputValidation,(req:Request,res:Response) => {
    const updatePost = postsRepository.updatePostById(req.params.id, req.body)
    if(!updatePost){
        res.sendStatus(404)
    }
        res.sendStatus(204)
})