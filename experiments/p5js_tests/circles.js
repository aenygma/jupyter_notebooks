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
    function (p5, p5d, g, _) {
      function draw(container, data) {
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

            var calcPoints = function(){
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
              // Defaults
              var defs = {
                'tstyle' : {
                  'margin': '10px',
                  'padding': '10px'},
                'cstyle' : {
                  'width': '200px',
                  'margin': '10px',
                  'padding': '10px'}
              }

              // Update function called when slider input changes.          
              function updateCB(){
                // update display value
                sV.html(sC.value());
                // call callback if defined
                if(t.update !== undefined)
                  t.update();
              }

              // Create Label for slider
              var sT = p.createElement('h4', t.t.name);
              sT.position(t.x, t.y);

              // Create Slider
              var sC = p.createSlider(t.c.start, t.c.end, t.c.default, 
                        t.c.increment);
              sC.position(t.x + 120, t.y);

              // Create 
              var sV = p.createElement('h5');
              sV.position(700, t.y);
              sV.html(sC.value());

              // apply default styles 
              //  for textbox
              for(let i in defs.tstyle){
                sT.style(i, defs.tstyle[i]);
              }

              //x for controls
              for(let i in defs.cstyle){
                sC.style(i, defs.cstyle[i]);
              }

              // apply defined styles
              for(let i in t.c.style){
                sC.style(i, t.c.style[i]);
              }

              // attach to dom if
              if (t.parent !== undefined){
                sT.parent(t.parent);
                sC.parent(t.parent);
                sV.parent(t.parent);
              }

              // apply update callback
              sC.input(updateCB);

              return sC; //[sT, sC];
            }
          
            // Initial setup
            p.setup = function() {
              // Create the canvas
              var canvas = p.createCanvas(500, 350);
              p.background(150);

              var inputPadding = 30;
          
              // create sliders
              //  amplitude
              ampSlider = createMySlider({
                't': {'name': 'Amplitude'},
                'c': {'start': 0, 'end': 5, 'default': 1, 'increment': 0.1},
                'x': 600, 
                'y': 0,
                'parent': controls_div,
                'update': update
              });

              //  frequency
              freqSlider = createMySlider({
                't': {'name': 'Frequency'},
                'c': {'start': 0, 'end': 10, 'default': 1, 'increment': 0.1},
                'x': 600, 
                'y': inputPadding,
                'parent': controls_div,
                'update': update
                
              });

              //  phase
              phaseSlider = createMySlider({
                't': {'name': 'Phase'},
                'c': {'start': 0, 'end': 2*Math.PI, 'default': 0, 
                      'increment': 0.1},
                'x': 600, 
                'y': inputPadding*2,
                'parent': controls_div,
                'update': update
              });

              // Create a new plot and set its position on the screen
              plot = new GPlot(p);
              // TODO link these with ampSlider min/max
              plot.setXLim(-2, 2);
              // TODO link these with ampSlider min/max
              plot.setYLim(-5, 5);
              plot.setPointSize(0);
              plot.setPos(25, 25);
          
              // Set the plot title and the axis labels
              plot.getXAxis().setAxisLabelText("x axis");
              plot.getYAxis().setAxisLabelText("y axis");
              plot.setTitleText("A very simple example");

              update();

              // Disable draw()         
              p.noLoop();
            };
          
            var update = function () {
              // Prepare the points for the plot
              points = calcPoints();
              // Set points
              plot.setPoints(points);
              // Draw it!
              plot.defaultDraw();
            }

          }, sketch_div);
      }
      return draw;
});
