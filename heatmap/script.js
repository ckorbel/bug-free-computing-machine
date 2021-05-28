async function draw(element) {
  const data = await d3.json("data.json");

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
    .attr("y", (d, i) => box * ((i / 20) | 0));
}

draw("#heatmap1");
