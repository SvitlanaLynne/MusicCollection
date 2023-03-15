            // Preset of Middleware handlers

            
const express = require('express');
const app = express();
app.use(express.json());
             
            
const cors = require('cors');
app.use(cors({origin:'*'}));


const multer = require('multer');
const upload = multer();

const DataBaseHandler = require('better-sqlite3');
const DB = new DataBaseHandler('./Chinook_Sqlite.sqlite');


            // GET

app.get('/artistalbum',(req,res)=>{

    // res.setHeader('Access-Control-Allow-Origin','*');

    
    const sqlGetCommand = 'SELECT Artist.ArtistId, Name, Title, Album.AlbumId FROM Artist LEFT JOIN Album ON Artist.ArtistId = Album.ArtistId';
    
    const getStatement = DB.prepare(sqlGetCommand);
    const getOutput = getStatement.all();

    res.json(getOutput);

});



            //POST ARTIST ID

app.post('/artistId',upload.none(),(req,res)=>{

    const sqlPostArtistIdCommand = 'INSERT INTO Artist(ArtistId) VALUES (?)';
    const postArtistStatement = DB.prepare(sqlPostArtistIdCommand);
    const postArtistIdOutput = postArtistStatement.run([req.body.ArtistId]);

    res.end();

});

            //POST ARTIST

app.post('/artist',upload.none(),(req,res)=>{

    const sqlPostArtistCommand = 'INSERT INTO Artist(Name) VALUES (?)';
    const postArtistStatement = DB.prepare(sqlPostArtistCommand);
    const postArtistOutput = postArtistStatement.run([req.body.Name]);

    res.end();

});


            //POST ALBUM

app.post('/album',upload.none(),(req,res)=>{


    const sqlPostAlbumCommand = 'INSERT INTO Album(Title, ArtistId) VALUES (?,?)';
    const postAlbumStatement = DB.prepare(sqlPostAlbumCommand);
    const postAlbumOutput = postAlbumStatement.run([req.body.Title,req.body.ArtistId]);

    res.end();

});



            //DELETE ARTIST
            
app.delete('/artist/:id',(req,res)=>{

    const sqlDelCommand = 'DELETE FROM Artist WHERE ArtistId=?';
    const delStatement = DB.prepare(sqlDelCommand);
    const delOutput = delStatement.run([req.params.id]);

    res.end();

});



            //UPDATE ARTIST


app.put('/artist/:id',(req,res) => {

    const sqlUpdateCommand = 'UPDATE Artist SET Name=? WHERE ArtistId=?';
    const updateArtStatement = DB.prepare(sqlUpdateCommand);
    const updateArtistOutput = updateArtStatement.run(req.body.Name,req.params.id); 
    res.end();

});


            //UPDATE ALBUM

app.put('/album/:id',(req,res) => {

    const sqlUpdateCommand = 'UPDATE Album SET Title=? WHERE AlbumId=?';
    const updateAlbStatement = DB.prepare(sqlUpdateCommand);
    const updateAlbumOutput = updateAlbStatement.run(req.body.Title,req.params.id); 
    res.end();

});



            // Port Setup
app.listen(5555,()=>console.log('Port is ready and listening!'));



