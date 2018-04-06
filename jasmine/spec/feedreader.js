/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
         // Creates a loop to go through the allFeeds array to check if URLs are defined and not empty.
         it('have URL and are not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            // Changed the matcher to check for an empty string instead of undefined.
            expect(allFeeds[i].url).not.toBe("");
            }
        });
         // Creates a loop to go through the allFeeds array to check if names are defined and not empty.
         it('have name and are not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            // Changed the matcher to check for an empty string instead of undefined.
            expect(allFeeds[i].name).not.toBe("");
            }
         });
    });

    describe('The menu', function() {
         // This test checks the body of the HTML document to see if the 'menu-hidden' class is present.
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         //  This test also checks the body of the document for the 'menu-hidden' class
         //  but this time on clicks.
         it('is working on click', function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', function() {

         beforeEach(function(done) {
                loadFeed(0, done);
        });

         // This test checks to see if there is at least one child (.entry) in the feed container (.feed).
         it ('are at least one', function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
         });
    });


    describe('New Feed Selection', function() {

        var originalFeed;
        var newFeed;
        // Loads original feed before our test is invoked.
        // Added callback function to improve functionality.
        beforeEach(function(done) {
            loadFeed(0, function() {
                 originalFeed = $('.feed').html();
                 done();
            });
        });

        // This test expects a new feed not to match a previous feed.
        // Added callback function to improve functionality.
        it('changes feed content', function(done) {
            loadFeed(1, function() {
                newFeed = $('.feed').html();
                // Switched expect function match with toEqual instead of toMatch.
                expect(originalFeed).not.toEqual(newFeed);
                done();
            });
        });
    });
}());