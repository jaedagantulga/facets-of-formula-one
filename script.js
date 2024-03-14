function finalProject(){

    let filePath1="const.csv";
    preproc1(filePath1);

    plot2();
    plot3();
}

let preproc1=function(filePath1){
    
    d3.csv(filePath1).then(function(data1){
        data1.forEach(d => {
            d.position = +d.position;
            d[""] = +d[""];
    });

    plot1(data1);
    });
    
}

let plot1=function(data1){

    const margin = { top: 40, right: 120, bottom: 80, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    let svg = d3
        .select("#plot1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("display", "block");
    
    var dates = [];
    for (let obj of data1) {
        if (!(dates.includes(obj.date))) {
            dates.push(obj.date);
        }
    }

    const xScale = d3
        .scalePoint()
        .domain(data1.map((d) => d["date"]))
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([d3.max(data1, d => d.position), d3.min(data1, d => d.position)])
        .range([height, 0]);

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAXis")
        .attr("transform", `translate(0, ${height})`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg
        .append("g")
        .call(yAxis)
        .attr("class", "yAXis")
        .attr("transform", `translate(0, 0)`);

    const constructors = Array.from(d3.group(data1, (d) => d.constructor).keys());
    const cColors = [
        "#15317E", // red bull
        "#F87431", // mclaren
        "#4EE2EC", // williams
        "#045D5D", // aston martin
        "#657383", // alpha tauri
        "#368BC1", // alpine
        "#8C001A", // alfa romeo
        "#00BFFF", // haas
        "#18B8A8", // mercedes
        "#F70D1A" // ferrari
    ]

    const transitionDuration = 5000;

    for (let i = 0; i < constructors.length; i++) {
        var cName = constructors[i];

        let path = svg
            .append("path")
            .datum(data1.filter(function(d) {
                return d.constructor == cName;
            }))
            .attr("fill", "none")
            .attr("class", "kms")
            .attr("stroke", function() {
                return cColors[i];
            })
            .attr("stroke-width", 3)
            .attr(
            "d",
            d3
                .line()
                .x((d) => xScale(d.date))
                .y((d) => yScale(d.position))
            );

            // Get totalLength of path
        let totalLength = path.node().getTotalLength();

        // Transition the line
        path
            .attr("stroke-dasharray", `0 ${totalLength}`)
            .transition()
            .duration(transitionDuration)
            .ease(d3.easeLinear)
            .attr("stroke-dasharray", `${totalLength} 0`);

        const colorMapping = {
            "Red Bull": "#15317E", // red bull
            "McLaren": "#F87431", // mclaren
            "Williams": "#4EE2EC", // williams
            "Aston Martin" :"#045D5D", // aston martin
            "AlphaTauri": "#657383", // alpha tauri
            "Alpine F1 Team": "#368BC1", // alpine
            "Alfa Romeo" :"#8C001A", // alfa romeo
            "Haas F1 Team" :"#00BFFF", // haas
            "Mercedes" :"#18B8A8", // mercedes
            "Ferrari" :"#F70D1A" // ferrari
            };
    
        var car = `
        <g transform="scale(1 1)">
            <g>
                <path d="M61,33.25H59.35L49.7,30.43h0A4.19,4.19,0,0,0,48.23,30l0,0-2.92-.85h-.07l-.07,0H32.44a2.17,2.17,0,0,1-2.17-2.18V26a.5.5,0,0,0-.5-.5H23.39a.43.43,0,0,0-.19,0L12.19,30h-.12L11,25.88a.48.48,0,0,0-.48-.38H4.83a.49.49,0,0,0-.39.19.5.5,0,0,0-.09.44l1,3.89H3a.51.51,0,0,0-.4.19.53.53,0,0,0-.08.44L2.87,32l.36,1.36a.5.5,0,0,0,.48.38H7.58a3.87,3.87,0,0,0,0,.49,4.26,4.26,0,0,0,4.24,4.27,4.19,4.19,0,0,0,2.68-1h28a.57.57,0,0,0,.18,0h0a.57.57,0,0,0,.13-.08l0,0,.08-.12,0,0a.17.17,0,0,0,0-.07A.27.27,0,0,0,43,37h0a.44.44,0,0,0,0-.1s0,0,0-.08a3,3,0,0,1-.23-1.19,3.26,3.26,0,0,1,.89-2.24,4.49,4.49,0,0,0-.08.83,4.23,4.23,0,0,0,8.45.33l2,.58v1.44a.5.5,0,0,0,.5.5H61a.5.5,0,0,0,.5-.5V33.75A.5.5,0,0,0,61,33.25ZM3.84,31.75,3.65,31h2l.45,1.72h-2Zm3.25,1L5.48,26.5h4.65L11,30a4.27,4.27,0,0,0-3.23,2.72Zm1.44,1.49a3.24,3.24,0,1,1,3.24,3.27A3.26,3.26,0,0,1,8.53,34.23Zm33.2,1.41a4.14,4.14,0,0,0,.1.87H15.34A4.23,4.23,0,0,0,16,34.23a4.28,4.28,0,0,0-2.29-3.78l9.77-3.95h5.78v.43a3.17,3.17,0,0,0,3.17,3.18H45.08l.89.26a4.38,4.38,0,0,0-1.6,1.33A4.28,4.28,0,0,0,41.73,35.64Zm6.05,1.86A3.28,3.28,0,1,1,51,34.23,3.26,3.26,0,0,1,47.78,37.5Zm4.17-4A4.39,4.39,0,0,0,51.36,32l4.43,1.3H54.45a.51.51,0,0,0-.5.5v.35Zm8.55,2.57H55V34.25H60.5Z" fill = "#000000"/>
                <path d="M11.77,32.29a1.94,1.94,0,1,0,1.92,1.94A1.94,1.94,0,0,0,11.77,32.29Zm0,2.87a.94.94,0,1,1,.92-.93A.93.93,0,0,1,11.77,35.16Z" fill="#000000"/>
                <path d="M47.78,32.29a1.94,1.94,0,1,0,1.92,1.94A1.94,1.94,0,0,0,47.78,32.29Zm0,2.87a.94.94,0,1,1,.92-.93A.93.93,0,0,1,47.78,35.16Z" fill="#000000"/>
                <path d="M33.3,32.6a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5H32a.51.51,0,0,0-.5.5v3.42a.5.5,0,0,0,.5.5H33.3a.5.5,0,0,0,0-1h-.77V32.6Z" fill="#000000"/>
                <path d="M36.1,32.6a.5.5,0,0,0,.5-.5.5.5,0,0,0-.5-.5H34.84a.5.5,0,0,0-.5.5v3.42a.5.5,0,0,0,.5.5H36.1a.5.5,0,0,0,0-1h-.76V32.6Z" fill="#000000"/>
                <path d="M38.91,32.6a.5.5,0,0,0,.5-.5.51.51,0,0,0-.5-.5H37.65a.5.5,0,0,0-.5.5v3.42a.5.5,0,0,0,.5.5h1.26a.5.5,0,0,0,0-1h-.76V32.6Z" fill="#000000"/>
        `

        function pathTween(path) {
            var length = path.node().getTotalLength(); 
            var r = d3.interpolate(0, length);
            return function(t){
                var point = path.node().getPointAtLength(r(t));
                d3.select(this) 
                    .style("fill", colorMapping[cName])
                    .attr("transform", `translate(${point.x - margin.left}, ${point.y - margin.top})`)
        }}

        const firstPos = data1.filter(function(d) {
            return d.constructor == cName;
        })[0]
        
        svg
            .append("g")
            .attr("id", "car")
            .html(car)
            .attr("x", firstPos.date)
            .attr("y", firstPos.position)
            .style("fill", colorMapping[cName])
            .transition()
            .duration(transitionDuration)
            .ease(d3.easeLinear)
            .tween("pathTween", function() {
                return pathTween(path)
            })
    };

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", -4)
        .text("Red Bull")
        .style("font-size", "15px")
        .style("fill", "#15317E")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 62)
        .text("Ferrari")
        .style("font-size", "15px")
        .style("fill", "#F70D1A")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 127)
        .text("Mercedes")
        .style("font-size", "15px")
        .style("fill", "#18B8A8")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 192)
        .text("Alpine")
        .style("font-size", "15px")
        .style("fill", "#368BC1")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 257)
        .text("McLaren")
        .style("font-size", "15px")
        .style("fill", "#F87431")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 320)
        .text("Alfa Romeo")
        .style("font-size", "15px")
        .style("fill", "#8C001A")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 386)
        .text("Aston Martin")
        .style("font-size", "15px")
        .style("fill", "#045D5D")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 450)
        .text("Haas")
        .style("font-size", "15px")
        .style("fill", "#00BFFF")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 514)
        .text("AlphaTauri")
        .style("font-size", "15px")
        .style("fill", "#657383")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 850)
        .attr("y", 577)
        .text("Williams")
        .style("font-size", "15px")
        .style("fill", "#4EE2EC")
        .attr("alignment-baseline","middle");

    
    svg
        .append("text")
        .attr("x", width/2)
        .attr("y", height + 70)
        .text("Race Date")
        .style("font-size", "16px")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", -300)
        .attr("y", -30)
        .attr("transform", `rotate(-90)`)
        .text("Position")
        .style("font-size", "16px")
        .attr("alignment-baseline","middle");

}

