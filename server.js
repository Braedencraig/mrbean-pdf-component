const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()

app.use(fileUpload())

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

app.delete('/upload/:id', (req, res) => {
    const path = `${__dirname}/client/public/uploads/${req.params.id}`
    try {
        fs.unlinkSync(path)
      } catch(err) {
        console.error(err)
      }
})

app.listen(6000, () => console.log('server started'))