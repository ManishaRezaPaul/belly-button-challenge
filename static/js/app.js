// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Access the json data and use console to review the data
d3.json(url).then((data) => {
    console.log(data);
});


// Initialize the page with default id
function init () {
  
    // Select the dropdown menu using D3
    let dropdownmenu = d3.select("#selDataset");


    // Access sample data using d3
    d3.json(url).then((data) => {
    
        // Set a variable for the sample names
        let samplenames = data.names;

        // Add each name to the dropdown menu
        samplenames.forEach((name) => {
        dropdownmenu
        .append("option")
        .text(name)
        .property("value", name);
    
        });

        // Add first name as the default value
        let first_name = samplenames[0];
            
        // Log the irst_value
        console.log(first_name);

        // Build the initial plots
        buildtable(first_name);
        buildchart(first_name);

    });
}

// Build table with metadata information
function buildtable (sample) {

    // Access metadata using d3
    d3.json(url).then((data) => {

        // Select the dropdown menu using D3
        let metadatatable = d3.select("#sample-metadata");

        // Set a variable for the sample names and then find data based on the respective id
        let DemInformations = data.metadata;
        let selecteddemInfo = DemInformations.find((metadataObject) => metadataObject.id === parseInt(sample));

        // Clear any existing metadata
        panel = d3.select("#sample-metadata").html("")

        // Add each name to the dropdown menu
        Object.entries(selecteddemInfo).forEach(([key,value]) => {
            
            panel.append("p").text(`${key}: ${value}`);

        });
    
    });

}

// Build bar chart that populates using 'samples' data
function buildchart (sample) {
    
    // Access samples using d3
    d3.json(url).then((data)=> {

        // Set a variable for the sample data and find sample data for the respective id
        let samples = data.samples;
        let selectedIds = samples.find((sampleObject) => sampleObject.id === sample);

        let otuIds = selectedIds.otu_ids;
        let otuLabels = selectedIds.otu_labels;
        let samplevalues = selectedIds.sample_values;

        console.log("otuIds:", otuIds);
        console.log("otuLabels:", otuLabels);
        console.log("samplevalues", samplevalues);

        // Build bar chart data and layout
        let bardata = [{
            x: samplevalues.slice(0, 10).reverse(),
            y: otuIds.slice(0, 10).reverse().map((otuId) => `OTU ${otuId}`),
            text: otuLabels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];


        // Add labels to the bar chart
        barlabels = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", bardata, barlabels);

        // Build bubble chart
        let bubbledata = [{
            x: otuIds,
            y: samplevalues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: samplevalues,
                color: otuIds,
                colorscale: "Earth"
            }
        }];
        
        // Add labels to the bar chart
        let bubblelabels = {
            hovermode: "closest",
            xaxis: {title: "OTU IDs"},
            
        };
        
        Plotly.newPlot("bubble", bubbledata, bubblelabels) 
    });
   
}

// Function to update the charts and metadata
function optionChanged(newSample) {
    buildtable (newSample);
    buildchart(newSample);
    buildgaugechart(newSample);        
}

// Initialize the dashboard
init ();