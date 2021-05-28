import {Router} from "express";
import {requiresAuth} from "../../utils/middlewares/requires-auth.middleware";
import {
    FileUploadDirectoryPath ,
    FileUploadInterface ,
    Next ,
    RequestInterface ,
    ResponseInterface ,
    SUCCESS , uuid
} from "../../utils";
import createHttpError from "http-errors";
import path from "path";
import {Schema} from "../../../database/schema";

const router = Router ();

async function handleFileUpload(req: RequestInterface , res: ResponseInterface , next: Next) {
    try {
        const UserId = (req as any).userId;
        const files: FileUploadInterface[] = (req as any).files.files;

        if (!files || Object.keys (files).length === 0) {
            throw new createHttpError.Forbidden ('No files has been attached!');
        }

        if (files.length < 2) throw new createHttpError.Forbidden ('Please select at least 2 photos of yours')


        // Looping through various
        // fileIterators and storing them - Multiple FileUploads
        const uploadImages: any[] = [];

        for (const file of files) {
            const fileName: string = `${file.md5}${path.extname (file.name)}`;
            const savePath: string = `${FileUploadDirectoryPath}/${fileName}`;
            await file.mv (savePath);

            uploadImages.push ({
                id :uuid () ,
                filename :`uploads/${fileName}` ,
                UserId
            });
        }

        await Schema.ProfilPicture.bulkCreate ([...uploadImages]);
        next ();

    } catch (e) {
        next (e);
    }
}

// [POST] : ProfilePicture Upload Service
router.post ('/upload' , requiresAuth , handleFileUpload , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        return res.status (202).send ({
            ...SUCCESS ,
            message :'user profile picture has been updated!'
        })

    } catch (e) {
        next (e);
    }
})

// [DELETE]: Delete User Profile Picture
router.delete ('/delete/:pictureId' , requiresAuth , async (req: RequestInterface , res: ResponseInterface , next: Next) => {
    try {
        const UserId = (req as any).userId;
        const pictureId = (req as any).params.pictureId;
        await Schema.ProfilPicture.destroy ({where: {id: pictureId}});

        return res.status (202).send ({
            ...SUCCESS ,
            message :'user image has been removed from profile picture!'
        })

    } catch (e) {
        next (e);
    }
})


export default router;
