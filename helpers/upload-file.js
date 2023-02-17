import path from "path"
import { fileURLToPath } from 'node:url';
// DEPENDENCIES
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (files, allowedExtensions = ["jpg", "png", "jpeg", "gif"], folder = '')=>{
    return new Promise((resolve, reject)=>{
        const {file} = files;
        const splitName = file.name.split(".")
        const extension = splitName[splitName.length - 1]
    
        if(!allowedExtensions.includes(extension)){
            return reject(`${extension} is no allowed - ${allowedExtensions}`)
        }
    
        const temporaryName = uuidv4() + "." + extension
        let uploadPath = path.join( __dirname, '../uploads/', folder, temporaryName );
            
        file.mv(uploadPath, (err)=> {
            if (err) {
                console.log(err);
                return reject(err)
            }
    
            resolve( temporaryName )
        });
    })
}

export {
    uploadFile
}