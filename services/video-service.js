const fs = require('fs');
const { getFileSize, getFileNameById } = require('./file-service');

const fetchVideoForStream = (video, range) => {
  const fileName = getFileNameById(video);
  const size = getFileSize(fileName);
  const { beginning, end } = getVideoChunk(size, range);
  return { beginning, end, size, fileName };
}

const getVideoChunk = (videoSize, range, chunkSize = 10 ** 6) => {
  const beginning = Number(range.replace((/\D/g, ""))); //replace all but numbers
  const end = Math.min(beginning + chunkSize, videoSize - 1);
  return {
    beginning,
    end
  }
};

module.exports = {
  fetchVideoForStream
}