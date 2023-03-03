const fs = require('fs');
const VIDEO_FOLDER = '../local/video';
const { files } = require('../models/files');

const getFileSize = (fileName, local = true) => {
  return local ? getLocalFileFileSize(fileName) : getRemoteFileSize(fileName);
}

const getRemoteFileSize = (fileName) => {

}

const getLocalFileSize = (fileName) => {
  return fs.statSync(getVideoFilePath(fileName)).size;
};

const getVideoFilePath = (fileName) => {
  return `${__dirname}/${VIDEO_FOLDER}/${fileName}`;
}

const getFileNameById = (id) => {
  return files.find(f => f.id == id);
}

const getVideoStream = (fileName, start, end) => {
  const path = getVideoFilePath(fileName)
  return fs.createReadStream(path, { start, end });
}

module.exports = {
  getFileSize,
  getFileNameById,
  getVideoStream
}