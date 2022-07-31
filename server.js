const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const {execSync} = require('child_process');
const path = require('path')

const app = express();

app.use(cors());
app.use(bodyParser.json());
var urlParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, "/public")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public2')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});



const upload = multer({storage}).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

fs = require("fs");
let atlases = [];
currDir = __dirname.slice(0, -7)

app.post('/atlas', function(req, res) {
    const newAtlas = {
      Atlas: req.body.atlas,
    };
    atlases.push(newAtlas);
    console.log(atlases);
    console.log(currDir)
    fs.writeFile(currDir.concat("/src/output.txt"), req.body.atlas, (err) => {
        if (err) {
            console.log(err);
        }
    })
    fs.writeFile(currDir.concat("/src/output3.txt"), currDir, (err) => {
        if (err) {
            console.log(err);
        }
    })
    
});
let colors = [];

app.post('/color', function(req, res) {
    const newColor = {
      color: req.body.color,
    };
    colors.push(newColor);
    console.log(colors);
    
    fs.writeFile(currDir.concat("/src/output2.txt"), req.body.color, (err) => {
        if (err) {
            console.log(err);
        }
    })
    
    
});


blender_app_path = '/Applications/Blender.app/Contents/MacOS/Blender'
python_script_path = currDir.concat('/Python/blender_script.py')
cmd = blender_app_path.concat(' --background --python ').concat(python_script_path)

app.post('/python', function(req, res) {
    console.log("Python is running!");
    string = currDir.concat("/Python/main.py")
    finalString = "python3 ".concat(string)
    console.log(finalString)
    try {
        console.log(cmd)
        execSync(cmd, { stdio: 'ignore' });
        return true;
      } catch (e) {
        console.log(e);
      }
});


   
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

