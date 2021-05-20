async function getData() {
  //   const data = await d3.json("data.json");
  const data = await d3.csv("data.csv");
  console.log({ data });
}

getData();

// JOIN method: enter, exit, update
// const data = [10, 20, 30, 40, 50];

// const el = d3
//   .select("ul")
//   .selectAll("li")
//   .data(data)
//   .join(
//     (enter) => {
//       return enter.append("li").style("color", "purple");
//     },
//     (update) => update.style("color", "green"),
//     (exit) => exit.remove()
//   )
//   .text((d) => d);
// console.log(el);
