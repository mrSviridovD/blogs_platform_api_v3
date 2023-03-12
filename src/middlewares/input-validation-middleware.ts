import {NextFunction, Response, Request} from "express";
import {body, validationResult} from "express-validator";
import {bdBlogs} from "../bd/bd";

const baseValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        }
    }
})

export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = baseValidationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: errors.array() })
    } else {
        next()
    }
}

const checkId = (id: string) => {
    const foundBlog = bdBlogs.find(b => b.id === id)
    if(foundBlog) {
        return true
    } else {
        throw new Error('ID not found')
    }
}


//Blogs validation
export const nameValidation = body('name').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 15}).withMessage('Should be less than 15 symbols').bail()

export const descriptionValidation = body('description').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 500}).withMessage('Should be less than 500 symbols').bail()

export const websiteUrlValidation = body('websiteUrl').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 100}).withMessage('Should be less than 100 symbols').bail()
    .isURL().withMessage('Should be correct url').bail()

//Posts validation

export const titleValidation = body('title').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 30}).withMessage('Should be less than 30 symbols').bail()

export const shortDescriptionValidation = body('shortDescription').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 100}).withMessage('Should be less than 100 symbols').bail()

export const contentValidation = body('content').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .isLength({max: 1000}).withMessage('Should be less than 1000 symbols').bail()

export const blogIdValidation = body('blogId').trim()
    .notEmpty().withMessage(`Shouldn't be empty`).bail()
    .isString().withMessage('Should be string type').bail()
    .custom(checkId).withMessage('Should be existing id').bail()
