/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */


    let result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    
    // if search term is null, scanned object is null, return
    if (searchTerm == null || scannedTextObj == null) {
        return result;
    }

    // if searchTerm is blank, return
    if (searchTerm == "") {
        return result;
    }

    // create a regex experssion to check the front for a white space, back for white space and match the search term in the middle
    // added replacements for special characters so they can be treated literally
    const regex = new RegExp(`(?<=\\s|^)${searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(?=\\s|$)`);

    // for each book through all the books
    for (let i = 0; i < scannedTextObj.length; i++) {
        // get ISBN and content
        let { ISBN, Content } = scannedTextObj[i];

        // for each page
        for (let j = 0; j < Content.length; j++) {
            // get text, page, line
            let pageObj = Content[j];
            let { Text, Page, Line } = pageObj;
            //console.log(Text)
            // if words contains the search term, push the data
            if (regex.test(Text)) { 
                //console.log(searchTerm)   
                result.Results.push({
                    "ISBN": ISBN,
                    "Page": Page,
                    "Line": Line
                });
            }
        }
    }
            
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/* Further testing material. */
const myBook = [
    {
        "Title": "Test Book",
        "ISBN": "0000000000",
        "Content": [
            {
                "Page": 341,
                "Line": 4,
                "Text": "every day. For what went on in his mind was sure-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ly of the highest proportion of excellence. He was"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "in the best mind-set he'd ever been in before! And he said"
            },
            {
                "Page": 31,
                "Line": 13,
                "Text": "at the end of the day, \& then he would decide to"
            } 
        ] 
    }
]


/** Test 1: Test for a positive result. 
 *  (Positive tests should return a match).
*/
const test1_result = findSearchTermInBooks("he", myBook);
const test1_expectedresult = {
    "SearchTerm": "he",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 13
        }
    ]
}

if (JSON.stringify(test1_result) === JSON.stringify(test1_expectedresult)) {
    console.log("PASS: Created Test 1 (positive: single word string)");
} else {
    console.log("FAIL: Created Test 1 (positive: single word string)");
    console.log("Expected:", test1_expectedresult);
    console.log("Received:", test1_result);
}

/** Test 2: Test for a positive result with multi-word tring. 
 *  (Positive tests should return a match for multi-word string).
*/
const test2_result = findSearchTermInBooks("And he", myBook);
const test2_expectedresult = {
    "SearchTerm": "And he",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 10
        }
    ]
}

if (JSON.stringify(test2_result) === JSON.stringify(test2_expectedresult)) {
    console.log("PASS: Created Test 2 (positive: multi-word string)");
} else {
    console.log("FAIL: Created Test 2 (positive: multi-word string)");
    console.log("Expected:", test2_expectedresult);
    console.log("Received:", test2_result);
}

/** Test 3: Test for a multi-word string positive result with puncutation. 
 *  (Positive tests should return a match with puncutation).
*/
const test3_result = findSearchTermInBooks("of the day,", myBook);
const test3_expectedresult = {
    "SearchTerm": "of the day,",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 13
        }
    ]
}

if (JSON.stringify(test3_result) === JSON.stringify(test3_expectedresult)) {
    console.log("PASS: Created Test 3 (positive: multi-word string w/puncutation)");
} else {
    console.log("FAIL: Created Test 3 (positive: multi-word string w/puncutation)");
    console.log("Expected:", test3_expectedresult);
    console.log("Received:", test3_result);
}

/** Test 4: Test for a single-word input positive result with puncutation. 
 *  (Positive tests should return a match with puncutation included but not without).
*/
const test4_result = findSearchTermInBooks("day,", myBook);
const test4_expectedresult = {
    "SearchTerm": "day,",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 13
        }
    ]
}

if (JSON.stringify(test4_result) === JSON.stringify(test4_expectedresult)) {
    console.log("PASS: Created Test 4 (positive: single-word input w/puncutation)");
} else {
    console.log("FAIL: Created Test 4 (positive: single-word input w/puncutation)");
    console.log("Expected:", test4_expectedresult);
    console.log("Received:", test4_result);
}

