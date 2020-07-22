
function calculate( )
{
//############

	
	var KOL_PNTS  = document.form.kol_points.value;
	KOL_PNTS = Number(KOL_PNTS);
	
	document.write("Будет точек: "+KOL_PNTS);
	
	var cords_X  = new Array(KOL_PNTS+1);//чтоб с 1
	var cords_Y  = new Array(KOL_PNTS+1);

	
	document.write("<br><br>Рисуем график");
		draw_grafic("black");	//просто сетка
	

//######################################### Рисуем все точки	
	var colors  = new Array(6);
	
	colors[0] = "black";
	colors[1] = "black";
	colors[2] = "brown";
	colors[3] = "green";
	colors[4] = "blue";
	colors[5] = "orange";

//###############
	
	var max = 10;
	var sdvig = 0;

	for (var i=1 ; i < KOL_PNTS+1 ; i++)
	{
		cords_X[i] = Math.round(Math.random() * max + sdvig);
		cords_Y[i] = Math.round(Math.random() * max + sdvig);
		
		document.write("<br>Рисуем точку N_"+i+": X="+cords_X[i]+" Y="+cords_Y[i]);

		var buf = Math.round( Math.random()*5)//если вылезет за размер массива, нарисует зеленым(дефолт) ;
		draw_point(cords_X[i],cords_Y[i], colors[ buf ] );	
	}
	
	document.write("<br>Все точки отрисованы.<br>");


//############ Средняя	
	var X_sum = 0;
	var Y_sum = 0;
	
	for (var i=1 ; i < KOL_PNTS+1 ; i++)
	{
		X_sum += cords_X[i] ;
		Y_sum += cords_Y[i] ;
	}
	
	var X_avg = X_sum / KOL_PNTS;
	var Y_avg = Y_sum / KOL_PNTS;
	
	draw_point(X_avg, Y_avg ,"red");

//#################################################################### Подсчет СУММ и другого
	
	var m_XY  = new Array(KOL_PNTS+1);//5 полей без нулевого
	var m_XX  = new Array(KOL_PNTS+1);
	var m_SUM = new Array(5); // 0 1 2 3 4

	m_SUM[1] = 0;
	m_SUM[2] = 0;
	m_SUM[3] = 0;
	m_SUM[4] = 0;
	
	
	for (var i=1 ; i < KOL_PNTS+1 ; i++)//5 раз
		{
			m_XY[i] = cords_X[i] * cords_Y[i]; 
			m_XX[i] = cords_X[i] * cords_X[i];
			document.write("<br>Для точки N_"+i+": XX="+m_XX[i]+" XY="+m_XY[i]);
		}

	for (var i=1 ; i < KOL_PNTS+1 ; i++)
		{
			m_SUM[1] += cords_X[i];
			m_SUM[2] += cords_Y[i];
			m_SUM[3] += m_XY[i];
			m_SUM[4] += m_XX[i];
		}
		
	document.write("<br>Сумма  X = "+m_SUM[1]);
	document.write("<br>Сумма  Y = "+m_SUM[2]);
	document.write("<br>Сумма  XY = "+m_SUM[3]);
	document.write("<br>Сумма  XX = "+m_SUM[4]);
	document.write("<br><br>");

	//document.write("<br>Все суммы посчитаны.");
	
//##################################################################


	document.write("<table border=1>"); 
	document.write("<tr>   <td> @ </td>  ");
	
	for (c = 1 ; c < KOL_PNTS+1; c++) //столько сколько точек
		{
			document.write("<td> i="+ c +"</td>");	
		}
	
	document.write("	<td> SUM </td>    </tr>");//Всегда одна


//############

	var m_buf = new Array(5);

	m_buf[1] = "X";
	m_buf[2] = "Y";
	m_buf[3] = "XY";
	m_buf[4] = "XX";



	for (var i=1 ; i < 5 ; i++) //строк  //надо 4 шт
	{
		document.write("<tr>");//новая строка

		document.write("<td>"+ m_buf[i] +"</td>"); // 1 ячейка новой строки
		
		for (c = 1 ; c < KOL_PNTS+1; c++) //столько сколько точек
		{
			switch ( i )  
			{
				case 1 :      document.write("<td>"+ cords_X[c] +"</td>");     break;
				case 2 :      document.write("<td>"+ cords_Y[c] +"</td>");     break;
				case 3 :      document.write("<td>"+  m_XY[c]   +"</td>");     break;
				case 4 :      document.write("<td>"+  m_XX[c]   +"</td>");     break;
				default:	    document.write("<br>  Ошибка!"); break;
			}	
		}

		document.write("<td> "+ m_SUM[i] +"</td>");  // всегда последняя (после всех точек)

		document.write("</tr>");//конец строки

	}

	document.write("</table>");

//####################################
//####################################


	//A B сошлись полностью
	var A = (    KOL_PNTS * m_SUM[3]    -    m_SUM[1] * m_SUM[2]   )  /  (  KOL_PNTS * m_SUM[4] - Math.pow( m_SUM[1] , 2)   )
	var B = (    m_SUM[2] - A * m_SUM[1]    )    /  (   KOL_PNTS   );


	document.write("<br>A = "+A);
	document.write("<br>B = "+B);

	draw_line_fun( A , B , 0.01 , "red");

	document.write("<br><br>Конец скрипта");
	
}//Конец Функции





