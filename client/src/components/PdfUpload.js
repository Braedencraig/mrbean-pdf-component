import React, { useState, useRef } from 'react'
import axios from 'axios'
import { FileDrop } from 'react-file-drop'
import Progress from './Progress'
import  Message  from './Message'
import PdfViewer from './PdfViewer'

export const PdfUpload = () => {
    const [uploadedFile, setUploadedFile] = useState({})
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const fileInputRef = useRef(null)

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const res = await axios.post('/upload', formData, { 
                headers: {
                    'Content-Type': 'application/pdf'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))

                    setTimeout(() => {
                        setUploadPercentage(0)
                    }, 1000)
                },
                
            })
            const { fileName, filePath } = res.data
            setUploadedFile({ fileName, filePath })
            setSuccess(true)
            setMsg('Successfully uploaded pdf')
        } catch(err) {
            console.log(err)
            err.response.state === 500 ? 
                setMsg('Server error') :
                setMsg(err.response.data.msg)
        }
    }

    const onFileInputChange = (e) => {
        uploadFile(e.target.files[0])
    }

    const onTargetClick = (e) => {
        fileInputRef.current.click()
    }

    const onDrop = async (files, event) => {
        files[0].type !== 'application/pdf' ?
            setMsg('Only pdf files can be uploaded') :
            uploadFile(files[0])
    }

    const onDelete = async () => {
        const result = window.confirm('Are you sure you want to delete your pdf?')
        if(result) {
            setSuccess(false)
            setMsg('Pdf successfully deleted')
            await axios.delete(`/upload/${uploadedFile.fileName}`)
        }
    }

    return (
        <>
            {msg && <Message msg={msg} />}
            {!success ? (
                <>
                    <input
                        onChange={onFileInputChange}
                        ref={fileInputRef}
                        type="file"
                        className="custom-file-input hidden"
                        accept="application/pdf, application/vnd.ms-excel"
                    />
                    <FileDrop
                        onTargetClick={onTargetClick}
                        onDrop={onDrop}>Click or Drag & Drop Pdf
                    </FileDrop>
                </>) : (
                    <>
                        <div className="info-btns">
                            <a href={process.env.PUBLIC_URL + uploadedFile.filePath} download={uploadedFile.filePath}>{`Download your pdf, ${uploadedFile.fileName}`}</a>
                            <button onClick={onDelete}>Delete uploaded pdf</button>
                        </div>
                        <PdfViewer url={process.env.PUBLIC_URL + uploadedFile.filePath}/>
                    </>
                )}
            {uploadPercentage > 0 && <Progress percentage={uploadPercentage} />}
        </>
    )
}
