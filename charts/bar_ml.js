// JS
var chart = JSC.chart('barMLDiv', {
    debug: true,
    defaultSeries_type: 'column',
    type: 'horizontal',
    title: {
        position: 'center',
        label: {
            text: 'Predicted vs Actual Championship Score in 2022',
            style_fontSize: 22,
        },
    },
    yAxis: {
        label_text: 'Championship Score',
        scale: {
            /*Define an axis range of 0-100*/
            range: [0, 100],
        },
    },
    xAxis: {
        label_text: 'Team',
        categories: [
            'Golden State Warriors',
            'Phoenix Suns',
            'Milwaukee    Bucks',
            'Boston Celtics',
            'Miami Heat',
            'Utah Jazz',
            'Memphis Grizzlies',
            'Philadelphia 76ers',
            'Dallas Mavericks',
            'Denver Nuggets'
        ],
    },
    legend: {
        position: 'right top',
        template: '%icon %name',
        reversed: true,
        layout: 'vertical',
        defaultEntry: {
            icon_width: 10,
            hoverAction: 'none',
        },
    },
    defaultPoint: {
        tooltip: '%icon %name: <b>%Value</b>',
        outline_width: 0,
        focusGlow: false,
    },
    series: [
        {
            name: 'Predicted',
            points: [
                74.0015, 66.2242, 64.3087, 51.1958, 50.0607, 43.7561, 37.1367, 32.2412, 25.7885, 19.7315
            ],
        },
        {
            name: 'Actual',
            points: [100, 43.75, 43.75, 87.5, 68.75, 12.5, 37.5, 37.5, 56.25, 6.25],
        },
    ],
});
