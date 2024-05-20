import { XMLBuilder, XMLParser, type XmlBuilderOptions } from "fast-xml-parser";

const originalFile = "./android-original/stringtable01.xml";
const translatedFile = "./pc-tradução/stringtable01.xml";
const outputPath = "./android-tradução/stringtable01.xml";

// Create a new parser instance
const parser = new XMLParser({
    processEntities: false,
    ignoreAttributes: false,
    attributeNamePrefix: "@@",
});

// Read the contents of the original file
const originalFileContents = await Bun.file(originalFile).text();
// Parse the contents of the original file
const resultOriginal = parser.parse(originalFileContents);

// Read the contents of the translated file
const translateFileContents = await Bun.file(translatedFile).text();
// Parse the contents of the translated file
const resultTranslate = parser.parse(translateFileContents);

// Iterate over each row in the original file
for (const [key, value] of Object.entries(resultOriginal["Workbook"]["Worksheet"]["Table"]["Row"])) {
    // Get the original data from the parsed XML
    const originalData = resultOriginal["Workbook"]["Worksheet"]["Table"]["Row"][key]["Cell"]?.[4]?.["Data"]?.["#text"];

    if (!originalData) {
        // If the original data is not found, skip to the next iteration
        continue;
    }

    // Find the translated data in the parsed XML
    const translateData = resultTranslate["Workbook"]["Worksheet"]["Table"]["Row"].find((row: any) => row["Cell"]?.[4]?.["Data"]?.["#text"] === originalData)?.["Cell"]?.[0]?.["Data"];

    if (originalData && translateData) {
        // If the original data and translated data are found, update the original data
        resultOriginal["Workbook"]["Worksheet"]["Table"]["Row"][key]["Cell"][0]["Data"] = translateData;
    }
}

// Define the options object for the XMLBuilder
const options: XmlBuilderOptions = {
    ignoreAttributes: false, // Include attributes in the generated XML
    attributeNamePrefix: "@@", // Prefix for attribute names in the generated XML
    suppressUnpairedNode: false, // Include unpaired nodes in the generated XML
    unpairedTags: ["Cell", "Alignment", "Borders", "Font", "Interior", "NumberFormat", "Protection", "Column"], // List of unpaired tags to include in the generated XML ex: <Cell /> is <Cell /> and not <Cell></Cell> 
    format: true // Format the generated XML
};

// Create a new XMLBuilder instance with the specified options
const builder = new XMLBuilder(options);

// Build the XML string from the resultOriginal object
const xml = builder.build(resultOriginal);

// Write the XML string to the outputPath file
Bun.write(outputPath, xml);
