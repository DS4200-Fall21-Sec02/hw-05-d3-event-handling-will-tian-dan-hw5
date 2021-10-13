// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35,
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization
let svg = d3
  .select('#vis')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white')
  .style('border', 'solid')
  .attr(
    'viewBox',
    [
      0,
      0,
      width + margin.left + margin.right,
      height + margin.top + margin.bottom,
    ].join(' ')
  );

let squareX = 100;
let squareY = 200;

let circleX = 350;
let circleY = 250;

// Add a square
let rect = svg
  .append('rect')
  .attr('x', squareX)
  .attr('y', squareY)
  .attr('width', '20%')
  .attr('height', '20%')
  .attr('fill', '#a6cee3')
  .attr('id', 'square')
  .on('click', function () {
    document.getElementById('circle').classList.toggle('newColor');
  })
  .on('mouseover', function () {
    document.getElementById('square').classList.add('thickBorderRect');
  })
  .on('mouseleave', function () {
    document.getElementById('square').classList.remove('thickBorderRect');
  })
  .call(d3.drag().on('start', startedSquare));

// Add a circle
let circle = svg
  .append('circle')
  .attr('cx', circleX)
  .attr('cy', circleY)
  .attr('r', '60')
  .attr('fill', '#b2df8a')
  .attr('id', 'circle')
  .on('dblclick', function () {
    document.getElementById('circle').classList.toggle('newColor');
    document.getElementById('square').classList.toggle('newRectColor');
  })
  .on('mouseover', function () {
    document.getElementById('circle').classList.add('thickBorderCircle');
  })
  .on('mouseleave', function () {
    document.getElementById('circle').classList.remove('thickBorderCircle');
  })
  .call(d3.drag().on('start', startedCircle));

function startedCircle(event) {
  const circle = d3.select(this).classed('dragging', true);

  event.on('drag', draggedCircle).on('end', endedCircle);

  function draggedCircle(event, d) {
    console.log(event);
    console.log(d);
    circle
      .raise()
      .attr('cx', event.x + event.dx)
      .attr('cy', event.y + event.dy);
  }

  function endedCircle() {
    circle.classed('dragging', false);
  }
}

function startedSquare(event) {
  const square = d3.select(this).classed('dragging', true);

  event.on('drag', draggedSquare).on('end', endedSquare);

  function draggedSquare(event, d) {
    console.log(event);
    square
      .raise()
      .attr('x', event.x + event.dx - 50)
      .attr('y', event.y + event.dy - 50);
  }

  function endedSquare() {
    square.classed('dragging', false);
  }
}
