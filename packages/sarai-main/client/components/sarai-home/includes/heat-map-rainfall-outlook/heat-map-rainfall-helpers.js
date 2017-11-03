Meteor.RainfallHeatMap = {

  getCoordinates: (rainfall, totalMunicipalities) => {
    let coordinates = [], municipalities = []
    let rain, coords

    for (let yAxis = 0; yAxis < 5; yAxis++) {
      for (let xAxis = 0; xAxis < totalMunicipalities; xAxis++) {       // if all municipalities except "All" option -> totalMunicipalities-1
        rain = rainfall[totalMunicipalities-1-xAxis].y[yAxis]           // if not reversed, rain = rainfall[xAxis].y[yAxis]
        coords = "["+yAxis+","+ xAxis+","+ rain+"]"
        if(yAxis==0){
          municipalities.push(rainfall[totalMunicipalities-1-xAxis].x)  // if not reversed, rain = rainfall[xAxis].y[yAxis]
        }
        coordinates.push(coords)
      }
    }
    return {
      municipalities,
      coordinates
    }
  },

  getRainfall: (weatherOutlook, totalMunicipalities) => {
    let rainfallOutlook = []

    for (let a = 0; a < totalMunicipalities; a++) {                  // if all municipalities except "All" option which is the first element (weatherOutlook[0]) -> a=1
      rainfallOutlook.push({ x: weatherOutlook[a].municipality, y: [
                                                                    Math.round(weatherOutlook[a].data.month.Nov),
                                                                    Math.round(weatherOutlook[a].data.month.Dec),
                                                                    Math.round(weatherOutlook[a].data.month.Jan),
                                                                    Math.round(weatherOutlook[a].data.month.Feb),
                                                                    Math.round(weatherOutlook[a].data.month.Mar)]})
    }
    return rainfallOutlook
  },

  constructHeatMap: (municipalities, coordinates) => {
    let coord = "["+coordinates.toString()+"]"
    
    return {
      chart: {
          type: 'heatmap',
          marginBottom: 50,
          // plotBorderWidth: 1,
          // width: 900,
          height: 900,
      },

      title: {
          text: ''
      },

      xAxis: {
          categories: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', ],
          opposite: true
      },

      yAxis: {
          categories: municipalities,
          title: null
      },

      colorAxis: {
        stops: [
            [0, '#FF0000'],     // red            // 0
            [0.2, '#FFA500'],   // orange         // 25
            [0.4, '#FFFF00'],   // yellow         // 50
            [0.6, '#62ff00'],   // light green    // 75
            [0.8, '#00ff00']    // green          // 100
        ],
        min: 0,
      },

      legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280
      },

      tooltip: {
          formatter: function () {
              if (this.series.yAxis.categories[this.point.y] === 'All'){
                return 'The average of rainfall in <b>all<b><br>municipalities on the month of <b>' + this.series.xAxis.categories[this.point.x] + '</b>'+'<br>is <b>'+
                  this.point.value + ' mm</b>';
              }else{
                return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> is expected to experience <br><b>' +
                  this.point.value + ' mm</b> of rain on the month of <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
              }
          }
      },

      series: [{
          name: 'mm of rain',
          // borderWidth: 1,
          data: JSON.parse(coord),
          dataLabels: {
              enabled: true,
              color: '#000000'
          }
      }]
    }
  }
}