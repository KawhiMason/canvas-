window.onload = function (){
	var canvas = document.getElementById('canvas');
	var cxt = canvas.getContext('2d');

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	curShowTime = getCurrentShowTime();
	setInterval(
		function(){
			rander(cxt);
			update()},50)
}

var canvasHeight = document.documentElement.clientHeight-20;
var canvasWidth = document.documentElement.clientWidth-20;
var Margin_top = 100;
var Margin_left = 200;
var radius =8;
var curShowTime = 0;	
var endTime = new Date();
var color = ["#AED09E","#FFEBB7","#E8FFC1","#FFB6B9","#FBFAE1","#FD2E2E","#04DEAD","#0E9577","#AAFFC7","#5FCC9C","#215B63","#BC5148"];
var ball = [];


function randerDig(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++)
		for (var j= 0; j < digit[num][i].length; j++) 
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc( x+j*2*(radius+1)+(radius+1),y + i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
	
}

function getCurrentShowTime(){


	var nowTime = new Date();

	var ret = endTime.getTime() - nowTime.getTime();

	ret = Math.round(ret/1000);

	return ret>0? ret:0;

}

function update(){
	var newSetTime = getCurrentShowTime();

	var newSethour = parseInt(newSetTime/3600);
	var newSetmiuter = parseInt((newSetTime - newSethour*3600)/60);
	var newSetmiao = parseInt(newSetTime%60);

	var curhour = parseInt(curShowTime/3600);
	var curmiuter = parseInt((curShowTime - curhour*3600)/60);
	var curmiao = parseInt(curShowTime%60);

	if(newSetmiao !==curmiao){
		if( parseInt(curhour/10)!= parseInt(newSethour/10)){

			addball(Margin_left,Margin_top,parseInt(newSethour/10))
		}
		if(parseInt(newSethour%10) != parseInt(curhour%10)){
			addball(Margin_left + 15*(radius + 1),Margin_top,parseInt(newSethour%10))
		}
		if(parseInt(newSetmiuter/10) != parseInt(curmiuter/10)){
			addball(Margin_left + 39*(radius + 1),Margin_top,parseInt(newSetmiuter/10))
		}
		if(parseInt(newSetmiuter%10) != parseInt(curmiuter%10)){
			addball(Margin_left + 54*(radius + 1),Margin_top,parseInt(newSetmiuter%10))
		}
		if(parseInt(newSetmiao/10 )!= parseInt(curmiao/10)){
			addball(Margin_left + 78*(radius + 1),Margin_top,parseInt(newSetmiao/10))
		}
		if( parseInt(curmiao%10)!= parseInt(newSetmiao%10)){

			addball(Margin_left + 93*(radius + 1),Margin_top,parseInt(newSetmiao%10))
		}
		curShowTime = newSetTime;

		
	}
aballUpdate();
}

function rander(cxt){
	cxt.clearRect(0,0,canvas.width,canvas.height);

	var hour = parseInt(curShowTime/3600);
	var miuter = parseInt((curShowTime - hour*3600)/60);
	var miao = parseInt(curShowTime%60);

	randerDig(Margin_left,Margin_top,parseInt(hour/10),cxt);
	randerDig(Margin_left + 15*(radius + 1),Margin_top,parseInt(hour%10),cxt);
	randerDig(Margin_left+ 30*(radius + 1),Margin_top,10,cxt);
	randerDig(Margin_left+ 39*(radius + 1),Margin_top,parseInt(miuter/10),cxt);
	randerDig(Margin_left+ 54*(radius + 1),Margin_top,parseInt(miuter%10),cxt);
	randerDig(Margin_left+ 69*(radius + 1),Margin_top,10,cxt);
	randerDig(Margin_left+ 78*(radius + 1),Margin_top,parseInt(miao/10),cxt);
	randerDig(Margin_left+ 93*(radius + 1),Margin_top,parseInt(miao%10),cxt);

	for( var i = 0 ; i <ball.length;i++){
		cxt.fillStyle = ball[i].color;

		cxt.beginPath();
		cxt.arc(ball[i].x,ball[i].y,radius,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}
}

function addball(x,y,num){
	for(var i=0;i<digit[num].length;i++)
		for (var j= 0; j < digit[num][i].length; j++)
			if(digit[num][i][j]==1){
				var aball = {
				x:x+j*2*(radius+1)+(radius+1),
				y:y + i*2*(radius+1)+(radius+1),
				vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
				vy:-5,
				g: 1.5+Math.random(),
				color : color[Math.floor(Math.random()*color.length)]
			}
				ball.push(aball);
		}
			
}

function aballUpdate(){
	for(var i=0;i < ball.length;i++){
		ball[i].x+=ball[i].vx;
		ball[i].y+=ball[i].vy;
		ball[i].vy += ball[i].g;
		if(ball[i].y>=canvas.height - radius){
			ball[i].y = canvas.height -radius;
			ball[i].vy = -ball[i].vy*0.75;
		}
	}

	var cot  =0;
	for (var i = 0; i < ball.length; i++)
		if(ball[i].x + radius >0&&ball[i].x-radius<canvas.width)
		ball[cot++] = ball[i];
	

	while(ball.length>cot){
		ball.pop();
	}
}

function setTime(){
	
	var hour_msg = document.getElementById('hourMsg').value;
	var miu_msg = document.getElementById('miuMsg').value;
	endTime.setTime(endTime.getTime() + hour_msg*3600*1000 + miu_msg*3600*1000/60);
}