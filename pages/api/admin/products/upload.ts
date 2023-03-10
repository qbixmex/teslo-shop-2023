import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { db } from '../../../../database';
import { IProduct } from '../../../../interfaces';
import { Product } from '../../../../models';

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

const saveFile = (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath); // Delete temporary file
  return;
};

const parseFiles = (request: NextApiRequest): Promise<any> => {
  return new Promise(async (resolve, reject) => {

    const form = new formidable.IncomingForm();    

    form.parse(request, async (error, fields, files) => {
      console.log({ error, fields, files });
      if (error) return reject(error);
      await saveFile(files.file as formidable.File);
    });

    resolve(true);

  });
};

const uploadFile = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  await parseFiles(request);
  return response.status(200).json({ message: 'Image Uploaded!' });
};

export default handler;
