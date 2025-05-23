import { useState } from 'react'
import PropTypes from 'prop-types'

function PhotoUpload({ setFormData }) {
  const [imgPreview, setImgPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file instanceof File) {
      setFormData((prev) => ({ ...prev, image: file }))
      setImgPreview(URL.createObjectURL(file))
    } else {
      console.warn('No valid file selected:', file)
    }
  }

  return (
    <section>
      <label htmlFor="fileInput" className="file-label">
        {imgPreview ? (
          <img src={imgPreview} alt="Preview" className="file-preview" />
        ) : (
          <div className="file-placeholder">
            <div>📁+</div>
            <p>Upload Photo</p>
          </div>
        )}
      </label>
      <input type="file" name="image" id="fileInput" onChange={handleFileChange} hidden />
    </section>
  )
}

PhotoUpload.propTypes = {
  setFormData: PropTypes.func.isRequired
}

export default PhotoUpload
