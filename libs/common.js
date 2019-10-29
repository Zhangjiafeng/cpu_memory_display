const fs=require('fs');
module.exports={
	loadHtml:function(url,res){
		var file_name='./views/'+url+'.html';
		// console.log(file_name);
		fs.readFile(file_name,function(err,data){
			if(err){
				res.write('404');
			}else{
				res.write(data);
			}
			res.end();
		})
	}
}
