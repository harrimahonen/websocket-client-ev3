import React from 'react'

class Stream extends React.Component {
  componentDidMount () {
    var video = document.getElementById('video')

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream)
        video.play()
      })
    }
  }
  render () {
    return <div>
      <video id="video" width="640" height="480" autoplay></video>
    </div>
  }
}

export default Stream