function draw_grafic( color = "black")
{
	
	    

	//    Задаем position:absolute в стиле для всех div
    document.write(" <style>div{position:absolute}</style> ");     
	// /*
	
	document.write("<font color="+color+">"); 
	
	//    w,h - ширина и высота экрана соответственно; (x0,y0)- координаты центра экрана 
    var w=screen.width;
	var h=screen.height;     
    var x0=w/2;
	var y0=h/2;    
	
	//    Рисуем координатные оси с центром в (x0,y0)	//+8
    for (var i=1; i<w; i=i+8) 
		document.write( " <div style='top: " +y0+ " ; left: " +i+ " '>_</div> " );     
	
	for (var i=1; i<h; i=i+8) 
		document.write( " <div style='left: " +x0+ " ; top: " +i+ " '>|</div> " );     
	
	
	//    Назначаем коэффициенты масштабирования графика по x (kx) и y (ky)
	var kx= w/25;
	var ky= h/25;//70   //насколько мелкий  

	
	document.write("</font>"); 

}


//робит все  
 //   /*
function draw_point (VAR_X, VAR_Y, color = "green")
{

	//    w,h - ширина и высота экрана соответственно; (x0,y0)- координаты центра экрана 
    w=screen.width; h=screen.height;     
    x0=w/2; y0=h/2;//

	//    Назначаем коэффициенты масштабирования графика по x (kx) и y (ky)
	kx= w/25;
	ky= h/25;//70 //насколько мелкий 

	document.write("<font color="+color+">"); 
	document.write("<div style='left:"+(x0+kx*VAR_X)+";top:"+(y0-ky*VAR_Y)+" '>* {"+VAR_X+","+VAR_Y+"}</div>");
	document.write("</font>"); 
}
// */

//робят все арг
function draw_line_fun( K , B , Step = 0.01, color = "green")
{
	//    w,h - ширина и высота экрана соответственно; (x0,y0)- координаты центра экрана 
    w=screen.width; h=screen.height;     
    x0=w/2; y0=h/2;//2

	//    Назначаем коэффициенты масштабирования графика по x (kx) и y (ky)
	kx= w/25;
	ky= h/25;//70 //насколько мелкий 

    document.write("<font color="+color+">");     

    for ( x =-30; x < 30; x = x+Step )
	{
		y = K * x  +  B;

		document.write("<div style='left:"+(x0+kx*x)+";top:"+(y0-ky*y)+" '>.</div>");	
	}
	
	document.write("</font>"); 

}


function draw_line_points( X1 , Y1 , X2 , Y2 , Step = 0.01, color = "blue")
{
	
	//    w,h - ширина и высота экрана соответственно; (x0,y0)- координаты центра экрана 
    w=screen.width; 
	h=screen.height;     
    x0=w/2; 
	y0=h/2;//2

	//    Назначаем коэффициенты масштабирования графика по x (kx) и y (ky)
	kx= w/25;
	ky= h/25;//70 //насколько мелкий 

//#######################

	//преобразуем в функцию
	// 1 1    4 6
	var K = (Y2 - Y1)/(X2 - X1); //6-1 / 4-1  = 5/3
    var B = (X1*Y2 - X2*Y1)/(X2 - X1); //  4*1  -   1*6    /   4-1 //до замены

//#######################
	
    document.write("<font color="+color+">");     

    for ( x =-30; x < 30; x = x+Step )
	{		
		y = K * x  +  B;

		document.write("<div style='left:"+(x0+kx*x)+";top:"+(y0-ky*y)+" '>.</div>");	
	}
	
	
	document.write("</font>"); 
}


//расстояние между точками
function points_distance( X1 , Y1 , X2 , Y2 )
{
	var dist = Math.sqrt(  Math.pow( (X2-X1) , 2)     +      Math.pow( (Y2-Y1) , 2) );
	return dist;
}







/*
var data = [];
for (var i = 0; i < 6; i++)
{
    data[i] = [];
}
//data[i][j];
*/



/*
======================================================

var sss = document.form.text.value; //Считываем с поля
    sss = Number(sss); // Преобразуем в число на всяк

    document.write( + "" +  + "<br>");

	
//var sss = document.<ИМЯ ФОРМЫ>.<ИМЯ ПОЛЯ ВВОДА>.value; //Считываем с поля
//    sss = Number(ПЕРЕМЕННАЯ); // Преобразуем в число на всяк
	
	document.write(i + "$ = " + rez + " Руб" + "<br>");
	
	
// Math.round (  Math.random()*120-20  )  //от -20 до 100//round для округления
// Math.pow(что, степень);

// document.getElementById("total"); //для таблиц с <span class="result" id="totalinterest"></span>


======================================================
====================================================== ОДНОМЕРНЫЙ
======================================================
var a=new Array(n); //Инициализация
for (i=0; i<n; i++)
	{
		a[i]=Math.round(Math.random()*120-20); //от -20 до 100
		document.write(a[i]+"  ");
	}
====================================================== ДВУМЕРНЫЙ
var a = new Array(n);  //ИЛИ  var a = [];
for (i=0; i<n; i++)
	{
		a[i] = new Array(n);
		for (j=0; j<n; j++)
			{
				a[i][j] =Math.round(Math.random()*120-20); //от -20 до 100
				document.write(a[i][j]+"\t\t");
			}
		document.write("<br>");
	}
======================================================

======================================================

*/
