//Testing log

**Test Instructions**

For test details see the test descriptions.  Each test should be run at least once a sprint on the final merged code, but consider running it on a per branch basis prior to merging into the main based on developer discretion.  The final merged code results should be recorded in the *Test Summary* section with either a PASS or an issue # reference.

**Test Summary, Sprint 5+**

| TEST NAME             | SPRINT 5 | SPRINT 6 | SPRINT 7 | SPRINT 8 | SPRINT 9 | SPRINT 10   | SPRINT 11 |
|-----------------------|----------|----------|----------|----------|----------|-------------|-----------|
| Address Submittal     | #42      | PASS     | PASS     | PASS     | PASS     | PASS        | PASS      |
| Address RegEx         |          | #23      | #56      | #56      | #56      | #56         | #56       |
| Map Display           |          | #47      | PASS     | PASS     | PASS     | PASS        | PASS      |
| Driving Route         |          | PASS     | PASS     | PASS     | #75      | PASS        | PASS      |
| Train Route           | #38      | #53      | PASS     | PASS     | PASS     | PASS        | PASS      |
| Rail Info Overlay     |          | #10      | PASS     | PASS     | #77 #66  | #97         | PASS      | 
| Metric Calculations   |          | #45      | PASS     | PASS     | PASS     | PASS        | #81       |
| Metric Display        |          | PASS     | #58      | #58      | #58      | #87         | PASS      |
| Search Log Entry      |          | #48      | PASS     | PASS     | PASS     | PASS        | PASS      |
| Search DB Update      |          | #48      |          | #48      | #48      | PASS        | PASS      |
| Others? ...           |          |          |          |          |          | #95 #90     | PASS      |
| Compiler Check        |          | PASS     |          | PASS     | PASS     | PASS        | PASS      |
| Web Console Check     |          | #49      | #57      | PASS     | #49      | #91 #92 #93 | #92 #93   |


**Test Descriptions**

Address Submittal - Start and destination entry boxes accept inputs and on click of the submit button, the information is sent/recorded

Address RegEx - On submit attempt, the address information in checked and if errors are present, the submittal is rejected with feedback to the user

Map Display - The map displays on the website and zooms/centers appropriately for the starting and destination location selection.  The default should be an overview of the state of Ohio.

Driving Route - On address submittal, a driving route is requested via a mapping API and displayed on the map embedded in the site

Train Route - On address submittal, the nearest stations are determined for the start and destination address, and a train route is calculated using the routing information in the database

Rail Info Overlay - The KML information for passenger rail is overlayed on the embedded map.  The train route calculated is displayed along with the driving route to and from the start/destination addresses

Metric Calculations - Cost, Travel Time, and Pollution metrics are calculated for various options including, electric/diesel trains, small/medium/large personal cars (gas and electric).

Metric Display - The calculated metrics are displayed on the website

Search Log Entry - Along with the address submittal, the ip address and current Unix time are recorded and a request sent to the DB

Search DB Update - The search log in the database updates with new search requests

Compiler Check - Run the application, check the IDE console for errors detected by the compliler

Web Console Check -  Run the application, navigate to other pages (if applicable), submit address information.  Check the web console to see if any warnings or errors are displayed.

POSSIBLE TESTS FOR FUTURE SPRINTS

Database Import - Import the new database using the instructions in README.md to create a new database and verify no errors are reported by the console.

**Legacy Results**

**Sprint 1 Tests/Results:**

**Test 1** (Testing Entry Boxes update internal variables): Enter text in all entry boxes, display the internal variable on the web_page (currently enabled for sprint 1 testing). All 8 entry boxes accept text and update the internal variables as display on the matching output on the website.  **PASS (no issues)**

**Test 2** (Testing Submit button): Enter text in all entry boxes, use address that meets validation requirements, such as (1234 MyStreet Road, Toledo, OH, 43566) (200 University Hall, Bowling Green, OH 43403).  Click "Find Route" button. A pop-up should appear (beware of pop-up blockers) with the Start and Ending Addresses, as well as the time of submittal.  **PASS (no issues)**

**Test 3** (Table Test): A static table should appear on the page with the following information:

| TRANSPORTATION   | COST | TIME      | ENVIRONMENTAL IMPACT |
|------------------|------|-----------|----------------------|
| Car - Light      | $100 | 3hr 12min | 2.0 Tons of CO2      |
| Car - Medium     | $150 | 3hr 12min | 3.0 Tons of CO2      |
| Car - Heavy      | $200 | 3hr 12min | 4.0 Tons of CO2      |
| Car - Electric   | $50  | 3hr 12min | 0.3 Tons of CO2      |
| Train - Diesel   | $75  | 5hr 23min | 1.0 Tons of CO2      |
| Train - Electric | $75  | 5hr 23min | 0.5 Tons of CO2      |

Test 3  **PASS (no issues)**

**Test 4** (Address Validation Test 1): Enter a variety of textually valid street addresses:

1234 MyStreet Road
Toledo, OH 43566
22 Green St.
Perrysburg, OH 45834
1234 5th Street,
Cleveland, OH 44575
111111 Sesame Street,
Detroit, MI 34678
942 Hidden Ct
Bowling Green, OH 43356-3452
Test 4 **PASS (with issues documented in issue #20)**

**Test 5** (Address Validation Test 2): Enter a variety of textually invalid street addresses:
#$@# Lane  (should flag on special characters)
Toledo, OH 34567
33 Crazy Street
San Diego, CA 55555  (should flag on state)
2 Short Ln
Lima, OH 234 (should flag on short zip code)
105; DROP TABLE Log (should flag on invalid character)
SQL, OH 34556
Test 5 **PASS (no issues)**

**Test 6** - Compiler warnings/errors:
Check terminal for warnings/errors
None found - **PASS (no issues)**

**Test 7** - Web console errors:
Check developer web console for any warnings or errors.
**PASS (with issues documented in Issues #22)**

**Test 8** - Autocomplete input:  
1- Autocomplete input  
2- Passing lat & lng to map  
3- Display route between origin and destination  
Test 8 **PASS (no issues #42)**  