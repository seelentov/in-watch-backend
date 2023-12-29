import * as uuid from 'uuid'
import * as path from 'path'


class FileService{
  async saveFile(image){
    const fileName = `${uuid.v4()}.jpg`
    const filePath = path.resolve('uploads', fileName)
    image.mv(filePath)
    const serverPath = `/uploads/${fileName}`
    return serverPath
  }
}

export default new FileService()