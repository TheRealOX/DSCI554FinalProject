// JS
var chart = JSC.chart('feature', {
    debug: true,
    defaultSeries_type: 'column',
    type: 'horizontal',
    title: {
        position: 'center',
        label: {
            text: 'XGBoost Feature Importance',
            style_fontSize: 22,
        },
    },
    yAxis: {
        label_text: 'Feature Importance',
        scale: {
            /*Define an axis range of 0-100*/
            range: [0, 0.2],
        },
    },
    xAxis: {
        label_text: 'Features',
        categories: [
            'Top_3_Conference',
            'SRS',
            'MOV',
            'count_all_defensive',
            'sum_mvp_shares',
            '>=10',
            'STL',
            'eFG%',
            'count_champion',
            'count_playoff_games',
            'L1YP',
            'Age',
            'BLK_opp',
            'TRB',
            'PTS_opp'

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
            name: 'Importance',
            points: [0.19305372, 0.0637413 , 0.06366115, 0.05511286, 0.03891366,
                0.03764632, 0.03497668, 0.03284992, 0.0325796 , 0.0290717 ,
                0.02891842, 0.02736364, 0.02597931, 0.02114295, 0.01975803],
        },

    ],
});