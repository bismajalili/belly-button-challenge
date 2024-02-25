function innit() {
    let selector = d3.select("#selDataset")
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log(data)

        let sampledata = data.names
        for (let i = 0; i < sampledata.length; i++) {
            selector.append("option").text(sampledata[i]).property("value", sampledata[i])

        }
        createTable(sampledata[0])
        createChart(sampledata[0])
    })
}
function optionChanged(userchoice) {
    createTable(userchoice)
    createChart(userchoice)
}

innit()
function createTable(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let meta = data.metadata
        let metaarray = meta.filter(obj => obj.id == sample)
        let metaresult = metaarray[0]
        console.log(metaresult)
        let table = d3.select("#sample-metadata")
        table.html("")
        for (key in metaresult) {
            table.append("h6").text(`${key.toUpperCase()}: ${metaresult[key]}`)
        }
    })
}


function createChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let meta = data.metadata
        let metaarray = meta.filter(obj => obj.id == sample)
        let metaresult = metaarray[0]
        let washfreq = metaresult.wfreq

        let samples = data.samples
        let samplesarray = samples.filter(obj => obj.id == sample)
        let samplesresult = samplesarray[0]
        let otu_id = samplesresult.otu_ids
        let otu_label = samplesresult.otu_labels
        let sample_value = samplesresult.sample_values
        console.log(samplesresult)

        var bardata = [{
            type: 'bar',
            x: sample_value.slice(0, 10).reverse(),
            y: otu_id.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
            text: otu_label.slice(0, 10).reverse(),
            orientation: 'h'
        }];
        let barlayout = { title: "Top 10 Cultures" }
        Plotly.newPlot('bar', bardata, barlayout);

        var trace1 = {
            x: otu_id,
            y: sample_value,
            text: otu_label,
            mode: 'markers',
            marker: {
                color: otu_id,
                colorscale: "Blues",
                size: sample_value
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Cultures per Sample',
            showlegend: false,

        };

        Plotly.newPlot('bubble', data, layout);


        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washfreq,
                gauge: { 
                    axis: { range: [0, 10] }, bar: { color: "blue" } },
                title: { text: "Washes per Week" },
                type: "indicator",
                mode: "gauge+number"
            }
        ];

        var layout = { margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

    })
}