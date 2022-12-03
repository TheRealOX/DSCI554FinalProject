// JS
var chart;
var sortBy = 'Approve',
    party = 'Both';
var iconsOption = 'margin=9 verticalAlign=middle size=10 color=%color';

var champColor = '#FFD700',
    runnerColor = '#74c0fc';

var colIcon = function (col) {
    return '<icon name=system/default/circle size=8 verticalAlign=middle color=' + col + '>';
};
var champIcon = colIcon(champColor),
    runnerIcon = colIcon(runnerColor);

JSC.fetch('./data/rui/finals.csv')
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        var data = JSC.sortBy(JSC.csv2Json(text), 'id');
        chart = renderChart(data);
    })
    .catch(function (error) {
        console.error(error);
    });

function renderChart(data) {
    return JSC.chart('barDiv', {
        title: {
            position: 'center',
            label: {
                text: 'NBA Champions VS Runner stats (averaged) from 2000 to 2018',
                style_fontSize: 22,
                margin: [-50, 0, 24, -12],
            },
        },

        palette: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
        type: 'horizontal column solid',
        defaultPoint: {
            tooltip: '%label : <b>%stat</b>',
            outline_width: 0,
            focusGlow: false,
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
        yAxis_visible: false,
        xAxis: {
            crosshair_enabled: true,
            defaultTick: { label_color: '#424242' },
        },
        zAxis: { scale_type: 'stacked' },
        series: makeSeries(sortData(sortBy, party, data)),
        toolbar: {
            defaultItem: {
                position: 'outside top',
                offset: '-10,22',
            },
            items: {
                'Sort by:': { boxVisible: false },
                Sort: {
                    type: 'select',
                    items: 'Avg_Field_Goals,Avg_Three_Points_Made,Avg_Freethrows,Avg_Rebounds,Avg_Turnovers,Year',
                    events_change: function (val) {
                        chart.options({
                            series: makeSeries(sortData(val, party, data)),
                        });
                        sortBy = val;
                    },
                },
                Champion: {
                    value: true,
                    boxVisible: false,
                    type: 'checkbox',
                    margin: 15,
                    icon: { fill: champColor, size: 12 },
                    label_text: 'Champions',
                    events_change: function (val) {
                        changeParty(val, 'Runner');
                    },
                },
                Runner: {
                    value: true,
                    boxVisible: false,
                    type: 'checkbox',
                    icon: { fill: runnerColor, size: 12 },
                    label_text: 'Runners',
                    events_change: function (val) {
                        changeParty(val, 'Champion');
                    },
                },
            },
        },
    });

    function changeParty(val, partyName) {
        if (!val && party !== partyName) {
            party = partyName;
            chart.uiItems(party).value(true);
            chart.options({
                series: makeSeries(
                    sortData(
                        sortBy,
                        party,
                        data.filter(function (x) {
                            return x.party === partyName;
                        })
                    )
                ),
            });
        }
        if (val && party == partyName) {
            party = 'Both';
            chart.options({
                series: makeSeries(
                    sortData(
                        sortBy,
                        party,
                        data.filter(function (x) {
                            return x.party;
                        })
                    )
                ),
            });
        }
    }
}

function makeSeries(data) {
    var nest = JSC.nest().key('id');
    return [
        {
            name: 'Field Goals',
            id: 'afg',
            legendEntry_events_click: function () {
                return false;
            },
            points: nest
                .pointRollup(function (key, val) {
                    var values = val[0];
                    return {
                        id: key + 'afg',
                        x: values.party === 'Champion' ? champIcon + key : runnerIcon + key,
                        y: [-values.AFGP, values.AFGP],
                        attributes: {
                            label: 'Field Goals',
                            stat: values.AFGP,
                        },
                    };
                })
                .points(data),
        },

        {
            name: '3 Points',
            id: 'atp',
            legendEntry_events_click: function () {
                return false;
            },
            points: nest
                .pointRollup(function (key, val) {
                    var values = val[0];
                    return {
                        id: key + 'atp',
                        x: values.party === 'Champion' ? champIcon + key : runnerIcon + key,
                        y: [values.AFGP, values.AFGP + values.ATPP],
                        attributes: {
                            label: 'Three Points',
                            stat: values.ATPP,
                        },
                    };
                })
                .points(data),
        },

        {
            name: 'Freethrows',
            id: 'ft',
            legendEntry_events_click: function () {
                return false;
            },
            points: nest
                .pointRollup(function (key, val) {
                    var values = val[0];
                    return {
                        id: key + 'ft',
                        x: values.party === 'Champion' ? champIcon + key : runnerIcon + key,
                        y: [values.AFGP + values.ATPP, values.AFGP + values.ATPP + values.AFTP],
                        attributes: {
                            label: 'Freethrow',
                            stat: values.AFTP,
                        },
                    };
                })
                .points(data),
        },
        {
            name: 'Rebounds',
            id: 'rb',
            legendEntry_events_click: function () {
                return false;
            },
            points: nest
                .pointRollup(function (key, val) {
                    var values = val[0];
                    return {
                        id: key + 'rb',
                        x: values.party === 'Champion' ? champIcon + key : runnerIcon + key,
                        y: [
                            values.AFGP + values.ATPP + values.AFTP,
                            values.AFGP + values.ATPP + values.AFTP + values.ARBP,
                        ],
                        attributes: {
                            label: 'Rebound',
                            stat: values.ARBP,
                        },
                    };
                })
                .points(data),
        },
        {
            name: 'Turnovers',
            id: 'tv',
            legendEntry_events_click: function () {
                return false;
            },
            points: nest
                .pointRollup(function (key, val) {
                    var values = val[0];
                    return {
                        id: key + 'tv',
                        x: values.party === 'Champion' ? champIcon + key : runnerIcon + key,
                        y: [
                            values.AFGP + values.ATPP + values.AFTP + values.ARBP,
                            values.AFGP + values.ATPP + values.AFTP + values.ARBP + values.ATOV,
                        ],
                        attributes: {
                            label: 'Turnovers',
                            stat: values.ATOV,
                        },
                    };
                })
                .points(data),
        },
    ];
}

function sortData(sorting, party, data) {
    var result;

    // Filter
    result =
        party === 'Both'
            ? data.slice(0)
            : data.filter(function (x) {
                  return x.party === party;
              });

    //Sort
    switch (sorting) {
        case 'Avg_Field_Goals':
            return JSC.sortBy(result, 'AFGP').reverse();
        case 'Avg_Three_Points_Made':
            return JSC.sortBy(result, 'ATPP').reverse();
        case 'Avg_Freethrows':
            return JSC.sortBy(result, 'AFTP').reverse();
        case 'Avg_Rebounds':
            return JSC.sortBy(result, 'ARBP').reverse();
        case 'Avg_Turnovers':
            return JSC.sortBy(result, 'ATOV');
        case 'Year':
            return JSC.sortBy(result, 'Year');
    }

    return result;
}
