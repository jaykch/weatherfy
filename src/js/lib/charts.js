console.log("charts loaded");
window.onload = function () {
    renderHumidityChart();
    render3HourChart();
};

var currentHumidity = 70;

function renderHumidityChart() {
    var chart = new Chartist.Pie('.humidity-chart', {
        series: [currentHumidity,100-currentHumidity],
    }, {
        donut: true,
        donutWidth: 10,
        showLabel: false
    });

    chart.on('draw', function(data) {
        if(data.type === 'slice') {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 600,
                    from: -pathLength + 'px',
                    to:  '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                    fill: 'freeze'
                }
            };

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if(data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false);
        }
    });

    chart.on('created', function() {
        if(window.__anim21278907124) {
            window.__anim21278907124 = null;
        }
    });
}

function render3HourChart() {

    var hr3 = "3pm";
    var hr6 = "3pm";
    var hr9 = "3pm";
    var hr12 = "3pm";
    var hr15 = "3pm";
    var hr18 = "3pm";
    var hr21 = "3pm";
    var hr24 = "3pm";

    var hourLabels = [hr3, hr6, hr9, hr12, hr15, hr18, hr21, hr24];
    var hourlyTemperature = [20, 15, 10, 25, 20, 15, 10, 20];

    // Create a line chart with responsive options

    var data = {
        // A labels array that can contain any sort of values
        labels: hourLabels,
        // Our series array that contains series objects or in this case series data arrays
        series: [
            hourlyTemperature
        ]
    };

    var options = {
        showGrid: false,
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0.1
        }),
        fullWidth: true,
        chartPadding: {
            top: 15,
            right: 15,
            bottom: 5,
            left: 10
        },
        showArea: true,
        low: 0,
        axisX: {
            showGrid: false,
        },
        axisY: {
            showGrid: false,
        }
    };

// In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
    var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            showPoint: false,
            showArea: false,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value.slice(0, 3);
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            showLine: false,
            showArea: false,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

    new Chartist.Line('.hour-chart', data, options, responsiveOptions);

}

