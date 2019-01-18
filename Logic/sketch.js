var grid;
var mark;
var rows;
var cols;
var resolution = 10;
var stack;
var dx = [-1, 0, 1, 0];
var dy = [0, 1, 0, -1];

function setup() {
	createCanvas(800, 600);

	rows = height / resolution;
	cols = width / resolution;

	grid = create2DArray(rows, cols);
	initializeValues(grid);

	mark = create2DArray(rows, cols);
	for(var i = 0; i < rows; i++)
		for(var j = 0; j < cols; j++)
			mark[i][j] = 0;

	stack = [];
	stack.push({x: 0, y: 0});
}

function draw(){
	background(0);
	dfs();
	drawGrid();
}

function drawGrid(){
	for(var i  = 0; i < rows; i++)
	{
		for(var j = 0; j < cols; j++)
		{
			var x = j * resolution;
			var y = i * resolution;
			if(mark[i][j] == 1)
			{
				if(mark[rows - 1][cols - 1] == 1)
					fill(0, 255, 0);
				else
					fill(255, 0, 0);
				rect(x, y, resolution - 1, resolution - 1);
			}
			else if(grid[i][j] == 0)
			{
				fill(255);
				rect(x, y, resolution - 1, resolution - 1);
			}
			else
			 {
					fill(0);
					rect(x, y, resolution - 1, resolution - 1);
			}
		}
	}
}

function create2DArray(rows, cols){
	var arr = new Array(rows);
	for(var i = 0; i < rows; i++)
		arr[i] = new Array(cols);
	return arr;
}

function initializeValues(gird){
	var x = 0, y = 0;
	while (true) {
		grid[y][x] = 0;
		if(y == rows - 1 && x == cols - 1)
			break;
		if(y == rows - 1)
		{
			x = x + 1;
		}
		else if(x == cols - 1)
		{
			y = y + 1;
		}
		else
		{
				var dir = floor(random(2));
				if(dir == 0)
					x = x + 1;
				else
					y = y + 1;
		}
	}
	for(var i = 0; i < rows; i++){
		for(var j  = 0; j < cols; j++){
			if(grid[i][j] == 0)
				continue;
			grid[i][j] = floor(random(2));
		}
	}
}

function dfs()
{
	if(mark[rows - 1][cols - 1] == 1)
		return;
	while (stack.length > 0)
	{
			var element = stack[stack.length - 1];
			if(!mark[element.y][element.x])
			{
				mark[element.y][element.x] = 1;
				break;
			}
			var fin = 1;
			for(var i = 0; i < 4; i++)
			{
				var x = element.x + dx[i];
				var y = element.y + dy[i];
				if(x >= 0 && x < cols && y >= 0 && y < rows && mark[y][x] == 0 && grid[y][x] == 0){
					stack.push({x: x, y: y});
					fin = 0;
					break;
				}
			}
			if(fin == 1)
			{
				stack.pop();
				mark[element.y][element.x] = 2;
				break;
			}
	}
}
