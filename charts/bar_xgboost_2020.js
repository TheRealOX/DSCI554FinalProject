// JS
var chart = JSC.chart('2020', {
    debug: true,
    defaultSeries_type: 'column',
    type: 'horizontal',
    title: {
        position: 'center',
        label: {
            text: 'Predicted vs Actual Championship Score in 2020',
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
            'Los Angeles Lakers',
            'Milwaukee    Bucks',
            'Los Angeles Clippers',
            'Toronto Raptors',
            'Boston Celtics',
            'Denver Nuggets',
            'Dallas Mavericks',
            'Oklahoma City Thunder',
            'Utah Jazz',
            'Houston Rockets'
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
                83.3784, 67.8068, 58.058, 54.1149, 50.7651, 35.1658, 27.8081, 25.9856, 22.6305, 21.7954
            ],
        },
        {
            name: 'Actual',
            points: [100, 31.25, 43.75, 43.75, 62.5, 56.25, 12.5, 18.75, 18.75, 31.25],
        },
    ],
});