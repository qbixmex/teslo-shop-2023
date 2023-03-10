import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
// import { db } from '../../../../database';
// import { IProduct } from '../../../../interfaces';
// import { Product } from '../../../../models';

//* CLOUDINARY CONFIGURATION
cloudinary.config( process.env.CLOUDINARY_URL ?? '');

type Data = { message: string };

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = (request: NextApiRequest, response: NextApiResponse<Data>) => {
  switch (request.method) {
    case 'POST':
      return uploadFile(request, response);
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

//* File System Save Image
//? const saveFile = (file: formidable.File) => {
//?   const data = fs.readFileSync(file.filepath);
//?   fs.writeFileSync(`./public/${file.originalFilename}`, data);
//?   fs.unlinkSync(file.filepath); // Delete temporary file
//?   return;
//? };

const saveFile = async (file: formidable.File) => {
  const data = await cloudinary.uploader.upload(file.filepath);
  fs.unlinkSync(file.filepath); // Delete temporary file
  return data.secure_url;
};

const parseFiles = (request: NextApiRequest): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(request, async (error, fields, files) => {
      if (error) return reject(error);
      const fileURL = await saveFile(files.file as formidable.File);
      resolve(fileURL);
    });
  });
};

const uploadFile = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  const imageURL = await parseFiles(request);
  return response.status(200).json({ message: imageURL });
};

export default handler;
