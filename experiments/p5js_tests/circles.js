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
*/

mydefine('simple_cos', 
  ['p5', 'p5.dom', 'grafica', 'lodash'],
  function (p5, p5d, g, _){
    function draw(container, data){
      console.log('it works');
      console.log("pd:", p5d);
      console.log("g:", g);
      console.log(container);
      console.log(data);
      console.log('lodash', _);

      // Where to attach
      var sketch_div = document.createElement('div');
      sketch_div.setAttribute('id', 'cowabunga');
      sketch_div.style.position = "relative";
      container.appendChild(sketch_div);

      var controls_div = document.createElement('div');
      controls_div.setAttribute('id', 'ctrlz');
      container.appendChild(controls_div);

      var sketch = new p5(
        // @p is passed in by p5, when instantiated with a HTML Element
        function(p){

          var ampSlider;
          var freqSlider;
          var phaseSlider;

          var plot;
          var points;

          var xValues = _.range(-2*Math.PI, Math.PI, 0.01);

          var createPoints = function(){
            let aVal = ampSlider.value();
            let fVal = freqSlider.value();
            let pVal = phaseSlider.value();

            // Prepare the points for the plot
            return _.map(xValues,
              function(t){
                return new GPoint(
                  t, 
                  aVal * Math.cos(2 * Math.PI * fVal * t + pVal))
              });
          }

          function createMySlider(t){
            /*
              t
            */
            var s = p.createSlider(t.start, t.end, t.default, t.increment);
            s.position(t.x, t.y);
            for(var i in t.style){
              s.style(i, t.style[i]);
            }
            return t;
          }
        
          // Initial setup
          p.setup = function() {
            // Create the canvas
            var canvas = p.createCanvas(500, 350);
            p.background(150);

            var inputPadding = 30;
        
            // create sliders
            //  amplitude
            var ampSliderTxt = p.createElement('h3', "Amplitude:");
            ampSliderTxt.position(500, 0);
            ampSlider = p.createSlider(0, 5, 1, 0.1);
            ampSlider.position(ampSliderTxt.x, 0);
            ampSlider.style('width', '200px');
            ampSlider.style('position', 'relative');
            ampSlider.style('margin', '10px');
            ampSlider.style('padding', '10px');
            ampSlider.input(update);

            // attach/render
            ampSlider.parent(controls_div);
            ampSliderTxt.parent(controls_div);
        
            //  frequency
            freqSlider = p.createSlider(1, 10, 1, 0.1);
            freqSlider.position(500, inputPadding);
            freqSlider.style('width', '200px');
            freqSlider.style('position', 'relative');
            freqSlider.style('margin', '10px');
            freqSlider.style('padding', '10px');
            freqSlider.input(update);

            //  phase
            phaseSlider = p.createSlider(0, 2*Math.PI, 0, 0.1);
            phaseSlider.position(500, 2*inputPadding);
            phaseSlider.style('width', '200px');
            phaseSlider.style('position', 'relative');
            phaseSlider.style('margin', '10px');
            phaseSlider.style('padding', '10px');
            phaseSlider.input(update);
 
            // Prepare the points for the plot
            points = createPoints();
            console.log("points:", points);
        
            // Create a new plot and set its position on the screen
            plot = new GPlot(p);
            plot.setXLim(-2, 2);
            // TODO link these with ampSlider min/max
            plot.setYLim(-5, 5);

            plot.setPointSize(0);
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
        
          var update = function () {
        
            points = createPoints();
            console.log("points:", points);
            plot.setPoints(points);
            plot.defaultDraw();
          }

        }, sketch_div);
    }
    return draw;
});
