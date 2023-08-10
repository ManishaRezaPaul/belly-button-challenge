// Initialize the page with default id
function init () {
  
    // Select the dropdown menu using D3
    let dropdownmenu = d3.select("#selDataset");


    // Access sample data using d3
    d3.json(url).then((data) => {
    
        // Set a variable for the sample names
        let names = data.names;

        // Add each name to the dropdown menu
        names.forEach((name) => {
        dropdownmenu
        .append("option")
        .text(name)
        .property("value", name);
    
        });

        // Add first name as the default value
        let first_name = names[0];
            
        // Log the irst_value
        console.log("first name", first_name);

        // Build the initial gauge chart
        buildgaugechart(first_name);

    });
}


// Build gauge chart that populates washing frequency for each id
function buildgaugechart(sample) {
    
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let wfreq = metadata.filter(result => result.id === parseInt(sample));

        // Get the first index from the array
        let wfreqData = wfreq[0];

        // Use Object.entries to get the key/value pairs and put into the demographics box on the page
        let washFrequency = Object.values(wfreqData)[6];

        console.log("washfrequency", washFrequency);

        // Build gauge chart
        let gauge_data = [{
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,9], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "maroon"},
                steps: [
                    {range: [0, 1], color: "#f8f3ec" },
                    {range: [1, 2], color: "#f4f1e4" },
                    {range: [2, 3], color: "#e9e6c9" },
                    {range: [3, 4], color: "#e5e8b0" },
                    {range: [4, 5], color: "#d5e599" },
                    {range: [5, 6], color: "#b7cd8f" },
                    {range: [6, 7], color: "#8ac086" },
                    {range: [7, 8], color: "#89bc8d" },
                    {range: [8, 9], color: "#84b589" }
                ],
                threshold: {
                    line: {color: "maroon", width: 4},
                    thickness: 0.75,
                    value: washFrequency
                }
            }
        }];

        let layout = {
            width: 400,
            height: 400,
            margin: { t: 0, b: 0 }
        };

        Plotly.newPlot("gauge", gauge_data, layout)
    });
}

// Initialize the dashboard
init();
