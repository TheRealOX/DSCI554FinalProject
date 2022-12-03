var dropdown = d3.select('#map-names');
var change = function () {
    var source = dropdown.node().options[dropdown.node().selectedIndex].value;

    var str1 = source;
    var str2 = '.json';
    var str3 = './data/derek/' + str1.concat(str2);
    var promises = [];
    var files = ['./data/derek/counties-albers-10m.json', str3];
    files.forEach((url) => promises.push(d3.json(url)));

    Promise.all(promises).then(function (values) {
        //use Promise.all to load map and data
        var us = values[0];
        var data = values[1];

        format = d3.format(',.0f');

        //create a map to use to map values to marks
        data = new Map(
            data.slice(1).map(([attendance, state, county]) => [state + county, +attendance])
        );

        //scaleSqrt is used to size the circles by area, as opposed to radius. Note quantile scale.
        radius = d3.scaleSqrt(
            [0, d3.quantile([...data.values()].sort(d3.ascending), 0.985)],
            [0, 20]
        );

        svg = d3.select('#chart').attr('viewBox', [0, 0, 975, 610]);

        path = d3.geoPath();

        d3.selectAll('circle').remove();
        //add the geopath for all the states
        svg.append('path')
            .datum(topojson.feature(us, us.objects.nation))
            .attr('fill', '#ccc')
            .attr('d', path);

        //add the geopath for the borders of the states
        svg.append('path')
            .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round')
            .attr('d', path);

        svg.append('circle').attr('cx', 84).attr('cy', 91).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 90)
            .attr('y', 91)
            .text('Portland Trailblazers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 58).attr('cy', 253).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 64)
            .attr('y', 253)
            .text('Sacramento Kings')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 35).attr('cy', 263).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 41)
            .attr('y', 270)
            .text('Golden State Warriors')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'yellow');

        svg.append('circle').attr('cx', 88).attr('cy', 358).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 94)
            .attr('y', 358)
            .text('LA Lakers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 88).attr('cy', 358).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 94)
            .attr('y', 368)
            .text('LA Clippers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 228).attr('cy', 238).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 234)
            .attr('y', 238)
            .text('Utah Jazz')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 189).attr('cy', 402).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 195)
            .attr('y', 402)
            .text('Phoenix Suns')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 353).attr('cy', 278).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 359)
            .attr('y', 278)
            .text('Denver Nuggets')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 538).attr('cy', 162).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 544)
            .attr('y', 162)
            .text('Minnnesota Timberwolves')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 472).attr('cy', 378).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 478)
            .attr('y', 378)
            .text('OKC Thunder')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 484).attr('cy', 442).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 490)
            .attr('y', 442)
            .text('Dallas Mavericks')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 449).attr('cy', 517).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 455)
            .attr('y', 537)
            .text('San Antonio Spurs')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 510).attr('cy', 509).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 485)
            .attr('y', 495)
            .text('Houston Rockets')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 618).attr('cy', 500).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 578)
            .attr('y', 520)
            .text('New Orleans Pelicans')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 608).attr('cy', 383).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 614)
            .attr('y', 383)
            .text('Memphis Grizzlies')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 776).attr('cy', 363).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 782)
            .attr('y', 363)
            .text('Charlotte Hornets')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 713).attr('cy', 405).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 719)
            .attr('y', 405)
            .text('Atlanta Hawks')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 790).attr('cy', 515).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 796)
            .attr('y', 515)
            .text('Orlando Magic')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 815).attr('cy', 579).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 821)
            .attr('y', 579)
            .text('Miami Heat')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 630).attr('cy', 202).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 570)
            .attr('y', 190)
            .text('Milwaukee Bucks')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 635).attr('cy', 228).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 585)
            .attr('y', 238)
            .text('Chicago Bulls')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 710).attr('cy', 210).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 716)
            .attr('y', 210)
            .text('Detroit Pistons')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 668).attr('cy', 272).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 674)
            .attr('y', 272)
            .text('Indiana Pacers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 740).attr('cy', 225).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 700)
            .attr('y', 235)
            .text('Cleveland Cavaliers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 910).attr('cy', 170).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 870)
            .attr('y', 160)
            .text('Boston Celtics')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 870).attr('cy', 215).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 830)
            .attr('y', 205)
            .text('New York Knicks')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');

        svg.append('circle').attr('cx', 870).attr('cy', 210).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 830)
            .attr('y', 220)
            .text('Brooklyn Nets')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 853).attr('cy', 237).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 813)
            .attr('y', 247)
            .text('Philadelphia 76ers')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle')
            .style('fill', 'blue');

        svg.append('circle').attr('cx', 830).attr('cy', 265).attr('r', 3).style('fill', 'black');
        svg.append('text')
            .attr('x', 800)
            .attr('y', 275)
            .text('Washington Wizards')
            .style('font-size', '15px')
            .attr('alignment-baseline', 'middle');
        // create and append the red/brown circles for the proportional symbol map.
        svg.append('g')
            .attr('fill', 'brown')
            .attr('fill-opacity', 0.5)
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5)
            .selectAll('circle')
            .data(
                topojson
                    .feature(us, us.objects.counties)
                    .features.map((d) => ((d.value = data.get(d.id)), d)) //map the "ids" to the "value"
                    .sort((a, b) => b.value - a.value)
            )
            .join('circle')
            .attr('transform', (d) => `translate(${path.centroid(d)})`) //position circles at their respective feature centroid
            .attr('r', (d) => radius(d.value))
            .append('title')
            .text((d) => `${d.properties.name} ${format(d.value)}`);
    });
};

dropdown.on('change', change);
change(); //trigger json on loa
