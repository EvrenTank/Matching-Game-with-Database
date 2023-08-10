const express=require('express');
const app=express()
const mysql2=require('mysql2');
const con=mysql2.createConnection({
  host:"localhost",
  user:"root",
  password:"yourpassword",
  database:"yourdatabase"
});
const port=process.env.PORT || 8080;
//app.use(function(req,res){
  //console.log("app.use() çalışıyor")// Bunu app.use ne işe yarar görmek için yazdım.
//})
app.set('views','./')
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))
var name;
app.get('/',function(req,res){
  //res.send('Oyun Sayfasına Geçiş Buradan Yapılacak')
  res.render('startpage.ejs')
})
app.post('/',function(req,res){
 
  /* if(req.body.clickedButton === "startButton"){
    name=req.body.name
    console.log(name)
    res.redirect('/gamepage')
}
else{
  res.redirect('/recordspage')

}*/
res.redirect('/gamepage')
})
app.get('/gamepage',function(req,res){

  res.render('game2.ejs')
})
/*
app.get('/recordspage',function(req,res){
  con.query('SELECT * FROM register', function(err, result) {
    if (err) {
        throw err;
    }
    res.render('recordspage.ejs', { records: result });
});
})*/
app.post('/gamepage',function(req,res){
  var time=req.body.sure/1000
  var date=new Date();
  var date_data=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+"--"+date.getHours()+":"+date.getMinutes();
  console.log(time)
  console.log(date_data)
  var text="insert into register(name,date,time) values('"+name+"','"+date_data+"','"+time+"')"
  con.connect(function(err){
    con.query(text,function(err,result){
      if(err) {throw err}
      console.log("Tamamlandı")
    })
    con.query('select * from register',function(err,result,fields){
      if (err) throw err;
      console.log(result);
    })
  })
  res.redirect('/')
})
app.listen(port,function(){
  console.log("Çalışıyor");
});
