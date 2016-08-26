/**
 * Created by yaroslav on 8/16/16.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/bitkom';
var Busboy = require('busboy');
var inspect = require('util').inspect;
var fs = require('fs-extra');
var path = require('path');
var os = require('os');
var mkdirp = require('mkdirp');
var im = require('imagemagick');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Битком: админка' });
});
router.get('/categories', function(req, res, next) {
    res.render('categories', { title: 'Битком: категории' });
});
router.get('/catalog', function(req, res, next) {
    res.render('catalog', { title: 'Битком: каталог' });
});
router.get('/types', function(req, res, next) {
    res.render('types', { title: 'Битком: Типы инфоблоков' });
});

router.post('/upload', function(req, res, next){
    var idn = '';
    var fName = '';
    var tempFile = '';

    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        tempFile = path.join(os.tmpDir(), Date.now() + filename);
        file.pipe(fs.createWriteStream(tempFile));
        fName = filename;
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        if(fieldname.indexOf('userID') != -1){
            idn = val;
        }
    });
    busboy.on('finish', function() {
        var targetPath = path.resolve('./public/images/menu');

        mkdirp(targetPath, function(err){
            if(err)console.log(err);
            im.resize({
                srcPath: tempFile,
                dstPath: targetPath + '/' + fName,
                width:   250,
                height: 250
            }, function(err, stdout, stderr){
                if (err) console.log(err);
                console.log('resized ' + fName + ' to fit within 100x100');
                res.end(fName);
            });
            res.end(fName);
        });
    });
    req.pipe(busboy);
});
router.post('/save/:col', function(req, res, next){
    if(req.body.item._id){
        updateItem(res, req.params.col, req.body.item, req.body.fields);
    }else{
        insert(res, req.params.col, req.body.item);
    }
});

router.post('/view/:cname', function(req, res, next){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        cname = req.params.cname;
        console.log(req.body.query);

        if(req.body.id){
            find(res, cname, {"_id":ObjectId(req.body.id)});
        }else{
            find(res, cname, req.body.query);
        }
    });
});
router.post('/remove/:col', function(req, res, next){
    deleteItem(res, req.params.col, req.body.id, next);
});


function insert(res, col, item){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);

        db.collection(col).insert(item, function(err, r){
            //console.log(r);
            if(err)console.log(err);
            db.close();
            res.end(JSON.stringify({result:r}));
        });
    });
};
function updateItem(res, col, item, fields){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);

        update = {};
        update["$set"] = {};
        for(var i = 0; i < fields.length; i++){
            update["$set"][fields[i]] = item[fields[i]];
        }
        db.collection(col).updateOne({"_id":ObjectId(item._id)},update, function(err, r){
            console.log(r);
            if(err)console.log(err);
            db.close();
            res.end(JSON.stringify({result:r}));
        });
    });
};
function deleteItem(res, col, id, next){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);

        db.collection(col).remove({"_id":ObjectId(id)}, function(err, r){
            //console.log(r);
            if(err)console.log(err);
            data = {};
            data.result = r;

            db.close();
            next;
            res.end(JSON.stringify(data));

        });
    });
};
function find(res, col, query){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log(query);
        db.collection(col).find(query).toArray(function(err, result){
            data = {};
            data[col] = result;
            db.close();
            res.end(JSON.stringify(data));
        });
    });
}
function findSort(res, col, query, sort, limit){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log(query);
        console.log(sort);
        db.collection(col).find(query).sort(sort).limit(limit).toArray(function(err, result){
            data = {};
            data[col] = result;
            db.close();
            res.end(JSON.stringify(data));
        });
    });
};
module.exports = router;