/** Test 5: Test for special character strings positive result. 
 *  (Positive tests should return a match with special character strings).
*/
const test5_result = findSearchTermInBooks("\& then", myBook);
const test5_expectedresult = {
    "SearchTerm": "\& then",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 13
        }
    ]
}

if (JSON.stringify(test5_result) === JSON.stringify(test5_expectedresult)) {
    console.log("PASS: Created Test 5 (positive: special characters)");
} else {
    console.log("FAIL: Created Test 5 (positive: special characters)");
    console.log("Expected:", test5_expectedresult);
    console.log("Received:", test5_result);
}



/** Test 6: Test for a negative result.
 *  (Negative test should not return any matches).
 */
const test6_result = findSearchTermInBooks("hehe", myBook);
const test6_expectedresult = {
    "SearchTerm": "hehe",
    "Results": [
    ]
}

if (JSON.stringify(test6_expectedresult) === JSON.stringify(test6_result)) {
    console.log("PASS: Created Test 6 (negative: no matches)");
} else {
    console.log("FAIL: Created Test 6 (negative: no matches)");
    console.log("Expected:", test6_expectedresult);
    console.log("Received:", test6_result);
}


/** Test 7: Test for a case-sensitive result.
 *  (Should not return a match).
 */


const test7_result = findSearchTermInBooks("for he", myBook);
const test7_expectedresult = {
    "SearchTerm": "for he",
    "Results": [
    ]
}
if (JSON.stringify(test7_expectedresult) === JSON.stringify(test7_result)) {
    console.log("PASS: Created Test 7 (negative: case-sensitive result)");
} else {
    console.log("FAIL: Created Test 7 (negative: case-sensitive result)");
    console.log("Expected:", test7_expectedresult);
    console.log("Received:", test7_result);
}


const myMultiBooks = [
    {
        "Title": "Test Book 1",
        "ISBN": "0000000000",
        "Content": [
            {
                "Page": 341,
                "Line": 4,
                "Text": "for what went on in his mind was sure-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ly of the highest proportion of excellence for he was... He was"
            },
            {
                "Page": 316,
                "Line": 13,
                "Text": "in the best mind-set he'd ever been in before!"
            } 
        ] 
    },
    {
        "Title": "Test Book 2",
        "ISBN": "1111111111111",
        "Content": [
            {
                "Page": 1,
                "Line": 114,
                "Text": "at the end of the day, he decided to create a most"
            },
            {
                "Page": 51,
                "Line": 9,
                "Text": "magical creation. A chocolate bar full of candy, he had it!"
            },
            {
                "Page": 321,
                "Line": 5,
                "Text": "He forgot how Charlie the Chocolate Factory went, but something"
            },
            {
                "Page": 331,
                "Line": 6,
                "Text": "along those lines anyways."
            } 
        ] 
    }
]

/** Test 8: Test for multiple book result.
 *  (Should return from multiple books with the correct ISBN, Page, Line).
 */
const test8_result = findSearchTermInBooks("he", myMultiBooks);
const test8_expectedresult = {
    "SearchTerm": "he",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "1111111111111",
            "Page": 1,
            "Line": 114
        },
        {
            "ISBN": "1111111111111",
            "Page": 51,
            "Line": 9
        }
    ]
}

if (JSON.stringify(test8_expectedresult) === JSON.stringify(test8_result)) {
    console.log("PASS: Created Test 8 (multiple books in JSON input)");
} else {
    console.log("FAIL: Created Test 8 (multiple books in JSON input)");
    console.log("Expected:", test8_expectedresult);
    console.log("Received:", test8_result);
}


