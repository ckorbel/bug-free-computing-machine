async function draw() {
  const dataset = await d3.json("data.json");
  const xAccessor = (data) => data.currently.humidity;
  const yAccessor = (data) => data.currently.apparentTemperature;

  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  dimensions.containerWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;

  dimensions.containerHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // draw image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const container = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  // Scales
  // .extent function will return an array with the lowest and highest numbers in our data set
  // useful for passing in correct domain data
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .rangeRound([0, dimensions.containerWidth])
    .clamp(true);

  //nice() function rounds to nearest whole number
  // scaleLinear good for continous data sets
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.containerHeight, 0])
    .nice()
    .clamp(true);

  //draw circles
  container
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (data) => xScale(xAccessor(data)))
    .attr("cy", (data) => yScale(yAccessor(data)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-temp", yAccessor);

  // Axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickFormat((d) => d * 100 + "%");
  const xAxisGroup = container
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.containerHeight}px)`)
    .classed("axis", true);

  xAxisGroup
    .append("text")
    .attr("x", dimensions.containerWidth / 2)
    .append("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .text("Humidity");

  const yAxis = d3.axisLeft(yScale);

  const yAxisGroup = container
    .append("g")
    .call(yAxis)
    .style("transform", `translateX(${dimensions.containerWidth})px`);

  yAxisGroup
    .append("text")
    .attr("x", -dimensions.containerHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .attr("fill", "black")
    .text("Temperature &deg; F")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");

  //domain is the range of possible values in our dataset min and a max
  // domain is the range possible input values i.e .domain([100, 500]) data fall between 100 to 500
  // output range is the rang of possible values that you want d3 to transform the data to
  // .range([10, 350]) will transform input into this range so .domain([100, 500]) + .range([10, 350]) then 100 => 10
}

draw();
