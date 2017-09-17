// Maze width and height
var width = process.argv[2] || 6,
	height = process.argv[3] || 6;

var maze = createMaze(width, height);	// Create initial maze

// Select a random starting point
var startPoint = maze[getRandomInt(0, height - 1)][getRandomInt(0, width - 1)];
// Create maze path
makePath(startPoint);
// Print maze
printMaze(maze);

// Cell constructor
function Cell(x, y) {
	this.visited = false;
	
	this.x = x;
	this.y = y;
	
	this.right = false;
	this.bottom = false;
}

// Returns an unvisited cell around a point
// Returns false if there are no unvisited cells around
function getRandomUnvisitedCell(cell) {
	var rand = ['top', 'right', 'bottom', 'left'];
	
	while(rand.length > 0) {
		var n = getRandomInt(0, rand.length - 1);	// Pick a random direction
		
		switch(rand[n]) {
			case 'top':
				if(cell.y - 1 >= 0 && maze[cell.y - 1][cell.x].visited === false) {
					maze[cell.y - 1][cell.x].bottom = true;
					return maze[cell.y - 1][cell.x];
				}
				break;
			case 'right':
				if(cell.x + 1 < width && maze[cell.y][cell.x + 1].visited === false) {
					maze[cell.y][cell.x].right = true;
					return maze[cell.y][cell.x + 1];
				}
				break;	
			case 'bottom':
				if(cell.y + 1 < height && maze[cell.y + 1][cell.x].visited === false) {
					maze[cell.y][cell.x].bottom = true;
					return maze[cell.y + 1][cell.x];
				}
				break;
			case 'left':
				if(cell.x - 1 >= 0 && maze[cell.y][cell.x - 1].visited === false) {
					maze[cell.y][cell.x - 1].right = true;
					return maze[cell.y][cell.x - 1];
				}
				break;
		}
		
		rand.splice(n,1); // Remove direction if cell is already visited
	}
	
	return false; // In case all around are visited
}

// Makes a random maze path using DFS
function makePath(currentCell) {
	currentCell.visited = true;		// Mark cell as visited
	
	var next = getRandomUnvisitedCell(currentCell); // Select a random cell for path
	
	// Keep making path while there are unvisited cells
	while(next) {
		makePath(next);
		next = getRandomUnvisitedCell(currentCell);
	}
	
}

// Creates initial maze
function createMaze(w, h) {
	var finalMatrix = [];
    
    for(var i=0; i < h; i++) {
        var auxMatrix = [];
        
        for(var j=0; j < w; j++) {
            auxMatrix.push(new Cell(j, i));
        }
        
        finalMatrix.push(auxMatrix);
    }
    
    return finalMatrix;
} 

// Prints maze to console
function printMaze() {
	
	for(var i = 0; i < maze[0].length; i++) {
		process.stdout.write(' _');	// Create top border
	}
	process.stdout.write('\n');	// Start next line
	
	for(var i = 0; i < maze.length; i++) {
		process.stdout.write('|');	// Create left border
		
		for(var j = 0; j < maze[i].length; j++) {
			
			if(!maze[i][j].bottom){
				process.stdout.write('_');
			}
			else {
				process.stdout.write(' ');
			}
			
			if(!maze[i][j].right){
				process.stdout.write('|');
			}
			else {
				process.stdout.write(' ');
			}
			
		}
		
		process.stdout.write('\n');	// Start next line
	}
}

// Returns a random Integer between 2 values (inclusive)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}