var cnv, hwnd, console, f, formula;
var xmax, xmin, ymax, ymin, scale, deltax, deltay;
var cwidth = 500;
var sin, cos, tan, exp, log, ln, abs, sqrt, pow;

function main(){
	init();
}

function init(){
	var temp;
	formula = document.getElementById("formula");
	cnv = document.getElementById("hwnd");
	hwnd = cnv.getContext('2d');
	console = document.createElement('iframe');
	document.body.appendChild(console);
	console.id = "console";
	console.log = function(s){console.contentDocument.body.innerHTML += "<br>" + s;};
	console.clear = function(){console.contentDocument.body.innerHTML = "";};
	temp = document.getElementById("build");
	temp.onclick = build;
	xmax = 10;
	xmin = -10;
	ymin = -10;
	ymax = 10;
	sin = Math.sin;
	cos = Math.cos;
	tan = Math.tan;
	abs = Math.abs;
	ln = Math.log;
	log = function(x){return Math.log(x)/Math.log(10);};
	exp = Math.exp;
	sqrt = Math.sqrt;
	pow = Math.pow;
	build();
}

function build(){
	try{
		loaddata();
		clearcnv();
		printaxes();
		printgraph();
	}catch(e){console.log(e);}
}

function loaddata(){
	loadf();
}

function loadf(){
	var s = formula.value;
	/*while(s.indexOf('^') != -1){
		ну и тут я не придумал замену степени, поэтому ^ - побитовое исключающее или
		if(s.indexOf(')^') != -1){}
		else{
			
		}
	};*/
	eval("f = function (x){return " + s + ";}");
}

function normalizey(y){
	return cwidth * (1 - (y - ymin)/deltay); 
}

function normalizex(x){
	return cwidth * (x - xmin)/deltax; 
}

function clearcnv(){cnv.height = cnv.height; //hwnd.clearRect(0, 0, 10000, 10000);
}

function printaxes(){
	var deltax = xmax - xmin;
	var temp;
	var deltax05 = deltax/2;
	var cwidth05 = cwidth/2;
	scale = cwidth / deltax;
	ymax = deltax05;
	ymin = -ymax;
	hwnd.beginPath();
	for(var i = Math.floor(xmin); i < Math.ceil(xmax); i += 0.5){
		temp = Math.ceil((i - xmin) * scale) + 0.5;
		hwnd.moveTo(temp, 0);
		hwnd.lineTo(temp, 500);
	}
	for(var i = 0; i < deltax05; i += 0.5){
		temp = Math.ceil(cwidth05 + i * scale) + 0.5;
		hwnd.moveTo(0, temp);
		hwnd.lineTo(500, temp);
		temp = Math.ceil(cwidth05 - i * scale) + 0.5;
		hwnd.moveTo(0, temp);
		hwnd.lineTo(500, temp);
	}
	hwnd.closePath();
	hwnd.strokeStyle = "#ddd";
	hwnd.lineWidth = 1;
	hwnd.stroke();
	hwnd.beginPath();
	for(var i = Math.floor(xmin); i < Math.ceil(xmax); i += 1){
		temp = Math.ceil((i - xmin) * scale) + 0.5;
		hwnd.moveTo(temp, 0);
		hwnd.lineTo(temp, 500);
	}
	for(var i = 0; i < deltax05; i += 1){
		temp = Math.ceil(cwidth05 + i * scale) + 0.5;
		hwnd.moveTo(0, temp);
		hwnd.lineTo(500, temp);
		temp = Math.ceil(cwidth05 - i * scale) + 0.5;
		hwnd.moveTo(0, temp);
		hwnd.lineTo(500, temp);
	}
	hwnd.closePath();
	hwnd.strokeStyle = "#aaa";
	hwnd.lineWidth = 1;
	hwnd.stroke();
	hwnd.beginPath();
	temp = Math.ceil(- xmin * scale) + 0.5;
	hwnd.moveTo(temp, 0);
	hwnd.lineTo(temp, 500);
	temp = Math.ceil(cwidth05) + 0.5;
	hwnd.moveTo(0, temp);
	hwnd.lineTo(500, temp);
	hwnd.closePath();
	hwnd.strokeStyle = "#000";
	hwnd.lineWidth = 1;
	hwnd.stroke();
}

function printgraph(){
	var delta = (xmax - xmin) * 2/ cwidth;
	deltax = xmax - xmin;
	deltay = ymax - ymin;
	hwnd.beginPath();
	hwnd.moveTo(normalizex(xmin - delta), normalizey(f(xmin - delta)));
	for(var i = xmin; i <= xmax; i += delta){
		hwnd.lineTo(normalizex(i), normalizey(f(i)));
	}	
	hwnd.moveTo(normalizex(xmin - delta), normalizey(f(xmin - delta)));
	//hwnd.closePath();
	hwnd.strokeStyle = "#f00";
	hwnd.lineWidth = 2;
	hwnd.stroke();
}
