# ScrollTable.js
A lightweight jQuery plugin that dynamically splits a single table's headers and data into 2 pieces so that it scrolls.

Like many others have experienced, getting tabular data to scroll beneath a fixed header can be somewhat of a struggle, 
with no standard way of doing it in HTML.  While there's a few Javascript libraries that automate this process by 
supporting things like "Grids", each one seemed to have its own unique set of quirks that didn't quite get the job done 
like I hoped. While I've done this purely with CSS in the past, I never liked cluttering JSP markup with hardcoded widths, 
so I went with a different approach by creating a jQuery plugin.
 
Here's the pseudo-code I used in the plugin:
1. The browser loads a standard HTML table with THEAD and TBODY tags, which is inside a div tag.
2. Since table header and data are pre-aligned, loop through all TH and the 1st row of TDs, assigning each element's width 
to itself.
3. Add new headerTable above above existing table.
4. Move existing THEAD into newly added headerTable.  (Widths from step 2 are preserved here)
5. Apply CSS class to dataTable's span tag to make it scroll vertically.
 
This is tested in IE7+, Chrome and Firefox and takes 10 - 20ms to perform.  One of the big benefits (and main reasons I made this)
is its ability to calculate TH/TD widths on the fly, which is useful when loading a dynamic table where the number of columns is 
changed at each page load.
