const express = require('express');
const PORT = 8000;
const path = require('path')
const { fetchVideoForStream } = require('./services/video-service');
const { getVideoStream } = require('./services/file-service');
const app = express();

app.use(express.urlencoded());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/video/:id', async (req, res) => {
  try {
    const { id: video } = req.params;
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send({success: false, error: "Requires Range header"});
    }
    const { beginning, end, size, fileName } = fetchVideoForStream(video, range);
    const responseHeaders = getVideoContentHeaders(beginning, end, size);
    res.writeHead(206, responseHeaders);
    const videoStream = getVideoStream(fileName);
    videoStream.pipe(res);
  } catch (e) {
    console.log('ERROR: ', e.message);
    return res.send({ success: false, error: e.message});
  }
});

const getVideoContentHeaders = (start, end, size) => {
  const contentLength = end - start + 1;
  return {
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  }
}

app.listen(PORT, () => console.log('server started'));
