# 
# Android XML Translator

This project Deus Ex: The Fall is a simple script that takes an original XML file and a translated XML file, and generates a new XML file with the original data replaced by the translated data.

## Usage

1.  Install the required dependencies:

CopyInsert in Terminal

`bun  install`

1.  Run the script:

CopyInsert in Terminal

`bun index.ts`

## Configuration

The script uses the following files and paths:

-   `originalFile`: The path to the original XML file. Default:  `./android-original/stringtable01.xml`.
-   `translatedFile`: The path to the translated XML file. Default:  `./pc-tradução/stringtable01.xml`.
-   `outputPath`: The path to the output XML file. Default:  `./android-tradução/stringtable01.xml`.

## How it works

The script uses the  `fast-xml-parser`  library to parse the original and translated XML files. It then iterates over each row in the original file, finds the corresponding row in the translated file based on the original data, and replaces the original data with the translated data. The resulting XML is then built using the  `XMLBuilder`  class from the  `fast-xml-parser`  library.


This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
