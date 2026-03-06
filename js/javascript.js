const animationBarChart = () => {
  const data = [
    { ano: "2016", numero: 32 },
    { ano: "2017", numero: 50 },
    { ano: "2018", numero: 70 },
    { ano: "2019", numero: 74 },
    { ano: "2020", numero: 87 },
    { ano: "2021", numero: 93 },
    { ano: "2022", numero: 100 }
  ]

  const width = 800
  const height = 350
  const margin = { top: 20, bottom: 50, left: 90, right: 30 }
  const bgColor = "#f2f6fc"
  const barColor = "steelblue"

  const svg = d3.select("#grafico .grid-box")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
  //Eixo x
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.2)

  //Eixo y
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])
  //Objecto gráfico
  const bars = svg.append("g")
    .selectAll("rect")
    .data(data.sort((a, b) => d3.ascending(a.ano, b.ano)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("width", x.bandwidth())
    .attr("y", y(0))
    .attr("height", 0)
    .attr("fill", bgColor) 

  //Legenda eixo y
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${margin.left / 6}, ${height / 2}) rotate(-90)`)
    .style("font-family", "Poppins, sans-serif")
    .style("font-size", "20px")
    .style("fill", "#020000")
    .text("Projetos Completos")


    
    
  const xAxis = (g) => {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].ano))
      .attr("font-size", "20px")
  }

  const yAxis = (g) => {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .attr("font-size", "20px")
  }

  svg.append("g").call(xAxis)
  svg.append("g").call(yAxis)

  /* Lógica de trigger (Observer) + transição (transition()) 
    O utilizador quando chega dentro de uma determinada secção da página ativa 
    a animação do gráfico de barras a encher*/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.transition()
          .duration(1500)
          .attr("y", d => y(d.numero))
          .attr("height", d => y(0) - y(d.numero))
          .attr("fill", barColor)

        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.6 })

  observer.observe(document.querySelector("#grafico"))
}

animationBarChart()