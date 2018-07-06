// Scan all hrefs, internal links and foriegn links, of a given site or until stopping conditions are met

// Step 1: Clarify - Understand the question

    // GET HTML from given URL, Return all hrefs nested in <a> tags. Divide into three three objects with non-repeating entries,
       
    //  1. Internal Links Object -> contains all *unvisited* internal links, and the number of times the link has occured.
    //      Key:Value -> (String)URL: (Number)Instances of link

    //  2. External Links Object -> contains all *unvisited* external links, and the number of times the link has occured.
    //      Key:Value -> (String)URL: (Number)Instances of link
        
    //  3. Internally Scraped Pages Object -> contains all *visited* internal pages, and the previously recorded times link to the page have been returned.
    //     Newly scanned pages continue to update the count of previously scanned pages. 
    //      Key:Value -> (String)URL: {
                                //     count: (Number),
                                //     dateAdded: ?
                                //      }           
            

// Step 2: Create sample data

// Step 3: Solve Sample Data

// Step 4: Function Signature

// Step 5: List code constructs

// Step 6: Pseudo Code

// Step 7: Solve