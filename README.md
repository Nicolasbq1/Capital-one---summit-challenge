# Capital-one---summit-challenge
Nicolas Buitrago
nb486@cornell.edu

Overview:
In this submission a couple of frameworks and scripting tools were implemented to ensure the proper extraction and display of the information provide.

The first step taken in the assignment was to use a python script to extract any interesting information to improve performance of the web side of the assignment as it may suffer from performance issues due to the sheer size of the listings.csv file.

From this file three files were created:
  neighborhoods.csv
    This served as a clean list of all neighborhoods for creating any dictionaries mapping neighborhoods to a specific value
  longandprice.csv
    this mapped a longitude and latitude to its neighborhood and nightly price. Nightly price was used rather than any of the other values like weekly or monthly price because it was the best way to reduce the amount of variable needed to be analyzed
  popular.csv
    I intended to analyze which neighborhoods were the most popular from the beginning and it was nice to find out it was also a bonus!
    it would have been nice to graph the correlation between popularity and average price but due to time constraints this was not able to be implemented (although it would not have been too difficult)

this files were then passed into the javascript for further analysis in the deliverables

Deliverables:
1. Visualize the data:
    The three visualizations done were two graphs and a map
    the three graphs came out great!
    The first graph displays each neighborhoods average price revealing the more expensive and the cheaper neighborhoods to rent from. Due to the amount of neighborhoods it was not possible to fit all of their labels in one screen. I had two ideas on how to solve this, create a scroll-bar to scroll left and right, but this would limit how the data was visualized and could have been visually unappealing. Instead I choose my second idea: I would display all of the bars together and then display the relevant information when hovering over each bar. This solution came out clean and is even web responsive! (as long as the graph is bigger than around 150 by 150 pixels)
    the second visualization is a map. The map did not come out as well as would have been preferred but it essentially is a heat map of the price throughout San Francisco. I expected centralized points of heat but unfortunately the data was fairly uniform around the center so these peaks that would have looked appealing did not appear. I would have liked to superimpose this heat map over a satellite image of San Fran but due due to time constraints I did not invest time in this.
    the third visualization was a bar graph of the popularity of each neighborhood. It has all the qualities of the first bar graphs
    This entire deliverable was coded with p5.js a framework that essentially acts as a wrapper to the canvas HTML object. Thus all animations were customized along with the graphics.
2. price estimation
    the algorithm I used for this was quite simple but I think provides powerful data. It essentially locates the locations withing a certain distance from the inputed long and lat and averages their prices. This shows what houses near that long and lat cost and thus gives a good idea about how much a booking will cost at that location. A better implementation would have less weight on locations that were further away less but due to time constraints this was not invested into.
3. Booking optimization:
    A similar algorithm was used as above but an important distinction was made: only locations within the same neighborhood was calculated. This is because the only market value based on location that was given to us was the neighborhood it is in. Thus someone looking to enter the market can see what the market value of their home may be based on their neighborhood and similar locations. Like above it would have been better to look at every single location in the neighborhood and weigh further locations less based on distance. This distinction of the neighborhood highlights how a specific neighborhood may be of higher interests to tourists/be a better fit for the market and thus have better value.

Bonus:
  Animation: the p5.js allowed for the use of animations when hovering over bar graphs along with loading animations for graphs and data.
  popularity: was included in the data analyzed. It would have been nice to create a scatter plot comparing average neighborhood price to its popularity. Also the most popular neighborhood was Presidio with an average rating of 97.667.

UI/CSS
A simple one page website was employed with three panes for informtion a header and a footer. CSS was used to improve the overall visuals of the site. The color scheme used throughout the sight is actually airbnb's officially branded colors which were found at
https://airbnb.design/building-a-visual-language/

Authors notes:
Thanks for the opportunity to apply to this program, I ended up learning a lot from this coding challenege.


citations:
frameworks:
p5.js
https://p5js.org/

papaparse:
http://papaparse.com/

image 1:
https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/HPOKFbR/simple-blue-stacked-area-chart-infographics-animation-as-technology-business-science-stats-or-data-analysis-background_bkofs0qv__F0003.png

image 2:
https://hiring-assets.careerbuilder.com/media/attachments/careerbuilder-original-3258.jpg?1497290728