let plot2=function(){
    const margin = { top: 60, bottom: 75, left: 40, right: 40 };
    const width = 700 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;
    
    const states = d3.json("teammates.json")
    states.then(function (data){
    
        const svg = d3
            .select("#plot2")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var linkScale = d3
            .scaleLinear()
            .domain([0, d3.max(data.links, function(d) {return d.value})])
            .range([1, 15]);

        let links = svg
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .attr("stroke", "#90EE90")
            .style("stroke-width", function(d) {return linkScale(d.value)});

        let nodes = svg
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .style("fill", "gold");

        let label = svg
            .selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
            .text((d) => d.name)
            .style("text-anchor", "middle")
            .style("font-size", "11px");

        let force = d3
            .forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody().strength(-88))
            .force("link", d3.forceLink(data.links).id((d) => d.id).distance(100))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", function() {
                nodes.attr("cx", (d) => d.x)
                    .attr("cy", (d) => d.y);
                links.attr("x1", (d) => d.source.x)
                    .attr("y1", (d) => d.source.y)
                    .attr("x2", (d) => d.target.x)
                    .attr("y2", (d) => d.target.y);
                label.attr("x", (d) => d.x)
                    .attr("y", (d) => d.y)
            });

        svg
            .append("text")
            .attr("x", width - 300)
            .attr("y", 0)
            .text("Width of the Lines represent")
            .style("font-size", "17px")
            .attr("alignment-baseline","middle");

        svg
            .append("text")
            .attr("x", width - 300)
            .attr("y", 25)
            .text("the Number of Races with that Teammate")
            .style("font-size", "17px")
            .attr("alignment-baseline","middle");

        let zoom = d3.zoom()
            .on('zoom', function(event) {
                svg.selectAll('circle')
                .attr('transform', event.transform);
                svg.selectAll('line')
                .attr('transform', event.transform);
                svg.selectAll('text')
                .attr('transform', event.transform);
                });

        svg.call(zoom);
    })
}


