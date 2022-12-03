// JS
var chart = JSC.chart('2021', {
    debug: true,
    defaultSeries_type: 'column',
    type: 'horizontal',
    title: {
        position: 'center',
        label: {
            text: 'Predicted vs Actual Championship Score in 2021',
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
            'Utah Jazz',
            'Milwaukee    Bucks',
            'Philadelphia 76ers',
            'Brooklyn Nets',
            'Los Angeles Clippers',
            'Phoenix Suns',
            'Denver Nuggets',
            'Los Angeles Lakers',
            'Dallas Mavericks',
            'Miami Heat'
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
                64.2095, 57.5515, 56.9438, 55.6058, 53.1145, 51.3631, 50.2482, 38.4419, 17.7813, 17.5005
            ],
        },
        {
            name: 'Actual',
            points: [37.5, 100, 43.75, 43.75, 62.5, 87.5, 25, 12.5, 18.75, 0],
        },
    ],
});