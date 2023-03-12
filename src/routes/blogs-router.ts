import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {
    descriptionValidation,
    inputValidation,
    nameValidation,
    websiteUrlValidation
} from "../middlewares/input-validation-middleware";

import {auth} from "../middlewares/basic-auth";

export const blogsRouter = Router({});


blogsRouter.get('/', (req:Request,res:Response) => {
    res.status(200).send(blogsRepository.returnAllBlogs());
})

blogsRouter.get('/:id', (req:Request,res:Response) => {
    const foundBlog = blogsRepository.findBlog(req.params.id)
    if(foundBlog){
        res.status(200).send(foundBlog)
    }
    else{
        res.sendStatus(404)
    }
})

blogsRouter.delete('/:id', auth,(req:Request,res:Response) => {
    if(blogsRepository.deleteBlog(req.params.id)){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})

blogsRouter.post ('/',auth, nameValidation,descriptionValidation,websiteUrlValidation,inputValidation,(req:Request,res:Response) => {
    const newBlog = blogsRepository.createBlog(req.body)
    res.status(201).send(newBlog)
})

blogsRouter.put('/:id',auth, nameValidation,descriptionValidation,websiteUrlValidation,inputValidation,(req:Request,res:Response) => {
    const updateBlog = blogsRepository.updateBlogById(req.params.id, req.body)
    if(updateBlog){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }
})