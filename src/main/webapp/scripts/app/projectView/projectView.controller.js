'use strict';

angular.module('cabzzaApp')
    .controller('ProjectViewController', function ($scope, $state, $rootScope) {
        var lineChartJson = [
            {
                "date": "2012-03-01",
                "value": 30
            },
            {
                "date": "2012-03-02",
                "value": 75
            },
            {
                "date": "2012-03-04",
                "value": 15
            },
            {
                "date": "2012-03-06",
                "value": 75
            },
            {
                "date": "2012-03-12",
                "value": 158
            },
            {
                "date": "2012-03-30",
                "value": 158
            },
            {
                "date": "2012-04-01",
                "value": 158
            },
            {
                "date": "2012-04-05",
                "value": 158
            }
        ]

        var pieChartJson = [
            {
                "company": "Asseco Poland",
                "percent": 20
            },
            {
                "company": "Wartsila Ship Design",
                "percent": 25
            },
            {
                "company": "UXpin",
                "percent": 35
            },
            {
                "company": "DiabetesLab",
                "percent": 20
            }
        ]


        $scope.lineChartInit = function() {
            var chart;
            var average = 90.4;
            // SERIAL CHART
            chart = new AmCharts.AmSerialChart();

            chart.dataProvider = lineChartJson;
            chart.categoryField = "date";
            chart.dataDateFormat = "YYYY-MM-DD";
            chart.fontFamily = "Lato-Regular";
            chart.fontSize = 15;
            chart.color = "rgba(119,34,17,1)";



            // AXES
            // category
            var categoryAxis = chart.categoryAxis;
            categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
            categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
            categoryAxis.dashLength = 1;
            categoryAxis.gridAlpha = 0.15;
            categoryAxis.axisColor = "#DADADA";
            categoryAxis.fontSize = 10;


            // value
            var valueAxis = new AmCharts.ValueAxis();
            valueAxis.axisColor = "#DADADA";
            valueAxis.dashLength = 1;
            valueAxis.logarithmic = false; // this line makes axis logarithmic
            valueAxis.fontSize = 10;
            chart.addValueAxis(valueAxis);


            // GUIDE for average
            var guide = new AmCharts.Guide();
            guide.value = average;
            guide.lineColor = "#CC0000";
            guide.dashLength = 4;
            guide.label = "average";
            guide.inside = true;
            guide.lineAlpha = 1;
            valueAxis.addGuide(guide);


            // GRAPH
            var graph = new AmCharts.AmGraph();
            graph.type = "smoothedLine";
            graph.bullet = "round";
            graph.bulletColor = "#FFFFFF";
            graph.useLineColorForBulletBorder = true;
            graph.bulletBorderAlpha = 1;
            graph.bulletBorderThickness = 2;
            graph.bulletSize = 7;
            graph.title = "Call me a Chart";
            graph.valueField = "value";
            graph.lineThickness = 2;
            graph.lineColor = "#0000FF";
            chart.addGraph(graph);


            // CURSOR
            var chartCursor = new AmCharts.ChartCursor();
            chartCursor.cursorPosition = "mouse";
            chart.addChartCursor(chartCursor);

            // SCROLLBAR
            var chartScrollbar = new AmCharts.ChartScrollbar();
            chartScrollbar.graph = graph;
            chartScrollbar.scrollbarHeight = 30;
            chart.addChartScrollbar(chartScrollbar);

            chart.creditsPosition = "bottom-right";

            // WRITE
            chart.write("chartdiv2");


        };
        $scope.lineChartInit();


        $scope.pieChartInit = function () {

            var chart;
            var legend;

            // PIE CHART
            chart = new AmCharts.AmPieChart();
            chart.dataProvider = pieChartJson;
            chart.titleField = "company";
            chart.valueField = "percent";
            chart.alpha = 0.6;
            chart.hoverAlpha = 1;
            chart.fontFamily = "Lato-Regular";

            /*quite weird for sizing the font, but labels make the chart tiny while font is changed only on @mobile and not changed fot 760-1200px vw*/
            chart.fontSize = 15;

            if ($(window).width() < 1279) {
            chart.fontSize = $(window).width()/75;
            }

            if ($(window).width() < 768) {
                chart.labelsEnabled = false;
                chart.fontSize = 10;
            }

            chart.color = "rgba(119,34,17,1)";
            chart.colors = [
                "#0D52D1",
                "#2A0CD0",
                "#8A0CCF",
                "#CD0D74",
                "#754DEB",
                "#DDDDDD",
                "#999999",
                "#333333",
                "#000000",
                "#57032A",
                "#CA9726",
                "#990000",
                "#4B0C25"
            ];

            // LEGEND
            legend = new AmCharts.AmLegend();
            legend.align = "center";
            legend.markerType = "square";
            chart.balloonText = "[[title]]<br><span><b>[[value]]</b> ([[percents]]%)</span>";
            chart.addLegend(legend);
            legend.fontFamily = "Lato-Regular";
            legend.fontSize = $(window).width()/75;
            legend.color = "rgba(119,34,17,1)";
            legend.equalWidths = false;
            if ($(window).width() < 768) {
                legend.fontSize = 12;
                legend.equalWidths = true;
            }

            // WRITE
            chart.write("chartdiv1");
        };
        $scope.pieChartInit();
    });