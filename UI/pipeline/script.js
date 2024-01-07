document.addEventListener("DOMContentLoaded", function() {
    const data = [
        { stage: "Start", leads: 100 },
        { stage: "Stage 1", leads: 80 },
        { stage: "Stage 2", leads: 60 },
        // ... other stages
    ];

    const width = 600, height = 400;
    const svg = d3.select("#funnel-chart").append("svg").attr("width", width).attr("height", height);

    // Calculate the maximum width for the top of the funnel
    const maxWidth = width * 0.8; // 80% of the SVG width

    data.forEach((d, i, nodes) => {
        const nextLeads = i < nodes.length - 1 ? nodes[i + 1].leads : 0;
        const topWidth = maxWidth * (d.leads / data[0].leads);
        const bottomWidth = maxWidth * (nextLeads / data[0].leads);
        const y = (height / data.length) * i;
        const nextY = (height / data.length) * (i + 1);

        svg.append("path")
            .attr("d", `M${(width - topWidth) / 2},${y} L${(width + topWidth) / 2},${y} L${(width + bottomWidth) / 2},${nextY} L${(width - bottomWidth) / 2},${nextY} Z`)
            .attr("fill", "lightblue");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", y + ((nextY - y) / 2))
            .attr("text-anchor", "middle")
            .text(`${d.stage}: ${d.leads} leads`);
    });
});
