async function draw(element, scale) {
  const data = await d3.json("data.json");
  data.sort((a, b) => a - b);
  const dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30;

  const svg = d3
    .select(element)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // Scales
  let colorScale;
  if (scale === "linear") {
    colorScale = d3
      .scaleLinear()
      .domain(d3.extent(data))
      .range(["white", "red"]);
  } else if (scale === "quantize") {
    colorScale = d3
      .scaleQuantize()
      .domain(d3.extent(data))
      .range(["white", "pink", "red"]);
  } else if (scale === "quantile") {
    colorScale = d3
      .scaleQuantile()
      .domain(data)
      .range(["white", "pink", "red"]);

    console.log("Quantize:", colorScale.quantiles());
  } else if (scale === "threshold") {
    // the threshold for upper class vs middle class
    colorScale = d3
      .scaleThreshold()
      .domain([45200, 135600])
      .range(d3.schemeOranges[3]);
  }
  // draw rectangles
  svg
    .append("g")
    .attr("transform", "translate(2, 2)")
    .attr("stroke", "black")
    .attr("fill", "#ddd")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", box - 3)
    .attr("height", box - 3)
    .attr("x", (d, i) => box * (i % 20))
    .attr("y", (d, i) => box * ((i / 20) | 0))
    .attr("fill", (d) => colorScale(d));
}

draw("#heatmap1", "linear");
draw("#heatmap2", "quantize");
draw("#heatmap3", "quantile");
draw("#heatmap4", "threshold");