let plot3=function(){
    
    let width = 1000;
    let height = 550;

    const svg = d3
        .select("#plot3")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //TO DO: Create projection and pathgeo variables for world
    const projection  = d3
                .geoNaturalEarth1()
                .scale(183)
                .translate([width/2, height/2])

    const pathgeo = d3.geoPath().projection(projection);
    const transitionDuration = 10000

    //TO DO: Load JSON file and create the map
    d3.json("world.json").then(map =>{

    // drawing a sphere, the outline of the globe 
    svg
        .append('path')
        .attr('class', 'sphere')
        .attr('d', pathgeo({ type: 'Sphere' }))
        .attr("fill", "skyblue");

    svg
        .selectAll('.worldpath')
        .data(map.features)
        .enter().append("path")
        .attr('class', 'worldpath')
        .attr('d', pathgeo)
        .attr("fill", "green");

    const route = [
        {x: 50.5106, y: 26.0325, name: "Sakhir", order: 1},
        {x: 39.1044, y: 21.6319, name: "Jeddah", order: 2}, 
        {x: 144.968,y: -37.8497, name: "Melbourne", order: 3},
        {x: 11.7167, y: 44.3439, name: "Imola", order: 4},
        {x: -80.2389, y: 25.9581, name: "Miami", order: 5},
        {x: 2.26111, y: 41.57, name: "Montmeló", order: 6},
        {x: 7.42056, y: 43.7347, name: "Monte-Carlo", order: 7},
        {x: 49.8533, y: 40.3725, name: "Baku", order: 8},
        {x: -73.5228, y: 45.5, name: "Montreal", order: 9},
        {x: -1.01694, y: 52.0786, name: "Silverstone", order: 10},
        {x: 14.7647, y: 47.2197, name: "Spielberg", order: 11},
        {x: 5.79167, y: 43.2506, name: "Le Castellet", order: 12},
        {x: 19.2486, y: 47.5789, name: "Budapest", order: 13},
        {x: 5.97139, y: 50.4372, name: "Spa", order: 14},
        {x: 4.54092, y: 52.3888, name: "Zandvoort", order: 15},
        {x: 9.28111, y: 45.6156, name: "Monza", order: 16},
        {x: 103.864, y: 1.2914, name: "Marina Bay", order: 17},
        {x: 136.541, y: 34.8431, name: "Suzuka", order: 18},
        {x: -97.6411, y: 30.1328, name: "Austin", order: 19},
        {x: -99.0907, y: 19.4042, name: "Mexico City", order: 20}, 
        {x: -46.6997, y: -23.7036, name: "São Paulo", order: 21},
        {x: 54.6031, y: 24.4672, name: "Abu Dhabi", order: 22}];
        
    // [longitude, latitude]

    const routeProjected = [];

    for (i in route){
        routeProjected.push(projection([route[i].x, route[i].y]));
    }

    const lineGenerator = d3.line();
    const routeData = lineGenerator(routeProjected);

    const svgRoute = [];

    for (let i = 0; i < routeProjected.length; i++) {
        let pos = routeProjected[i];
        svgRoute.push({x: pos[0], y: pos[1], name: route[i].name, order: route[i].order})
    };

    // Define the path for the points in routeData
    let path = svg
        .append('path')
        .attr('class', 'sphere')
        .attr('d', routeData)
        .attr("stroke", "red")
        .attr("fill", "none")
        .style("stroke-width", 2);

    svg
        .selectAll("circle")
        .data(svgRoute)
        .enter()
        .append('circle')
        .attr('fill', 'black')
        .attr('r', 10)
        .attr("cx", (d) => d.x - 10)
        .attr("cy", (d) => d.y);
    
    svg
        .selectAll("text")
        .data(svgRoute)
        .enter()
        .append("text")
        .text((d) => d.order)
        .attr("x", (d) => d.x - 10)
        .attr("y", (d) => d.y + 5)
        .style("text-anchor", "middle")
        .style("font-size", "11px")
        .style("fill", "white");

    // LEGEND
    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 230)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 231)
        .text("1")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");
    
    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 231)
        .text("Sakhir")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 245)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 246)
        .text("2")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 246)
        .text("Jeddah")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 260)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 261)
        .text("3")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 261)
        .text("Melbourne")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 275)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 276)
        .text("4")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 276)
        .text("Imola")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 290)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 291)
        .text("5")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 291)
        .text("Miami")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 305)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 306)
        .text("6")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 306)
        .text("Montmeló")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 320)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 321)
        .text("7")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 321)
        .text("Monte-Carlo")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 335)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 336)
        .text("8")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 336)
        .text("Baku")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 350)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 43)
        .attr("y", 351)
        .text("9")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 351)
        .text("Montreal")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 45)
        .attr("cy", 365)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 39)
        .attr("y", 366)
        .text("10")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 366)
        .text("Silverstone")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 44)
        .attr("cy", 380)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 39)
        .attr("y", 381)
        .text("11")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 55)
        .attr("y", 381)
        .text("Spielberg")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 230)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 231)
        .text("12")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 231)
        .text("Le Castellet")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 245)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 246)
        .text("13")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 246)
        .text("Budapest")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 260)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 261)
        .text("14")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 261)
        .text("Spa")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 275)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 276)
        .text("15")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 276)
        .text("Zandvoort")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 290)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 291)
        .text("16")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 291)
        .text("Monza")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 305)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 306)
        .text("17")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 306)
        .text("Marina Bay")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 320)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 321)
        .text("18")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 321)
        .text("Suzuka")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 335)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 124)
        .attr("y", 336)
        .text("19")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 336)
        .text("Austin")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 350)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 125)
        .attr("y", 351)
        .text("20")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 351)
        .text("Mexico City")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 365)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 125)
        .attr("y", 366)
        .text("21")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 366)
        .text("São Paulo")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    svg
        .append("circle")
        .attr("cx", 130)
        .attr("cy", 380)
        .attr("r", 6)
        .style("fill", "black");

    svg
        .append("text")
        .attr("x", 125)
        .attr("y", 381)
        .text("22")
        .style("font-size", "11px")
        .style("fill", "white")
        .attr("alignment-baseline","middle");

    svg
        .append("text")
        .attr("x", 140)
        .attr("y", 381)
        .text("Abu Dhabi")
        .style("font-size", "11px")
        .style("fill", "black")
        .attr("alignment-baseline","middle");

    // Get totalLength of path
    let totalLength = path.node().getTotalLength();

    // Transition the line
    path
        .attr("stroke-dasharray", `0 ${totalLength}`)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .attr("stroke-dasharray", `${totalLength} 0`);

    });

    let zoom = d3.zoom()
        .on('zoom', function(event) {
            svg.selectAll('circle')
            .attr('transform', event.transform);
            svg.selectAll('path')
            .attr('transform', event.transform);
            svg.selectAll('text')
            .attr('transform', event.transform);
            });

    svg.call(zoom);

}