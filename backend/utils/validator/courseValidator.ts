import { z } from "zod";
import { createEntityValidators } from "./createEntityValidators";
import zodValidator from "../../middlewares/validatorMiddleware";
const validators = createEntityValidators({ entityName: "Course" });

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid course ID format"
});

export const createCourseSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        description: z.string().min(20).max(2000),
        instructor: mongoId,
        duration: z.string().optional(),
        lessonsCount: z.coerce.number().optional(),
        price: z.coerce.number(),
        priceAfterDiscount: z.coerce.number().optional(),
        imageCover: z.string(),
        images: z.array(z.string()).optional(),
        category: mongoId,
        subcategories: z.array(mongoId).optional(),
    }),
});

export const updateCourseSchema = z.object({
    params: z.object({
        id: mongoId,
    }),

    body: z.object({
        title: z.string().min(3).optional(),
        slug: z.string().optional(),
        description: z.string().max(2000).optional(),
        instructor: mongoId.optional(),
        duration: z.string().optional(),
        lessonsCount: z.coerce.number().optional(),
        price: z.coerce.number().optional(),
        priceAfterDiscount: z.coerce.number().optional(),
        imageCover: z.string().optional(),
        images: z.array(z.string()).optional(),

        category: mongoId.optional(),
        subcategories: z.array(mongoId).optional(),

        ratingsAverage: z.number().min(1).max(5).optional(),
        ratingsQuantity: z.number().optional(),
    }),
});

export const updateCourseValidator = zodValidator(updateCourseSchema)

export const createCourseValidator = zodValidator(createCourseSchema)

export const getCourseValidator = validators.getValidator;

export const deleteCourseValidator = validators.deleteValidator;
