const mysql=require('mysql')
const fs=require('fs')
const table=process.env.TABLE||'payment'
const field=process.env.FIELD||'cost'
const amount=process.env.AMOUNT || 30000
const method=process.env.METHOD || 'SQL'
// must be 'SQL' or 'JS'


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});

const forSQL=()=>{

connection.query(`SELECT SUM(${field}) as sum 
    FROM ${table}
    WHERE ${field}<${amount}
`, function (error, results) {
    if (error) throw error;
    

    fs.writeFile('./sum.txt',results[0].sum.toString(),function (err) {
        if (err) return console.log(err);
        console.log(`${results[0].sum} is in the sum.txt file`);
      });


  });
}

const forJS=()=>{
    

    connection.query(`SELECT ${field} as field
    FROM ${table}
    WHERE ${field}<${amount}
`, function (error, results) {
    if (error) throw error;
    let sum=0
    results.forEach((result)=>{
        sum+=result.field
        
    })
    
    
    fs.writeFile('./sum.txt',sum.toString(),function (err) {
        if (err) return console.log(err);
        console.log(`${sum} is in the sum.txt file`);
      });

  });


}

if(method==='SQL'){
    forSQL()
}else{
    forJS()
}