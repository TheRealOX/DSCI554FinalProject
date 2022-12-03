// JS
var chart,
    regionColors = {
        Western: 'maroon',
        Eastern: 'gold',
    },
    startDate = '01/01/2010',
    endDate = '01/01/2022';

JSC.fetch('./data/derek/teamsalary.csv')
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        var data = JSC.csv2Json(text);
        chart = renderChart(data);
    })
    .catch(function (error) {
        console.error(error);
    });

function renderChart(data) {
    var stopped = true,
        timer,
        frameDelay = 20,
        currentDate = startDate;
    return JSC.chart('chartDiv', {
        debug: true,
        type: 'horizontal column solid',
        // Controls the speed of the animation and the chart.
        animation: { duration: 200 },
        margin_right: 30,
        yAxis: {
            // Lock the scale minimum at 0 and use 10% padding (of data) for max.
            scale_range: { padding: 0.1, min: 0 },
            // on top.
            orientation: 'opposite',
            // Dont make room for tick labels overflow. The chart level margin_right: 30, setting will ensure there is enough space for them.
            overflow: 'hidden',
        },
        xAxis: {
            // Hide x axis ticks (vertical axis on horizontal chart)
            defaultTick_enabled: false,
            scale: { invert: true },
            alternateGridFill: 'none',
        },
        title: {
            position: 'center',
            label: {
                margin_bottom: 40,
                text: 'NBA Team Salary from 2010-2022',
                style_fontSize: 22
            },
        },
        annotations: [
            {
                id: 'year',
                label: {
                    text: formatAnnotation(new Date(startDate)),
                },
                position: 'inside right',
            },
        ],
        legend: {
            template: '%icon %name',
            position: 'outside top right',
            layout: 'vertical',
            margin_top: 50,
            customEntries: [
                {
                    name: 'Western',
                    icon: {
                        color: regionColors['Western'],
                    },
                },
                {
                    name: 'Eastern',
                    icon: {
                        color: regionColors['Eastern'],
                    },
                },
            ],
        },

        defaultPoint: {
            label_text: '%id: <b>%yvalue</b>',
        },
        defaultSeries: {
            legendEntry_visible: false,
            mouseTracking_enabled: false,
        },
        series: makeSeries(data),
        toolbar: {
            defaultItem: {
                position: 'inside top',
                offset: '0,-65',
                boxVisible: false,
                margin: 6,
            },
            items: {
                // The 2007 label
                startLabel: {
                    type: 'label',
                    label_text: new Date(startDate).getFullYear() + '',
                },
                slider: {
                    type: 'range',
                    width: 240,
                    // Reduce chart update frequency to smooth slider action.
                    debounce: 20,
                    value: new Date(startDate).getTime(),
                    min: new Date(startDate).getTime(),
                    max: new Date(endDate).getTime(),
                    events_change: function (val) {
                        // Update chart
                        moveSlider(val);
                        // Stop playback if manually handling the slider.
                        playPause(true);
                    },
                },
                // The 2009 label
                endLabel: {
                    type: 'label',
                    label_text: new Date(endDate).getFullYear() + '',
                }
                
            },
        },
    });

    function makeSeries(data) {
        var dateStr = currentDate + '_date';
        data.sort(function (a, b) {
            return b[dateStr] - a[dateStr];
        });
        return [
            {
                points: data.map(function (item) {
                    return {
                        x: data.indexOf(item),
                        id: item.team,
                        y: item[dateStr],
                        color: regionColors[item.region],
                    };
                }),
            },
        ];
    }

    function moveSlider(date, cb) {
        var dt = new Date(date);
        currentDate = JSC.formatDate(
            new Date(dt.getFullYear(), dt.getMonth(), 1),
            '01/01/yyyy'
            // 'yyyy'
        );

        // Update chart label and slider
        chart.annotations('year').options({
            label_text: formatAnnotation(dt),
        });
        chart.uiItems('slider').options({ value: dt.getTime() });

        // Update points. The then: cb update option will execute the callback once the animation is finished.
        chart.series(0).options({ points: makeSeries(data)[0].points }, { then: cb });
    }

    function animateChart() {
        if (!stopped) {
            timer = setTimeout(function () {
                var dt = new Date(currentDate);
                /*
        currentDate = dt.setMonth( 
          dt.getMonth() + 1 
        ); 
        */
                currentDate = dt.setYear(dt.getYear() + 1);
                if (currentDate >= new Date(endDate).getTime()) {
                    clearInterval(timer);
                    currentDate = startDate;
                    chart.uiItems('slider').options({
                        value: new Date(currentDate).getTime(),
                    });
                    playPause(true);
                }
                moveSlider(currentDate, animateChart);
            }, frameDelay);
        }
    }

    function playPause(val, chrt) {
        var c = chrt || chart;
        if (val) {
            if (!stopped) {
                // Stop
                c.uiItems('Pause').options({
                    label_text: 'Play',
                    icon_name: 'system/default/play',
                });
                clearInterval(timer);
                stopped = true;
            }
        } else {
            if (stopped) {
                // Play
                c.uiItems('Pause').options({
                    label_text: 'Pause',
                    icon_name: 'system/default/pause',
                });
                stopped = false;
                animateChart();
            }
        }
    }

    function formatAnnotation(dt) {
        var year = dt.getFullYear();
        //var month = JSC.formatDate(dt, 'MMM');
        return (
            '</span><span style="font-size:50px; font-weight:bold; width:40px; align:right;">' +
            year
        );
    }
}