const semiBlankBooks = [
    {
        "Title": "Test Book 1",
        "ISBN": "0000000000",
        "Content": [
            {
                "Page": 341,
                "Line": 4,
                "Text": ""
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ly of the highest proportion of excellence. He was"
            },
            {
                "Page": 316,
                "Line": 13,
                "Text": "in the best mind-set he'd ever been in before!"
            } 
        ] 
    },
    {
        "Title": "Test Book 2",
        "ISBN": "1111111111111",
        "Content": [
            {
                "Page": 1,
                "Line": 114,
                "Text": ""
            },
            {
                "Page": 51,
                "Line": 9,
                "Text": "magical creation. A chocolate bar full of candy!"
            },
            {
                "Page": 321,
                "Line": 5,
                "Text": "He forgot how Charlie the Chocolate Factory went, but something"
            },
            {
                "Page": 331,
                "Line": 6,
                "Text": ""
            } 
        ] 
    }
]

/** Test 9: Test for blank book result.
 *  (Should return even if some book lines are blank with the correct ISBN, Page, Line).
 */

const test9_result = findSearchTermInBooks("of", semiBlankBooks);
const test9_expectedresult = {
    "SearchTerm": "of",
    "Results": [
        {
            "ISBN": "0000000000",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "1111111111111",
            "Page": 51,
            "Line": 9
        }
    ]
}

if (JSON.stringify(test9_result) === JSON.stringify(test9_expectedresult)) {
    console.log("PASS: Created Test 9 (some blank lines in multi-book)");
} else {
    console.log("FAIL: Created Test 9 (some blank lines in multi-book)");
    console.log("Expected:", test9_result);
    console.log("Received:", test9_expectedresult);
}


const blankBook = [
    {
        "Title": "Test Book 1",
        "ISBN": "0000000000",
        "Content": [
        ] 
    }
]

/** Test 10: Test for blank book result.
 *  (Should return even if all book lines are blank).
 */

const test10_result = findSearchTermInBooks("the", blankBook);
const test10_expectedresult = {
    "SearchTerm": "the",
    "Results": [
    ]
}

if (JSON.stringify(test10_expectedresult) === JSON.stringify(test10_result)) {
    console.log("PASS: Created Test 10 (blank book)");
} else {
    console.log("FAIL: Created Test 10  (blank book)");
    console.log("Expected:", test10_expectedresult);
    console.log("Received:", test10_result);
}


/** Test 11: Test for bad search-term input.
 *  (Should handle null input for search-term input).
 */

const test11_result = findSearchTermInBooks(null, twentyLeaguesIn);
const test11_expectedresult = {
    "SearchTerm": null,
    "Results": [
    ]
}

if (JSON.stringify(test11_expectedresult) === JSON.stringify(test11_result)) {
    console.log("PASS: Created Test 11 (null search-term input)");
} else {
    console.log("FAIL: Created Test 11 (null search-term input)");
    console.log("Expected:", test11_expectedresult);
    console.log("Received:", test11_result);
}


/** Test 12: Test for bad book input.
 *  (Should handle null input for book input).
 */

const test12_result = findSearchTermInBooks("yeah", null);
const test12_expectedresult = {
    "SearchTerm": "yeah",
    "Results": [
    ]
}

if (JSON.stringify(test12_expectedresult) === JSON.stringify(test12_result)) {
    console.log("PASS: Created Test 12 (null book input)");
} else {
    console.log("FAIL: Created Test 12 (null book input)");
    console.log("Expected:", test12_expectedresult);
    console.log("Received:", test12_result);
}


/** Test 13: Test for blank search-term input.
 *  (Should handle blank input for search-term input).
 */

const test13_result = findSearchTermInBooks("", twentyLeaguesIn);
const test13_expectedresult = {
    "SearchTerm": "",
    "Results": [
    ]
}

if (JSON.stringify(test13_expectedresult) === JSON.stringify(test13_result)) {
    console.log("PASS: Created Test 13 (blank search input)");
} else {
    console.log("PASS: Created Test 13 (blank search input)");
    console.log("Expected:", test13_expectedresult);
    console.log("Received:", test13_result);
}