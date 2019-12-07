const fs = require('fs');
module.exports = function(app){
    
    //Route to manage armors
    app.get('/api/armors', function (req,res){

        //localhost:3000/api/armors?name=Terry
        let unname = req.query.name;
        let armorsObj;

        fs.readFile('db.json', 'utf-8', function (err, data){
            if(err){
                console.log('err408',err);
                res.status(501);
                res.send({'msg':'Fail load file','success':'false','result':'null'});
            }else{
                armorsObj = JSON.parse(data);
                for(let i = 0 ; i < armorsObj.length ; i++){
                    if(armorsObj[i].name == unname){
                        res.status(200);
                        res.send({'msg':'Armor found !','success':'true','result':armorsObj[i].name});
                        return;
                    }
                }
                res.status(501);
                res.send({'msg':'No armor found','success':'false','result':'null'});
            }
        });
    });

    
}