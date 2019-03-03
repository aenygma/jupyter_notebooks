/*
define('circles', ['d3'], function (d3){
    function draw(container, data){
        var svg = d3.select(container).append('svg')
            .attr('width', 400)
            .attr('height', 200);
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr("cx", function(d, i) {return 40 * (i + 1);})
            .attr("cy", function(d, i) {return 100 + 30 * (i % 3 - 1);})
            .style("fill", "#1570a4")
            .transition().duration(2000)
            .attr("r", function(d) {return 2*d;});
      }
    return draw;
});

mydefine('defaultPlotSketch', ['p5.dom', 'p5'], function(p) {
console.log('test');
console.log("p:", p);
  function plot(container, data){
    console.log("plot:",  container, data);
	  // Initial setup
	  p.setup = function() {
	  	// Create the canvas
	  	var canvas = p.createCanvas(500, 350);
	  	p.background(150);

	  	// Prepare the points for the plot
	  	var points = [];
	  	var seed = 100 * p.random();

	  	for (var i = 0; i < 100; i++) {
	  		points[i] = new GPoint(i, 10 * p.noise(0.1 * i + seed));
	  	}

	  	// Create a new plot and set its position on the screen
	  	var plot = new GPlot(p);
	  	plot.setPos(25, 25);

	  	// Set the plot title and the axis labels
	  	plot.setPoints(points);
	  	plot.getXAxis().setAxisLabelText("x axis");
	  	plot.getYAxis().setAxisLabelText("y axis");
	  	plot.setTitleText("A very simple example");

	  	// Draw it!
	  	plot.defaultDraw();

	  	p.noLoop();
	  };
  };
  return plot;
});
*/

mydefine('circles', 
  ['p5', 'p5.dom', 'grafica'], //'defaultPlotSketch'], 
  function (p5, p5d, g){
    console.log('ksjdlfjs');
    function draw(container, data){
      
      console.log('it works');
      console.log("pd:", p5d);
      console.log("g:", g);
      console.log(container);
      console.log(data);

      var sketch_div = document.createElement('div');
      sketch_div.setAttribute('id', 'cowabunga');
      sketch_div.style.position = "relative";
      container.appendChild(sketch_div);

      //defaultPlotSketch(container);
      //console.log('start p5');
      var sketch = new p5(
        function(p){

          var rSlider;
          var plot;
          var points;

          var createPoints = function(){
            let rpoints = [];
            // Prepare the points for the plot
            var seed = 100 * p.random();
            for (var i = 0; i < rSlider.value(); i+=1) {
              //rpoints[i] = new GPoint(i, 10 * p.noise(0.1 * i + seed));
              rpoints[i] = new GPoint(i, 10 * Math.sin(i/10.));
            }
            return rpoints;
          }
        
          // Initial setup
          p.setup = function() {
            // Create the canvas
            var canvas = p.createCanvas(500, 350);
            p.background(150);
        
            // create slider
            rSlider = p.createSlider(0, 255, 10);
            rSlider.position(500, 0);
            rSlider.style('width', '200px');
            rSlider.style('position', 'relative');
            rSlider.input(update);
        
            // Prepare the points for the plot
            //var points = [];
        
            points = createPoints();
        
            // Create a new plot and set its position on the screen
            plot = new GPlot(p);
            plot.setPointSize(0);
            plot.setPos(25, 25);
        
            // Set the plot title and the axis labels
            plot.setPoints(points);
            plot.getXAxis().setAxisLabelText("x axis");
            plot.getYAxis().setAxisLabelText("y axis");
            plot.setTitleText("A very simple example");
        
            // Draw it!
            plot.defaultDraw();
        
            //p.noLoop();
          };
        
          var update = function () {
        
            points = createPoints();
            console.log("58", points);
            // Create a new plot and set its position on the screen
            //plot = new GPlot(p);
        
            // Set the plot title and the axis labels
            plot.setPoints(points);
        
            // Draw it!
            plot.defaultDraw();
        
        
          }

/*          

          // Initial setup
          p.setup = function() {

            // Create the canvas
            var canvas = p.createCanvas(500, 350);
            p.background(150);
  
            // Prepare the points for the plot
            var points = [];
            var seed = 100 * p.random();
  
            for (var i = 0; i < 100; i++) {
              points[i] = new GPoint(in, 
                            10 * p.noise(0.1 * i + seed));
            }
  
            // Create a new plot and set its position on the screen
            var plot = new GPlot(p);
            plot.setPos(25, 25);
  
            // Set the plot title and the axis labels
            plot.setPoints(points);
            plot.getXAxis().setAxisLabelText("x axis");
            plot.getYAxis().setAxisLabelText("y axis");
            plot.setTitleText("A very simple example");
  
            // Draw it!
            plot.defaultDraw();
            p.noLoop();
          };
*/
        }, sketch_div);
    }
    return draw;
});
