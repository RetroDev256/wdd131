// constants are formed by the "const" keyword
const some_string = "This is a string.";

// variables are formed by the "let" keyword
let some_date = "2025-04-22";
some_date = "1970-01-01";

// javascript is loosely typed
some_date = 24;

// variables should not be defined by "var" - it's function scoped instead of block scoped
// the keyword is only retained for backwards compatability - use "let" and "const" instead
var dont_use = 3;

// example: getting the area of a circle:
const pi = 3.14159265358979323846264338327950288;
let radius = 3;
let area = pi * radius ** 2;

// let us see the result:
console.log("Area with radius 3:", area);

// try again with larger radius
radius = 20;
area = pi * radius ** 2;
console.log("Area with radius 20:", area);

// javascript is really messed up
const three = 3;
const two = "2";

// multiplication coerces strings to integers/floats
let result = three * two;
console.log("3 * \"2\" =", result);

// addition can perform string concatenation
result = three + two;
console.log("3 + \"2\" =", result);

// make sure to parse strings if you want to have a correct output
result = three + parseInt(two);
console.log("3 + parseInt(\"2\") =", result);

function exampleFunc() {
    return 2;
}

// Document Object Model - DOM - The way to interface with your HTML from javascript
// under this model, you can select things from the HTML tree by label, attribute, tag, id, class, etc.
// You can use it to change the style, formatting, content, structure, etc, all from javascript.

// Selecting single elements:
const element_by_id_selector = document.querySelector("#myIDName");
const element_by_class_selector = document.querySelector(".myClassName");
const element_by_html_tag_selector = document.querySelector("div");

// Selecting multiple elements: ("node list")
const multi_element_by_tag_selector = document.querySelector("a");

// The old way to do things (perhaps still good? teachers says it is bad)
const element_by_id_selector_2 = document.getElementById("myIDName");

// Teacher says this is still the old way to do things:
// these return more than one element,as they could have more than one elements per class and tag
const element_by_class_selector_2 = document.getElementsByClassName("myClassName");
const element_by_html_tag_selector_2 = document.getElementsByTagName("div");