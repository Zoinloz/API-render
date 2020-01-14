'use strict';

const fs = require('fs');
module.exports = function (app) {
        

    app.get('/api/arms/:id', function (req, res) {
        console.log('look here -->',req,req.query);
        console.log('look here 2-->',req.query);
        //localhost:3000/api/arms/<id_command>
        let unname = req.query.name;
        let armorsObj;

        fs.readFile('db.json', 'utf-8', function (err, data) {
            if (err) {
                console.log('err408', err);
                res.status(501);
                res.send({ 'msg': 'Fail load file', 'success': 'false', 'result': 'null' });
            } else {
                armorsObj = JSON.parse(data);
                console.log(armorsObj.arms);
                // switch()
                for (let i = 0; i < armorsObj.arms.length; i++) {
                    console.log('armor name : ', armorsObj.arms[i].name);
                    if (armorsObj.arms[i].name == unname) {
                        res.status(200);
                        res.send({ 'msg': 'Arms found !', 'success': 'true', 'result': armorsObj.arms[i] });
                        return;
                    }
                }
                res.status(501);
                res.send({ 'msg': 'No arms found', 'success': 'false', 'result': 'null' });
            }
        });
    });

    app.get('/api/arms', function (req, res) {

        //localhost:3000/api/arms
        console.log('path : ', req.path);
        let key;
        let value;
        let unname = req.query.name;
        let armorsObj;

        fs.readFile('db.json', 'utf-8', function (err, data) {
            if (err) {
                console.log('err408', err);
                res.status(501);
                res.send({ 'msg': 'Fail load file', 'success': 'false', 'result': 'null' });
            } else {
                armorsObj = JSON.parse(data);

                console.log('params : ', Object.entries(req.query));
                if (Object.entries(req.query).length != 0) {
                    for (let [ikey, ivalue] of Object.entries(req.query)) {
                        key = ikey;
                        value = ivalue;
                    }
                    for (let i = 0; i < armorsObj.arms.length; i++) {
                        console.log('armor name : ', armorsObj.arms[i].$key);
                        if (armorsObj.arms[i] == value) {
                            res.status(200);
                            res.send({ 'msg': 'Arms found !', 'success': 'true', 'result': armorsObj.arms[i] });
                            return;
                        }
                    }
                    res.status(501);
                    res.send({ 'msg': 'No arms found', 'success': 'false', 'result': 'null' });
                } else {
                    if (armorsObj.arms != undefined && armorsObj.arms != null) {
                        //console.log(armorsObj.arms);
                        res.status(200);
                        res.send({ 'msg': 'Arms found !', 'success': 'true', 'result': armorsObj.arms });
                        return;
                    } else {
                        console.log('err408', err);
                        res.status(501);
                        res.send({ 'msg': 'Fail load file', 'success': 'false', 'result': 'null' });
                    }
                }
            }
        });
    });
}

