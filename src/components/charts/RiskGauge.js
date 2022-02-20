let risklevel=50;
let emoji;
if (risklevel>80) {
    emoji = '🚨';
} else if (risklevel<40) {
    emoji = '🤑';
} else {
    emoji = '😴';
}
export const C01 = {
    chart: {
        type: 'solidgauge',
    },
    
    title: {
        text: 'Risk Gauge',
    },
    pane: {
        center: ['50%', '70%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },
    exporting: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },
    yAxis: {
        min: 0,
        max: 100,
        stops: [
            [0.1, '#20C55E'],
            [0.5, '#00DCFF'],
            [0.9, '#FF0000']  
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: 35,
            text: "<h1 style='font-size:2vw'>" + emoji + "</h1>",
            useHTML: true
        },
        labels: {
            y: 20
        }
    },
    series: [{
        name: 'Risk',
        data: [risklevel],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px; color:white">{y}%</span><br/>' +
                '</div>'
        },
    }]
}